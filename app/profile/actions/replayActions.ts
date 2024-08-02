"use server";
import { achievementRankValues } from "@/app/constants/games";
import prisma from "@/app/lib/prismadb";
import {
  getCharacterFromData,
  getGameNumber,
  getGameString,
} from "@/app/lib/utils";
import { ReplayInfo, ScoreObject } from "@/app/types/Replay";
import { auth } from "@/auth";
import { Replay } from "@prisma/client";
import axios from "axios";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
export const threp = async (formData: FormData) => {
  try {
    const file = formData.get("replay") as File;
    if (!file.name.endsWith(".rpy")) {
      return null;
    }
    const res = await axios.post(process.env.THREP as string, formData);
    return res.data as ReplayInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const checkReplayExist = async (replayData: ReplayInfo) => {
  try {
    const session = await auth();
    if (!session) {
      return false;
    }
    const replay = await prisma.replay.findFirst({
      where: {
        stage_score: replayData.stage_score.join("+"),
      },
    });
    if (replay) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

type sendReplayReturns =
  | "Internal error"
  | "Sended"
  | "Unauthorized"
  | "Replay exists"
  | "Problem with file upload"
  | "Problem with replay file";

type additionalReplayInfo = {
  CC: string;
  comment: string | null;
  fileDate: number;
};

export const sendReplayAction = async (
  replayData: ReplayInfo,
  formData: FormData,
  { CC, comment, fileDate }: additionalReplayInfo
): Promise<sendReplayReturns> => {
  try {
    const replayFile = formData.get("replay") as File;
    if (replayFile.size === 0) {
      return "Problem with replay file";
    }
    const session = await auth();
    if (!session) return "Unauthorized";
    const cheackExist = await checkReplayExist(replayData);
    if (cheackExist) {
      return "Replay exists";
    }
    const buffer = await replayFile.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);
    const newReplay = await prisma.replay.create({
      data: {
        replayId: nanoid(10),
        achievement: achievementRankValues[CC],
        character: getCharacterFromData(
          replayData.character,
          replayData.shottype,
          false
        ),
        comment: comment,
        date: replayData.date,
        file: fileBuffer,
        game: getGameNumber(replayData.rpy_name),
        player: replayData.player,
        rank: replayData.rank,
        slowRate: replayData.slow_rate ? replayData.slow_rate.toString() : "0",
        rpy_name: replayFile.name,
        stage: replayData.stage,
        shottype: replayData.shottype,
        status: false,
        stage_score: replayData.stage_score.join("+"),
        score: replayData.stage_score.at(-1)!,
        fileDate: new Date(fileDate),
        userId: session.user.info.id,
      },
    });
    await changeRanking(newReplay);
    revalidatePath("/profile");
    return "Sended";
  } catch (error) {
    console.log(error);
    return "Internal error";
  }
};

const changeRanking = async (newReplay: Replay) => {
  try {
    const sameReplay = await prisma.replay.findFirst({
      where: {
        game: newReplay.game,
        rank: newReplay.rank,
        userId: newReplay.userId,
        replayId: {
          not: newReplay.replayId,
        },
      },
      orderBy: [
        {
          achievement: "desc",
        },
        {
          score: "desc",
        },
      ],
    });

    const gameString = getGameString(
      getGameNumber(newReplay.rpy_name)
    ).toUpperCase();

    const currenntRanking = await prisma.ranking.findFirst({
      where: {
        userIdRanking: newReplay.userId,
      },
      select: {
        [gameString]: true,
      },
    });
    if (!currenntRanking) return;
    const rankingObject = JSON.parse(currenntRanking[gameString]);

    const newScoreObj: ScoreObject = {
      ...rankingObject,
      [newReplay.rank.toUpperCase()]: {
        score: newReplay.score,
        id: newReplay.replayId,
        CC: newReplay.achievement,
        char: getCharacterFromData(
          newReplay.character,
          newReplay.shottype!,
          true
        ),
      },
    };

    if (!sameReplay) {
      await prisma.profile.update({
        where: { id: newReplay.userId },
        data: { CCCount: { increment: 1 } },
      });
    }

    const shouldUpdateRanking =
      !sameReplay ||
      sameReplay.achievement <= newReplay.achievement ||
      sameReplay.score <= newReplay.score;
    console.log(shouldUpdateRanking);
    if (shouldUpdateRanking) {
      await prisma.ranking.update({
        where: { userIdRanking: newReplay.userId },
        data: { [gameString]: JSON.stringify(newScoreObj) },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

type deleteReplayReturns =
  | "Internal error"
  | "Deleted"
  | "Unauthorized"
  | "Replay is not yours"
  | "Replay does not exist";

export const deleteReplayAction = async ({
  replayId,
}: {
  replayId: string;
}): Promise<deleteReplayReturns> => {
  console.log(replayId);
  try {
    const session = await auth();
    if (!session) return "Unauthorized";
    const replayToDelete = await prisma.replay.findFirst({
      where: {
        replayId: replayId,
      },
      select: {
        userId: true,
      },
    });
    if (!replayToDelete) {
      return "Replay does not exist";
    }

    if (session.user.info.admin !== true) {
      if (session.user.info.id !== replayToDelete?.userId) {
        return "Replay is not yours";
      }
    }

    const deletedReplay = await prisma.replay.delete({
      where: {
        replayId: replayId,
      },
    });
    const gameString = getGameString(
      getGameNumber(deletedReplay.rpy_name)
    ).toUpperCase();

    const currenntRanking = await prisma.ranking.findFirst({
      where: {
        userIdRanking: deletedReplay.userId,
      },
      select: {
        [gameString]: true,
      },
    });
    if (!currenntRanking) {
      return "Internal error";
    }
    const rankingObject = JSON.parse(currenntRanking[gameString]);

    // not in ranking = skip
    if (
      rankingObject[deletedReplay.rank.toUpperCase()].id !==
      deletedReplay.replayId
    ) {
      return "Deleted";
    }

    const newScoreObj: ScoreObject = {
      ...rankingObject,
      [deletedReplay.rank.toUpperCase()]: {
        score: 0,
        id: "",
        CC: 0,
        char: "",
      },
    };

    await prisma.ranking.update({
      where: {
        userIdRanking: deletedReplay.userId,
      },
      data: {
        [gameString]: JSON.stringify(newScoreObj),
      },
    });

    const replayToReplace = await prisma.replay.findFirst({
      where: {
        rank: deletedReplay.rank,
        userId: deletedReplay.userId,
        game: deletedReplay.game,
      },
      orderBy: [
        {
          achievement: "desc",
        },
        {
          score: "desc",
        },
      ],
    });
    if (replayToReplace) {
      await prisma.profile.update({
        where: {
          id: deletedReplay.userId,
        },
        data: {
          CCCount: {
            decrement: 1,
          },
        },
      });
      await changeRanking(replayToReplace);
      return "Deleted";
    }

    await prisma.profile.update({
      where: {
        id: deletedReplay.userId,
      },
      data: {
        CCCount: {
          decrement: 1,
        },
      },
    });
    return "Deleted";
  } catch (error) {
    console.log(error);
    return "Internal error";
  } finally {
    revalidatePath("/profile");
  }
};

type verifyReplayReturns =
  | "Internal error"
  | "Verified"
  | "Unauthorized"
  | "You are not admin"
  | "Replay does not exist";

export const verifyReplay = async ({
  replayId,
}: {
  replayId: string;
}): Promise<verifyReplayReturns> => {
  try {
    const session = await auth();
    if (!session) {
      return "Unauthorized";
    }
    console.log(session.user.info.admin);
    if (session.user.info.admin !== true) {
      return "You are not admin";
    }

    const replay = await prisma.replay.update({
      where: {
        replayId: replayId,
      },
      data: {
        status: true,
      },
    });
    if (!replay) {
      return "Replay does not exist";
    }
    return "Verified";
  } catch (error) {
    console.log(error);
    return "Internal error";
  }
};

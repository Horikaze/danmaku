"use server";
import { ReplayInfo } from "@/app/types/Replay";
import prisma from "@/app/lib/prismadb";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { AchievementRankValues } from "@/app/constants/games";
import { getCharacterFromData, getGameNumber } from "@/app/lib/utils";
import { UTApi } from "uploadthing/server";
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
    const session = await getServerSession(authOptions);
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
  points: number;
  fileDate: number;
};

export const sendReplayAction = async (
  replayData: ReplayInfo,
  formData: FormData,
  { CC, comment, points, fileDate }: additionalReplayInfo
): Promise<sendReplayReturns> => {
  try {
    const replayFile = formData.get("replay") as File;
    if (replayFile.size === 0) {
      return "Problem with replay file";
    }
    const session = await getServerSession(authOptions);
    if (!session) return "Unauthorized";
    const cheackExist = await checkReplayExist(replayData);
    if (cheackExist) {
      return "Replay exists";
    }
    const utapi = new UTApi();
    const fileUpload = await utapi.uploadFiles(replayFile);
    if (fileUpload.error) {
      return "Problem with file upload";
    }
    const newReplay = await prisma.replay.create({
      data: {
        achievement: AchievementRankValues[CC],
        character: getCharacterFromData(
          replayData.character,
          replayData.shottype,
          false
        ),
        comment: comment,
        date: replayData.date,
        filePath: fileUpload.data.url,
        game: getGameNumber(replayData.rpy_name),
        player: replayData.player,
        rank: replayData.rank,
        slowRate: replayData.slow_rate ? replayData.slow_rate.toString() : null,
        rpy_name: replayFile.name,
        stage: replayData.stage,
        shottype: replayData.shottype,
        points: points,
        status: false,
        stage_score: replayData.stage_score.join("+"),
        score: replayData.stage_score.at(-1)!,
        fileDate: new Date(fileDate),
        userId: session.user.info.id,
      },
    });

    return "Sended";
  } catch (error) {
    console.log(error);
    return "Internal error";
  }
};

"use server";
import { ReplayInfo } from "@/app/types/Replay";
import prisma from "@/app/lib/prismadb";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
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
      return false
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

export const sendReplayAction = async (
  replayData: ReplayInfo,
  formData: FormData
) => {
  const replayFile = formData.get("replay");
  console.log(replayData);
  console.log(replayFile);
};

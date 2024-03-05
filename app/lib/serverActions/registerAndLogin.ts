"use server";
import prisma from "@/app/lib/prismadb";
import bcrypt from "bcrypt";
import { emptyScoreObjectString } from "../getRankingData";
import * as z from "zod";

const formSchema = z.object({
  nickname: z
    .string()
    .min(3, { message: "The name must be at least 3 characters." })
    .max(15, { message: "The name must be less than 15 characters." }),
  password: z
    .string()
    .min(3, { message: "The password must be at least 3 characters." })
    .max(15, { message: "The name must be less than 15 characters." }),
});

export const registerUserAction = async (formData: FormData) => {
  try {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const newUser = {
      nickname: formData.get("nickname") as string,
      password: formData.get("password") as string,
    };
    const result = formSchema.safeParse(newUser);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + " ";
      });
      return { status: errorMessage };
    }
    if (password !== confirmPassword) {
      return { status: "confirmPassword: Passwords are not the same." };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.profile.create({
      data: {
        email: newUser.nickname.replace(/\s/g, "_") + "@dmku.pl",
        hashedPassword,
        nickname: newUser.nickname,
        name: newUser.nickname,
      },
    });
    const userRanking = await prisma.ranking.create({
      data: {
        DDC: emptyScoreObjectString,
        EOSD: emptyScoreObjectString,
        GFW: emptyScoreObjectString,
        HSIFS: emptyScoreObjectString,
        IN: emptyScoreObjectString,
        LOLK: emptyScoreObjectString,
        MOF: emptyScoreObjectString,
        PCB: emptyScoreObjectString,
        POFV: emptyScoreObjectString,
        SA: emptyScoreObjectString,
        TD: emptyScoreObjectString,
        UM: emptyScoreObjectString,
        UFO: emptyScoreObjectString,
        WBAWC: emptyScoreObjectString,
        userIdRankingPoints: user.id,
      },
    });
    return {
      status: "Registered",
      data: { password: newUser.password, nickname: newUser.nickname },
    };
  } catch (error) {
    console.log(error, "REGISTERATION ERROR");
    return { status: "Registration error" };
  }
};

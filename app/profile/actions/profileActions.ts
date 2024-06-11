"use server";
import prisma from "@/app/lib/prismadb";
import bcrypt from "bcrypt";
import * as z from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/auth";
import { revalidatePath } from "next/cache";
import { emptyScoreObjectString } from "@/app/lib/utils";
import { nanoid } from "nanoid";
import { UTApi } from "uploadthing/server";
const registerSchema = z.object({
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
    const result = registerSchema.safeParse(newUser);
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
        id: nanoid(10),
        email: newUser.nickname.replace(/\s/g, "_") + "@danmaku.pl",
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
        userIdRanking: user.id,
      },
    });
    return {
      status: "Registered",
      data: { password: newUser.password, nickname: newUser.nickname },
    };
  } catch (error) {
    //@ts-ignore
    if (error.code === "P2002") {
      return { status: "User already exists." };
    }
    return { status: "Internal Error" };
  }
};
const changeSchema = z.object({
  nickname: z.string().min(3).max(15).optional().or(z.literal("")),
  password: z.string().min(3).max(15).optional().or(z.literal("")),
  discord: z.string().min(3).max(15).optional().or(z.literal("")),
  game: z.string().min(2).max(15).optional().or(z.literal("")),
  bio: z.string().min(2).max(250).optional().or(z.literal("")),
});
export const changeUserAction = async (formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { status: "Unauthorized" };
    }

    const formDataValues: { [key: string]: any } = {};
    for (const [key, value] of formData.entries()) {
      formDataValues[key] = value;
    }
    const result = changeSchema.safeParse(formDataValues);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + " ";
      });
      return { status: errorMessage };
    }
    const { nickname, password, discord, game, bio } = formDataValues;

    const fieldsToChange: Record<string, any> = {};
    if (password !== "") {
      const hashedPassword = await bcrypt.hash(password, 12);
      fieldsToChange["hashedPassword"] = hashedPassword;
    }
    if (nickname !== "") {
      fieldsToChange["nickname"] = nickname;
    }
    if (discord !== "") {
      fieldsToChange["discord"] = discord;
    }
    if (game !== "") {
      fieldsToChange["favoriteGame"] = game;
    }
    if (bio !== "") {
      fieldsToChange["bio"] = bio;
    }
    await prisma.profile.update({
      where: {
        email: session?.user.info.email,
      },
      data: fieldsToChange,
    });
    revalidatePath("/profile");
    return { status: "Success", nickname: nickname };
  } catch (error) {
    console.log(error, "CHANGE PROFILE ERROR");
    return { status: "Internal Error" };
  }
};

type updateImageReturns = {
  Error?: {
    errorMsg: string;
  };
  data?: {
    imageUrl: string;
  };
};

export const updateImage = async (
  formData: FormData,
  endpoint: "profileBanner" | "imageUrl"
): Promise<updateImageReturns> => {
  try {
    const ACCEPT_FILES = [".png", ".jpeg", ".webp", ".jpg"];

    const session = await getServerSession(authOptions);
    if (!session) {
      return {
        Error: {
          errorMsg: "Unauthorized",
        },
      };
    }

    const file = formData.get("file") as File;
    const ext = "." + file.name.split(".").at(-1)?.toLowerCase();
    if (!ACCEPT_FILES.includes(ext)) {
      return {
        Error: {
          errorMsg: "Invalid image extension",
        },
      };
    }
    const utapi = new UTApi();
    const res = await utapi.uploadFiles(file);
    if (res.error) {
      return {
        Error: {
          errorMsg: "Internal server error",
        },
      };
    }
    const { url } = res.data;

    const imageToDelete = await prisma.profile.findFirst({
      where: {
        id: session.user.info.id,
      },
      select: {
        [endpoint]: true,
      },
    });
    await prisma.profile.update({
      where: {
        id: session.user.info.id,
      },
      data: {
        [endpoint]: url,
      },
    });
    console.log(imageToDelete);
    try {
      if (imageToDelete![endpoint]) {
        const parts = (imageToDelete![endpoint] as unknown as string).split(
          "/"
        );
        const fileName = parts[parts.length - 1];
        console.log(fileName);
        const res = await utapi.deleteFiles(fileName);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    revalidatePath("/profile");
    return {
      data: {
        imageUrl: res.data.url,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      Error: {
        errorMsg: `${error}`,
      },
    };
  }
};

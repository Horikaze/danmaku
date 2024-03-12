import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi } from "uploadthing/server";
import { revalidatePath } from "next/cache";
import { authOptions } from "../auth/[...nextauth]/auth";
const f = createUploadthing();
const utapi = new UTApi();

export const ourFileRouter = {
  profileImage: f({ image: { maxFileSize: "2MB" } })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions);
      if (!session) throw new Error("Unauthorized");

      const user = await prisma.profile.findFirst({
        where: {
          id: session?.user.info.id,
        },
        select: {
          imageUrl: true,
          email: true,
        },
      });

      return {
        email: user?.email,
        currentProfileImage: user?.imageUrl,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      if (metadata.email == undefined) {
        throw new Error("Problem with auth");
      }
      await prisma.profile.update({
        where: {
          email: metadata.email,
        },
        data: {
          imageUrl: file.url,
        },
      });
      try {
        if (metadata.currentProfileImage) {
          const parts = metadata.currentProfileImage.split("/");
          const fileName = parts[parts.length - 1];
          await utapi.deleteFiles(`${fileName}`);
        }
      } catch (error) {
        console.log(error);
      }
      revalidatePath("/profile");
      return { image: file.url };
    }),
  profileBanner: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions);
      if (!session) throw new Error("Unauthorized");
      const user = await prisma.profile.findFirst({
        where: {
          id: session?.user.info.id,
        },
        select: {
          profileBanner: true,
          email: true,
        },
      });

      return {
        email: user?.email!,
        currentProfileBanner: user?.profileBanner!,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      if (metadata.email == undefined) {
        throw new Error("Problem with auth");
      }

      await prisma.profile.update({
        where: {
          email: metadata.email,
        },
        data: {
          profileBanner: file.url,
        },
      });
      try {
        if (metadata.currentProfileBanner) {
          const parts = metadata.currentProfileBanner.split("/");
          const fileName = parts[parts.length - 1];
          await utapi.deleteFiles(fileName);
        }
      } catch (error) {
        console.log(error);
      }
      revalidatePath("/profile");
      return { image: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

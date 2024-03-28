import prisma from "@/app/lib/prismadb";
import { convertUnixDateHours } from "@/app/lib/utils";
import Copy from "@/app/mainComponents/Copy";
import { Divider } from "@/app/mainComponents/Divider";
import ProfileImage from "@/app/mainComponents/ProfileImage";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import UpdateImages from "./UpdateImages";
import ProfileInfo from "./ProfileInfo";
import { notFound } from "next/navigation";
import { replayWithNickname } from "@/app/types/Replay";

export default async function MainProfile({ userId }: { userId: string }) {
  const user = await prisma.profile.findFirst({
    where: {
      id: userId,
    },
    include: {
      Replays: {
        include: {
          Profile: {
            select: {
              nickname: true,
            },
          },
        },
        orderBy: {
          uploadedDate: "desc",
        },
      },
      CCTable: true,
    },
  });
  console.log("refetched");
  if (!user) {
    return notFound();
  }

  const modReplays =
    user.admin === true
      ? ((await prisma.replay.findMany({
          where: {
            status: {
              not: true,
            },
          },
          include: {
            Profile: {
              select: {
                nickname: true,
              },
            },
          },
          orderBy: {
            uploadedDate: "desc",
          },
        })) as replayWithNickname[])
      : null;

  return (
    <div className="flex flex-col gap-y-3">
      <div className="w-full relative flex justify-end">
        {user.profileBanner ? (
          <>
            <div
              style={{
                textOrientation: "sideways",
                writingMode: "vertical-rl",
              }}
              className="px-1 flex relative items-center bg-black opacity-40 text-xs justify-center whitespace-nowrap z-20 xl:h-56 h-48 select-none md:hover:py-32 xl:hover:py-44 2xl:hover:py-56 transition-all"
            >
              <p>Expand image</p>
            </div>
            <Image
              src={user.profileBanner}
              alt="banner"
              fill
              className="z-0 object-cover object-center h-full pointer-events-none"
            />
          </>
        ) : (
          <div className="h-12 text-sm bottom-0 text-end pt-[18px] pr-10 opacity-50 ">
            Select your banner here ➔
          </div>
        )}
        <div className="absolute bottom-0 right-0 pr-1 opacity-10 hover:opacity-50 transition-opacity">
          <UpdateImages endpoint="profileBanner" />
        </div>
      </div>
      <div className="flex flex-col p-3">
        <div className="flex">
          <div className="size-24 md:size-32 group relative bg-white/10 rounded-full text-center drop-shadow-md mr-3 overflow-hidden">
            <ProfileImage imageUrl={user.imageUrl} />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity">
              <UpdateImages endpoint="profileImage" />
            </div>
          </div>
          <div className="flex-1 overflow-x-hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold float-left">
                {user.nickname}
              </h2>
              <div className="flex space-x-2">
                <div className="text-sm text-tsecond flex items-center gap-x-1 hover:brightness-125 cursor-pointer">
                  <Copy text={"uid"} />
                </div>
                {user.discord ? (
                  <div className="space-x-1">
                    <FaDiscord className="size-6 float-left" />
                    <p className="float-right text-sm">{user.discord}</p>
                  </div>
                ) : null}
              </div>
            </div>
            <Divider />
            <div className="flex flex-col md:flex-row p-2 justify-between text-tsecond space-y-0.5">
              <div className="text-sm">
                <p> CC Count: {user.CCCount}</p>
                <p> Points: {user.points}</p>
                <p> Event points: {user.event}</p>
              </div>

              <div className="text-xs text-end md:block hidden w-1/2 flex-col items-end space-y-0.5 ">
                <p>Joined: {convertUnixDateHours(user.joindate as any)}</p>
                <p>Favorite game: {user.favoriteGame}</p>
                {user.bio ? <p> Bio: {user.bio}</p> : null}
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs text-start w-full md:hidden text-tsecond block md:w-1/2 flex-col items-start space-y-0.5 mb-2.5">
          <p>Joined: {convertUnixDateHours(user.joindate as any)}</p>
          <p>Favorite game: {user.favoriteGame}</p>
          {user.bio ? <p> Bio: {user.bio}</p> : null}
        </div>
        <ProfileInfo
          replays={user.Replays}
          user={user}
          ranking={user.CCTable!}
          modReplays={modReplays}
        />
      </div>
    </div>
  );
}

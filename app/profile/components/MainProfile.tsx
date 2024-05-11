import prisma from "@/app/lib/prismadb";
import { convertUnixDateHours, prismaExclude } from "@/app/lib/utils";
import Copy from "@/app/mainComponents/Copy";
import { Divider } from "@/app/mainComponents/Divider";
import ProfileImage from "@/app/mainComponents/ProfileImage";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import UpdateImages from "./UpdateImages";
import ProfileInfo from "./ProfileInfo";
import { notFound } from "next/navigation";
import { FaImage } from "react-icons/fa6";

export default async function MainProfile({ userId }: { userId: string }) {
  const user = await prisma.profile.findFirst({
    where: {
      id: userId,
    },
    include: {
      Replays: {
        orderBy: {
          uploadedDate: "desc",
        },
        select: {
          replayId: true,
          character: true,
          game: true,
          shottype: true,
          rank: true,
          achievement: true,
          score: true,
          uploadedDate: true,
          status: true,
        },
      },
      CCTable: true,
    },
  });

  console.log("refetched");
  if (!user) {
    return notFound();
  }
  const replaysWithNickname = user.Replays.map((r) => ({
    ...r,
    nickname: user.nickname,
  }));

  return (
    <div className="flex flex-col gap-y-3">
      <div className="w-full relative flex justify-end min-h-[32px]">
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
        ) : null}
        <div className="absolute bottom-0 right-6 pr-1 p-1">
          <UpdateImages endpoint="profileImage">
            <FaImage className="size-6" />
          </UpdateImages>
        </div>
      </div>
      <div className="flex flex-col p-3">
        <div className="flex">
          <div className="size-24 md:size-32 group relative bg-white/10 rounded-[100px] hover:rounded-[30px] transition-all text-center drop-shadow-md mr-3 overflow-hidden">
            <UpdateImages endpoint="profileImage">
              <ProfileImage imageUrl={user.imageUrl} />
            </UpdateImages>
          </div>
          <div className="flex-1 overflow-x-hidden">
            <div className="flex items-center justify-between">
              <h2 className="md:text-2xl text-xl font-semibold float-left">
                {user.nickname}
              </h2>
              <div className="flex space-x-2">
                <div className="text-sm text-tsecond flex items-center gap-x-1 hover:brightness-125 cursor-pointer">
                  <Copy text={"uid"} content={user.id} />
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
          replays={replaysWithNickname}
          user={user}
          ranking={user.CCTable!}
        />
      </div>
    </div>
  );
}

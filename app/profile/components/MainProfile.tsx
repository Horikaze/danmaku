import prisma from "@/app/lib/prismadb";
import { Divider } from "@/app/mainComponents/Divider";
import { FaDiscord } from "react-icons/fa";
import ProfileController from "./ProfileController";
import ReplayTable from "./ReplayTable";
import { convertUnixDateHours } from "@/app/lib/utils";
import ProfileImage from "@/app/mainComponents/ProfileImage";
export default async function MainProfile({
  tab,
  userId,
}: {
  tab: string;
  userId: string;
}) {
  const user = await prisma.profile.findFirst({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return null;
  }
  return (
    <div className="flex flex-col w-full gap-y-3">
      <div className="h-48 w-full bg-white/10 xl:h-56"></div>
      <div className="flex flex-col p-3">
        <div className="flex flex-row">
          <div className="size-24 md:size-32 bg-white/10 rounded-full text-center drop-shadow-md mr-3 overflow-hidden">
            <ProfileImage imageUrl={user.imageUrl} />
          </div>
          <div className="grow">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{user.nickname}</h2>
              {user.discord ? (
                <div className="space-x-1">
                  <FaDiscord className="size-6 float-left" />
                  <p className="float-right text-sm">{user.discord}</p>
                </div>
              ) : null}
              {/* remove after */}
              <div className="space-x-1">
                <FaDiscord className="size-6 float-left" />
                <p className="float-right text-sm">null</p>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col text-sm text-tsecond p-2 space-y-0.5 relative">
              <p> CC Count: {user.CCCount}</p>
              <p> Points: {user.points}</p>
              <p> Event points: {user.event}</p>
              <p className="absolute text-xs right-0 bottom-0">
                Joined: {convertUnixDateHours(user.joindate as any)}
              </p>
            </div>
          </div>
        </div>
        <ProfileController currentTab={tab} />
        <Divider className="m-5" />
        {tab === "table" ? (
          <ReplayTable userId={userId} />
        ) : (
          <div>
            <p>{tab}</p>
          </div>
        )}
      </div>
    </div>
  );
}

import prisma from "@/app/lib/prismadb";
import { Divider } from "@/app/mainComponents/Divider";
import { FaDiscord } from "react-icons/fa";
import ProfileController from "./ProfileController";
import ReplayTable from "./ReplayTable";
import { convertUnixDateHours } from "@/app/lib/utils";
import ProfileImage from "@/app/mainComponents/ProfileImage";
import Settings from "./Settings";
import UpdateImages from "./UpdateImages";
import Image from "next/image";
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
  const TabComponent = () => {
    switch (tab) {
      case "table":
        return <ReplayTable userId={userId} />;
      case "settings":
        return <Settings />;
      default:
        return (
          <div>
            <p>{tab}</p>
          </div>
        );
    }
  };
  return (
    <div className="flex flex-col w-full gap-y-3">
      <div className="w-full relative">
        {user.profileBanner ? (
          <>
            <div
              style={{
                textOrientation: "sideways",
                writingMode: "vertical-rl",
              }}
              className="px-1 flex relative  opac items-center bg-black opacity-40 text-xs justify-center whitespace-nowrap z-20 xl:h-56 h-48 select-none md:hover:py-32 xl:hover:py-44 2xl:hover:py-56 transition-all"
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
          <div className="h-12 text-sm bottom-0 text-end pt-3 pr-10 opacity-50 ">
            Select your banner here ➔
          </div>
        )}
        <div className="absolute bottom-0 right-0 pr-1 opacity-10 hover:opacity-50 transition-opacity">
          <UpdateImages endpoint="profileBanner" />
        </div>
      </div>
      <div className="flex flex-col p-3">
        <div className="flex flex-row">
          <div className="size-24 md:size-32 group relative bg-white/10 rounded-full text-center drop-shadow-md mr-3 overflow-hidden">
            <ProfileImage imageUrl={user.imageUrl} />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity">
              <UpdateImages endpoint="profileImage" />
            </div>
          </div>
          <div className="grow ">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{user.nickname}</h2>
              {user.discord ? (
                <div className="space-x-1">
                  <FaDiscord className="size-6 float-left" />
                  <p className="float-right text-sm">{user.discord}</p>
                </div>
              ) : null}
            </div>
            <Divider />
            <div className="flex flex-col md:flex-row p-2 justify-between text-tsecond space-y-0.5">
              <div className="text-sm  space-y-0.5">
                <p> CC Count: {user.CCCount}</p>
                <p> Points: {user.points}</p>
                <p> Event points: {user.event}</p>
              </div>

              <p className="text-xs text-start ">
                Joined: {convertUnixDateHours(user.joindate as any)}
              </p>
            </div>
          </div>
        </div>
        <ProfileController currentTab={tab} />
        <Divider className="m-5" />
        <TabComponent />
      </div>
    </div>
  );
}

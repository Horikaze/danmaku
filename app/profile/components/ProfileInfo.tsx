"use client";
import { Divider } from "@/app/mainComponents/Divider";
import { ButtonInput } from "@/app/mainComponents/InputButton";
import { InputText } from "@/app/mainComponents/InputText";
import ReplaysList from "@/app/mainComponents/ReplaysList";
import { replayWithNickname } from "@/app/types/Replay";
import { Profile, Ranking } from "@prisma/client";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteReplayAction } from "../actions/replayActions";
import ReplayTable from "./ReplayTable";
import SendReplay from "./SendReplay";
import Settings from "./Settings";

const tabs = ["Table", "Send", "My replays", "Settings"];
export default function ProfileInfo({
  user,
  replays,
  ranking,
}: {
  user: Profile;
  replays: replayWithNickname[];
  ranking: Ranking;
}) {
  const [currentTab, setcurrentTab] = useState(0);
  function TabComponent() {
    switch (currentTab) {
      case 0:
        return <ReplayTable tableData={ranking} />;
      case 1:
        return <SendReplay />;
      case 2:
        return (
          <div className="flex flex-col w-full mt-1 items-center justify-center">
            <form
              action={async (e) => {
                try {
                  const replay = e.get("replayId") as string;
                  if (replay === "") {
                    toast.error("No id provided");
                    return;
                  }
                  const res = await deleteReplayAction({ replayId: replay });
                  toast.success(`${res}`);
                } catch (error) {
                  toast.error(`${error}`);
                  console.log(error);
                }
              }}
              className="flex gap-x-2 items-center justify-end w-full"
            >
              <InputText
                className="max-w-32 py-0 px-1 h-7 text-sm rounded-sm"
                placeholder="replayId"
                id="replayId"
                name="replayId"
              />
              <ButtonInput variant={"outline"} className="rounded-sm">
                Delete
              </ButtonInput>
            </form>
            <ReplaysList replays={replays} />
          </div>
        );
      case 3:
        return <Settings favoriteGame={user.favoriteGame || "EOSD"} />;
      default:
        return <ReplayTable tableData={ranking} />;
    }
  }
  return (
    <div>
      <div className="flex justify-center space-x-1 font-light text-sm md:text-base select-none">
        {tabs.map((e, idx) => (
          <div
            onClick={() => {
              setcurrentTab(idx);
            }}
            key={e}
            className="relative py-1 px-3.5 rounded-full whitespace-nowrap cursor-pointer"
          >
            {currentTab === idx ? (
              <motion.div
                layoutId="profile-tab"
                className="absolute inset-0 bg-white"
                style={{ borderRadius: 9999 }}
                transition={{ type: "just", duration: 0.2 }}
              />
            ) : null}
            <span className="relative z-10 mix-blend-exclusion">{e}</span>
          </div>
        ))}
      </div>
      <Divider className="m-5" />
      <div className="flex justify-center items-center w-full md:px-4 lg:px-24 xl:px-36 overflow-y-scroll">
        <TabComponent />
      </div>
    </div>
  );
}

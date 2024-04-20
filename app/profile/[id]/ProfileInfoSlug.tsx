"use client";
import { Divider } from "@/app/mainComponents/Divider";
import ReplaysList from "@/app/mainComponents/ReplaysList";
import { replayWithNickname } from "@/app/types/Replay";
import { Profile, Ranking } from "@prisma/client";
import { motion } from "framer-motion";
import { useState } from "react";
import ReplayTable from "../components/ReplayTable";

const tabs = ["Table", "My replays"];
export default function ProfileInfoSlug({
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
        return <ReplaysList replays={replays} />;
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
      <Divider className="my-5" />
      <div className="flex justify-center items-center w-full md:px-4 lg:px-24 xl:px-36">
        <TabComponent />
      </div>
    </div>
  );
}

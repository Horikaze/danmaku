"use client";
import { Divider } from "@/app/mainComponents/Divider";
import { RankingUser } from "@/app/types/Replay";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import RankingElement from "./RankingElement";
const tabs = ["CC count", "Challenge"];

type RankingProps = {
  rankingCC: RankingUser[];
};

export default function Ranking({ rankingCC }: RankingProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const arrayToMap = rankingCC;

  const scrollRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="bg-primary flex flex-col h-[500px] w-full drop-shadow-md p-3 gap-y-3 overflow-auto">
      <div className="flex justify-center space-x-1 font-light">
        {tabs.map((e, idx) => (
          <button
            onClick={() => {
              setCurrentTab(idx);
              scrollRef.current ? (scrollRef.current!.scrollTop = 0) : null;
            }}
            key={e}
            className="relative py-0.5 px-3.5 rounded-full"
          >
            {currentTab === idx ? (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-white"
                style={{ borderRadius: 9999 }}
                transition={{ type: "just", duration: 0.2 }}
              />
            ) : null}
            <span className="relative z-10 mix-blend-exclusion">{e}</span>
          </button>
        ))}
      </div>
      <Divider />
      {currentTab !== 1 ? (
        <div ref={scrollRef} className="flex flex-col h-full gap-y-1">
          {arrayToMap.map((u, idx) => (
            <RankingElement key={u.id + currentTab} user={u} idx={idx} />
          ))}
        </div>
      ) : (
        <p className="text-center font-semibold text-3xl">Soon...</p>
      )}
    </div>
  );
}

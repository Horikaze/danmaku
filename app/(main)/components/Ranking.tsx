"use client";
import { Divider } from "@/app/mainComponents/Divider";
import { RankingUser } from "@/app/types/Replay";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import RankingElement from "./RankingElement";
const tabs = ["Points", "1cc", "Challenge"];

type RankingProps = {
  rankingPoints: RankingUser[];
  rankingCC: RankingUser[];
  rankingEvent: RankingUser[];
};

export default function Ranking({
  rankingCC,
  rankingEvent,
  rankingPoints,
}: RankingProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const arrayToMap =
    currentTab === 0
      ? rankingPoints
      : currentTab === 1
      ? rankingCC
      : rankingEvent;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="bg-primary flex flex-col h-[500px] w-full drop-shadow-md p-3 gap-y-3">
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
      {currentTab !== 2 ? (
        <div
          ref={scrollRef}
          className="flex flex-col h-full gap-y-1"
        >
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

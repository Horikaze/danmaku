"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import RankingElement from "./RankingElement";
import { Divider } from "@/app/mainComponents/Divider";
const tabs = ["Points", "1cc", "Challenge"];
const myArray = Array.from({ length: 10 }, (_, index) => index + 1);
export default function Ranking() {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <div className="bg-primary flex flex-col h-[500px] w-full drop-shadow-md p-3 gap-y-3">
      <div className="flex justify-center space-x-1 font-light">
        {tabs.map((e) => (
          <button
            onClick={() => setCurrentTab(e)}
            key={e}
            className="relative py-0.5 px-3.5 rounded-full"
          >
            {currentTab === e ? (
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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col space-y-1 overflow-y-scroll"
        >
          {myArray.map((e, idx) => {
            return <RankingElement key={e} idx={idx} />;
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

"use client";
import { motion } from "framer-motion";
import Divider from "@/app/mainComponents/Divider";
import { useState } from "react";
const tabs = ["Points", "1cc", "Challenge"];

export default function Ranking() {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  return (
    <div className="bg-primary flex flex-col size-96 drop-shadow-md p-3 font-thin text-lg gap-y-2">
      <div className="flex justify-center space-x-1">
        {tabs.map((e) => (
          <button
            onClick={() => setCurrentTab(e)}
            key={e}
            className="relative py-1.5 px-3"
          >
            {currentTab === e ? (
              <motion.div
                layoutId="active-tab"
                className=" absolute inset-0 bg-white"
                style={{ borderRadius: 9999 }}
                transition={{ type: "just", duration: 0.2 }}
              />
            ) : null}
            <span className="relative z-10 mix-blend-exclusion">{e}</span>
          </button>
        ))}
      </div>
      <Divider />
    </div>
  );
}

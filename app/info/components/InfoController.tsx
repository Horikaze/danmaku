"use client";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const tabs = [
  { href: "/info", label: "Points" },
  { href: "/info/event", label: "Event" },
  { href: "/info/ranking", label: "Ranking" },
];

export default function InfoController() {
  const [currentTab, setcurrentTab] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="flex flex-wrap w-full gap-3 justify-center">
      {tabs.map((e, idx) => (
        <div
          onClick={() => {
            setcurrentTab(idx);
            router.replace(e.href, { scroll: false });
          }}
          key={e.label}
          className="relative py-1 px-3.5 rounded-full whitespace-nowrap cursor-pointer"
        >
          {currentTab === idx ? (
            <motion.div
              layoutId="info-tab"
              className="absolute inset-0 bg-white"
              style={{ borderRadius: 9999 }}
              transition={{ type: "just", duration: 0.2 }}
            />
          ) : null}
          <span className="relative z-10 mix-blend-exclusion">{e.label}</span>
        </div>
      ))}
    </div>
  );
}

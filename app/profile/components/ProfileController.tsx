"use client";
import { motion } from "framer-motion";
import Link from "next/link";

type Tabs = {
  href: string;
  name: string;
};

export default function ProfileController({
  currentTab,
  tabs,
}: {
  currentTab: string;
  tabs: Tabs[];
}) {
  return (
    <div>
      <div className="flex justify-center space-x-1 font-light text-sm md:text-base ">
        {tabs.map((e) => (
          <Link
            href={`?tab=${e.href}`}
            scroll={false}
            key={e.href}
            replace
            className="relative py-1 px-3.5 rounded-full whitespace-nowrap"
          >
            {currentTab === e.href ? (
              <motion.div
                layoutId="profile-tab"
                className="absolute inset-0 bg-white"
                style={{ borderRadius: 9999 }}
                transition={{ type: "just", duration: 0.2 }}
              />
            ) : null}
            <span className="relative z-10 mix-blend-exclusion">{e.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

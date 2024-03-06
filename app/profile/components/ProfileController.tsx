"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
const tabs = [
  {
    href: "table",
    name: "Table",
  },
  {
    href: "send",
    name: "Send",
  },
  {
    href: "myreplays",
    name: "My replays",
  },
  {
    href: "settings",
    name: "Settings",
  },
];
export default function ProfileController({
  currentTab,
}: {
  currentTab: string;
}) {
  return (
    <div>
      <div className="flex justify-center space-x-1 font-light text-sm md:text-base ">
        {tabs.map((e) => (
          <Link
            href={`?tab=${e.href}`}
            scroll={false}
            key={e.href}
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

"use client";
import { Replay } from "@prisma/client";
import { useState } from "react";
import { ButtonInput } from "../mainComponents/InputButton";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { convertUnixDate } from "../lib/utils";
import { achievementRankValues } from "../constants/games";
import Link from "next/link";
export type sortTypesType =
  | "Points"
  | "Achievement"
  | "Score"
  | "Slow"
  | "Date";
const sortTypes: sortTypesType[] = [
  "Score",
  "Points",
  "Achievement",
  "Slow",
  "Date",
];
export default function ReplaysTable({ replays }: { replays: Replay[] }) {
  const [sortDir, setSortDir] = useState<boolean>(true);
  const [activeSort, setActiveSort] = useState<sortTypesType>("Points");
  const [isOpen, setIsOpen] = useState(false);

  const changeSorting = (sortType: sortTypesType) => {
    if (activeSort === sortType) {
      setSortDir((prev) => !prev);
    }
    setIsOpen(false);
    setActiveSort(sortType);
  };

  replays.sort((a, b) => {
    if (activeSort === "Date") {
      //@ts-ignore known value
      return a.uploadedDate - b.uploadedDate;
    }
    if (activeSort === "Slow") {
      //@ts-ignore known value
      return a.slowRate - b.slowRate;
    }
    return (
      //@ts-ignore known value
      Number(a[activeSort?.toLowerCase()]) -
      //@ts-ignore known value
      Number(b[activeSort?.toLowerCase()])
    );
  });
  if (!sortDir) {
    replays.reverse();
  }
  return (
    <div className="flex flex-col bg-primary w-full min-h-64 drop-shadow-md p-3 text-sm md:text-base">
      <div className="flex flex-col gap-y-3">
        <div className="flex text-center">
          <div className="basis-1/5 px-1 relative hover:bg-hover transition-colors flex items-center gap-x-1 rounded-md p-2 cursor-pointer select-none overflow-x-hidden">
            Player
          </div>
          {sortTypes.map((e) => (
            <div
              key={e}
              className={`basis-1/5 px-1 relative hover:bg-hover ${
                activeSort === e ? "bg-hover" : ""
              } transition-colors flex items-center gap-x-1 rounded-md p-2 cursor-pointer select-none overflow-x-hidden`}
              onClick={() => {
                changeSorting(e);
              }}
            >
              {activeSort === e ? (
                sortDir ? (
                  <FaArrowDown className="size-5" />
                ) : (
                  <FaArrowUp className="size-5" />
                )
              ) : null}
              <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                {e}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-y-2 overflow-x-scroll">
          {replays.map((r) => (
            <Link
              href={`/replay/${r.replayId}`}
              prefetch={false}
              className="flex w-full justify-between py-2 bg-background hover:bg-hover transition-colors px-1 rounded-md text-center overflow-x-scroll"
              key={r.replayId}
            >
              <div className="basis-1/5 px-1 text-start">{r.player}</div>
              <div className="basis-1/5 px-1">{r.score.toLocaleString()}</div>
              <div className="basis-1/5 px-1">{r.points}</div>
              <div className="basis-1/5 px-1">
                {Object.keys(achievementRankValues)[r.achievement - 1]}
              </div>
              <div className="basis-1/5 px-1">{r.slowRate}</div>
              <div className="basis-1/5 px-1">
                {convertUnixDate(r.uploadedDate as any)}
              </div>
            </Link>
          ))}
        </div>
        {isOpen ? (
          <div
            className="fixed w-full h-[calc(100vh)] top-0 left-0 z-10"
            onClick={() => {
              setIsOpen(false);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

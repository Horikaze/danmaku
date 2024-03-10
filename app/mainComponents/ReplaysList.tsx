"use client";
import { Replay } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { achievementRankValues } from "../constants/games";
import { convertUnixDate } from "../lib/utils";
import { replayWithNickname } from "../types/Replay";
export type sortTypesType =
  | "Points"
  | "Achievement"
  | "Score"
  | "Slow"
  | "Date"
  | null;
const sortTypes: sortTypesType[] = [
  "Score",
  "Points",
  "Achievement",
  "Slow",
  "Date",
];


export default function ReplaysList({
  replays,
}: {
  replays: replayWithNickname[];
}) {
  const [sortDir, setSortDir] = useState<boolean>(true);
  const [activeSort, setActiveSort] = useState<sortTypesType>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchPlayer, setSearchPlayer] = useState("");

  const changeSorting = (sortType: sortTypesType) => {
    if (activeSort === sortType) {
      setSortDir((prev) => !prev);
    }
    setIsOpen(false);
    setActiveSort(sortType);
  };

  if (searchPlayer !== "") {
    replays = replays.filter((s) =>
      s.player.toLowerCase().includes(searchPlayer.toLowerCase())
    );
  }

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
    <div className="flex flex-col w-full min-h-64 p-3 text-sm md:text-base">
      <div className="flex flex-col gap-y-3">
        <div className="flex text-center gap-x-1">
          <div className="w-1/5 px-1 relative flex items-center">
            <input
              placeholder="Player"
              onChange={(e) => setSearchPlayer(e.target.value)}
              value={searchPlayer}
              className="w-full bg-primary placeholder:text-white focus:outline-none focus:bg-hover hover:bg-hover transition-colors p-2 select-none rounded-md"
            />
            {searchPlayer !== "" ? (
              <IoClose
                onClick={() => setSearchPlayer("")}
                className="absolute size-6 top-1/2 -translate-y-1/2 right-2 z-20 cursor-pointer hover:bg-hover rounded-full"
              />
            ) : null}
          </div>
          {sortTypes.map((e) => (
            <div
              key={e}
              className={`w-1/5 px-1 relative hover:bg-hover ${
                activeSort === e ? "bg-hover" : ""
              } transition-colors flex items-center rounded-md p-2 cursor-pointer select-none overflow-x-hidden`}
              onClick={() => {
                changeSorting(e);
              }}
            >
              {activeSort === e ? (
                sortDir ? (
                  <FaArrowDown className="size-5 hidden md:block" />
                ) : (
                  <FaArrowUp className="size-5 hidden md:block" />
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
              className="flex w-full justify-between min-w-[600px] py-2 bg-background hover:bg-hover transition-colors px-1 rounded-md text-center"
              key={r.replayId}
            >
              <div className="w-1/5 px-1 text-start ">{r.Profile.nickname}</div>
              <div className="w-1/5 px-1 ">{r.score.toLocaleString()}</div>
              <div className="w-1/5 px-1 ">{r.points}</div>
              <div className="w-1/5 px-1 ">
                {Object.keys(achievementRankValues)[r.achievement - 1]}
              </div>
              <div className="w-1/5 px-1 ">{r.slowRate}</div>
              <div className="w-1/5 px-1 ">
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

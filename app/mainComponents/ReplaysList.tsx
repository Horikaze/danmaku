"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdOutlineVerified, MdVerified } from "react-icons/md";
import { achievementRankValues } from "../constants/games";
import { convertUnixDate, getGameString } from "../lib/utils";
import { replayWithNickname } from "../types/Replay";
export type sortTypesType =
  | "Points"
  | "Achievement"
  | "Score"
  | "Game"
  | "Character"
  | "Rank"
  | "Date"
  | null;
const sortTypes: sortTypesType[] = [
  "Game",
  "Rank",
  "Points",
  "Achievement",
  "Score",
  "Date",
];

export default function ReplaysList({
  replays,
}: {
  replays: replayWithNickname[];
}) {
  const [sortDir, setSortDir] = useState<boolean>(true);
  const [activeSort, setActiveSort] = useState<sortTypesType>(null);
  const [searchPlayer, setSearchPlayer] = useState("");
  const [searchChara, setsearchChara] = useState("");
  const changeSorting = (sortType: sortTypesType) => {
    if (activeSort === sortType) {
      setSortDir((prev) => !prev);
    }
    setActiveSort(sortType);
  };

  if (replays.length <= 0) {
    return (
      <div className="flex text-2xl text-tsecond text-center font-semibold items-center justify-center h-32">
        <h3>Replays not found</h3>
      </div>
    );
  }

  if (searchPlayer !== "") {
    replays = replays.filter((s) =>
      s.Profile!.nickname.toLowerCase().includes(searchPlayer.toLowerCase())
    );
  }
  if (searchChara !== "") {
    replays = replays.filter((s) =>
      s.character.toLowerCase().includes(searchChara.toLowerCase())
    );
  }

  replays.sort((a, b) => {
    if (activeSort === "Date") {
      //@ts-ignore known value
      return a.uploadedDate - b.uploadedDate;
    }
    if (activeSort === "Rank") {
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
    <div className="flex flex-col w-full min-h-64 p-3 text-xs md:text-sm overflow-x-scroll">
      <div className="flex flex-col gap-y-3 w-full min-w-[650px]">
        <div className="flex text-center gap-x-1 justify-between">
          <div className="w-2/12 relative flex">
            <input
              placeholder="Nickname"
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
          <div className="w-1/12 relative flex">
            <input
              placeholder="Character"
              onChange={(e) => setsearchChara(e.target.value)}
              value={searchChara}
              className="w-full bg-primary placeholder:text-white focus:outline-none focus:bg-hover hover:bg-hover transition-colors p-2 select-none rounded-md"
            />
            {searchChara !== "" ? (
              <IoClose
                onClick={() => setsearchChara("")}
                className="absolute size-6 top-1/2 -translate-y-1/2 right-2 z-20 cursor-pointer hover:bg-hover rounded-full"
              />
            ) : null}
          </div>

          {sortTypes.map((e) => {
            return (
              <div
                key={e}
                className={`${
                  e === "Score" || e === "Date" ? "w-[12%]" : "w-1/12"
                } px-1 hover:bg-hover overflow-hidden ${
                  activeSort === e ? "bg-hover" : ""
                } transition-colors flex items-center rounded-md p-2 cursor-pointer select-none`}
                onClick={() => {
                  changeSorting(e);
                }}
              >
                <span className="text-center w-full">{e}</span>
              </div>
            );
          })}

          <div
            className="w-5 flex items-center justify-center cursor-pointer"
            onClick={() => setSortDir((prev) => !prev)}
          >
            {sortDir ? (
              <FaArrowDown className="size-5" />
            ) : (
              <FaArrowUp className="size-5" />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          {replays.map((r, idx) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              key={r.replayId}
            >
              <Link
                href={`/replay/${r.replayId}`}
                prefetch={false}
                className="flex w-full text-center min-w-[600px] py-2 px-1 bg-primary hover:bg-hover transition-colors rounded-md gap-x-1 justify-between whitespace-nowrap"
              >
                <div className="w-2/12 px-1 text-start">
                  {r.Profile!.nickname}
                </div>
                <div className="w-1/12 px-1">
                  {r.character} {r.shottype}
                </div>
                <div className="w-1/12 px-1">{getGameString(r.game)}</div>
                <div className="w-1/12 px-1">{r.rank}</div>
                <div className="w-1/12 px-1 ">{r.points}</div>
                <div className="w-1/12 px-1">
                  {Object.keys(achievementRankValues)[r.achievement - 1]}
                </div>
                <div className="w-[12%] px-1">{r.score.toLocaleString()}</div>
                <div className="w-[12%]">
                  {convertUnixDate(r.uploadedDate as any)}
                </div>
                <div className="">
                  {r.status ? (
                    <MdVerified className="size-5" />
                  ) : (
                    <MdOutlineVerified className="size-5" />
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

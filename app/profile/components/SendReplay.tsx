"use client";
import { ButtonInput, buttonVariants } from "@/app/mainComponents/InputButton";
import { ReplayInfo } from "@/app/types/Replay";
import { useState } from "react";
import { threp } from "../actions/replayActions";
import { cn, getCharacterFromData } from "@/app/lib/utils";
export default function SendReplay() {
  const [replayData, setreplayData] = useState<ReplayInfo | null>(null);

  const checkRpy = async (e: File) => {
    if (!e) return;
    try {
      const formData = new FormData();
      formData.append("replay", e);
      const res = await threp(formData);
      setreplayData(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex-col flex w-full items-center space-y-3">
      <div className="flex justify-between w-full relative">
        <input
          type="file"
          hidden
          multiple={false}
          accept=".rpy"
          id="replay"
          name="replay"
          onChange={(e) => checkRpy(e.target.files![0])}
        />
        <label
          htmlFor="replay"
          className={cn(
            buttonVariants({ variant: "default" }),
            "cursor-pointer flex items-center"
          )}
        >
          Chosse .rpy file
        </label>
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-tsecond font-semibold">
          {replayData?.rpy_name ? replayData?.rpy_name : "No file selected"}
        </p>
        <ButtonInput variant={"outline"}>Clear</ButtonInput>
      </div>
      <div className="flex flex-col font-semibold w-full space-y-1">
        <p>
          Player: <span className="text-tsecond">{replayData?.player}</span>
        </p>
        <p>
          Character:{" "}
          <span className="text-tsecond">
            {getCharacterFromData(
              replayData?.character!,
              replayData?.shottype!
            ) || ""}
          </span>
        </p>
        <p>
          Rank: <span className="text-tsecond">{replayData?.rank}</span>
        </p>
        <p>
          Score:{" "}
          <span className="text-tsecond">
            {replayData?.stage_score.at(-1)?.toLocaleString()}
          </span>
        </p>
        <p>
          Stage:{" "}
          <span className="text-tsecond">
            {replayData?.stage || "Not supported"}
          </span>
        </p>
        <p>
          Slow rate{" "}
          <span className="text-tsecond">{replayData?.slow_rate}</span>
        </p>
      </div>
    </div>
  );
}

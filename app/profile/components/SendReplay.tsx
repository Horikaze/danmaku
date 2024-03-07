"use client";
import { ButtonInput, buttonVariants } from "@/app/mainComponents/InputButton";
import { ReplayInfo } from "@/app/types/Replay";
import { useState } from "react";
import {
  checkReplayExist,
  sendReplayAction,
  threp,
} from "../actions/replayActions";
import { cn, getCharacterFromData, getGameNumber } from "@/app/lib/utils";
import ButtonLoader from "@/app/mainComponents/ButtonLoader";
import ReplayScoreChart from "@/app/mainComponents/ReplayScoreChart";
import { InputCheckbox } from "@/app/mainComponents/InputCheckbox";
import toast from "react-hot-toast";
export default function SendReplay() {
  const [replayData, setreplayData] = useState<ReplayInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [replayFile, setReplayFile] = useState<FormData | null>(null);
  const [chart, setChart] = useState(true);
  const clearAll = () => {
    console.log("as");
    setreplayData(null);
    setReplayFile(null);
    setIsLoading(false);
  };
  const checkRpy = async (e: File) => {
    if (!e) return;
    try {
      setIsLoading(true);
      const formData = new FormData();
      setReplayFile(formData);
      formData.append("replay", e);
      const res = await threp(formData);
      setreplayData(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      clearAll();
    }
  };
  const checkExist = async () => {
    try {
      setIsLoading(true);
      const res = await checkReplayExist(replayData!);
      toast.success(`${res}`);
      console.log(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const sendReplay = async () => {
    try {
      setIsLoading(true);
      const res = await sendReplayAction(replayData!, replayFile!);
      console.log(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex-col flex w-full items-center space-y-3">
      <div className="flex justify-between w-full relative text-sm md:text-base">
        <input
          type="file"
          disabled={isLoading}
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
          <ButtonLoader loading={isLoading} />
          Choose .rpy file
        </label>
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-tsecond font-semibold">
          {replayData?.rpy_name ? replayData?.rpy_name : "No file selected"}
        </p>
        <ButtonInput variant={"outline"} onClick={clearAll}>
          Clear
        </ButtonInput>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col font-semibold w-full space-y-1">
          <p>
            Game:{" "}
            <span className="text-tsecond">
              {replayData
                ? `Touhou: ${getGameNumber(replayData?.rpy_name!)}`
                : ""}
            </span>
          </p>
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
              {replayData?.stage || replayData === null ? "" : "Not supported"}
            </span>
          </p>
          <p>
            Slow rate:{" "}
            <span className="text-tsecond">{replayData?.slow_rate}</span>
          </p>
        </div>
        <div className="flex items-end flex-col justify-end text-sm md:text-base gap-y-1">
          <ButtonInput
            onClick={checkExist}
            className="flex items-center whitespace-nowrap"
            disabled={isLoading || !replayFile || !replayData}
          >
            <ButtonLoader loading={isLoading} />
            Check exist
          </ButtonInput>
          <ButtonInput
            onClick={sendReplay}
            className="flex items-center whitespace-nowrap"
            disabled={isLoading || !replayFile || !replayData}
          >
            <ButtonLoader loading={isLoading} />
            Send
          </ButtonInput>
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-1">
        <div className="gap-x-1 flex items-center">
          <InputCheckbox
            id="sendChart"
            name="sendChart"
            checked={chart}
            onChange={(e) => {
              setChart(e.target.checked);
            }}
          />
          <label htmlFor="sendChart" className="select-none">
            Show chart
          </label>
        </div>
        {replayData && chart ? (
          <ReplayScoreChart scores={replayData?.stage_score!} />
        ) : null}
      </div>
    </div>
  );
}

"use client";
import { achievementList } from "@/app/constants/games";
import { calculatePoints } from "@/app/lib/calculatePoints";
import {
  cn,
  getCharacterFromData,
  getGameNumber
} from "@/app/lib/utils";
import ButtonLoader from "@/app/mainComponents/ButtonLoader";
import { ButtonInput, buttonVariants } from "@/app/mainComponents/InputButton";
import { ReplayInfo } from "@/app/types/Replay";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  checkReplayExist,
  sendReplayAction,
  threp,
} from "../actions/replayActions";
import ReplayChart from "../../mainComponents/ReplayChart";
export default function SendReplay() {
  const [replayData, setreplayData] = useState<ReplayInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [replayFile, setReplayFile] = useState<FormData | null>(null);
  const [CC, setCC] = useState("CC");
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
      if (res === true) {
        toast.success("Replay exists");
      } else {
        toast.error("Replay does not exist.");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Internal problem");
      setIsLoading(false);
    }
  };
  const sendReplay = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const fileDate = replayFile?.get("replay") as File;
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const comment = formData.get("comment") as string;
      const points = calculatePoints(replayData!, CC);
      setIsLoading(true);
      const res = await sendReplayAction(replayData!, replayFile!, {
        CC: CC,
        comment: comment,
        fileDate: fileDate.lastModified,
        points: points,
      });
      toast.success(res.toString());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(`${error}`);
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
      <form className="flex justify-between w-full" onSubmit={sendReplay}>
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
              {replayData
                ? replayData.stage
                  ? replayData.stage
                  : "Not supported"
                : ""}
            </span>
          </p>
          <p>
            Slow rate:{" "}
            <span className="text-tsecond">{replayData?.slow_rate}</span>
          </p>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col items-end gap-y-1 text-sm h-full">
            <div className="flex flex-col items-end gap-y-1">
              <p>Achievement</p>
              <select
                name="CC"
                onChange={(e) => setCC(e.target.value)}
                value={CC}
                id="CC"
                className="outline-white/20 focus:outline-white transition-all outline-none border-none bg-primary py-0.5 px-1 rounded-full cursor-pointer"
              >
                {achievementList.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-end gap-y-1">
              <p>Comment</p>
              <textarea
                placeholder="e.g. need x patch to be play correctly"
                name="comment"
                maxLength={50}
                id="comment"
                className="outline-white/20 resize-none focus:outline-white transition-all outline-none border-none bg-primary py-0.5 px-1 rounded-md"
              />
            </div>
            <div className="flex flex-col h-full w-full text-center textba justify-center">
              <h3>
                You will get:{" "}
                <span className="font-semibold">
                  {replayData ? calculatePoints(replayData!, CC) : 0}{" "}
                </span>
                points
              </h3>
            </div>
          </div>
          <div className="flex items-end justify-end text-sm md:text-base gap-x-1">
            <ButtonInput
              type="button"
              onClick={checkExist}
              className="flex items-center whitespace-nowrap"
              variant={"outline"}
              disabled={isLoading || !replayFile || !replayData}
            >
              <ButtonLoader loading={isLoading} />
              Check exist
            </ButtonInput>
            <ButtonInput
              type="submit"
              className="flex items-center whitespace-nowrap"
              disabled={isLoading || !replayFile || !replayData}
            >
              <ButtonLoader loading={isLoading} />
              Send
            </ButtonInput>
          </div>
        </div>
      </form>
      <div className="flex flex-col gap-y-1 w-full">
        {replayData ? <ReplayChart scores={replayData.stage_score} /> : null}
      </div>
    </div>
  );
}

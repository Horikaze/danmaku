import { scoreWR } from "@/app/constants/wrScores";
import { Replay } from "@prisma/client";
import { ReplayInfo } from "../types/Replay";
import { getGameNumber } from "./utils";

export const rankValueRecord: { [key: string]: number } = {
  Easy: 1,
  Normal: 4,
  Hard: 4,
  Extra: 4,
  Lunatic: 7,
  Phantasm: 4,
};
export const CCValueRecord: { [key: string]: number } = {
  CC: 1,
  NM: 3,
  NB: 3,
  NMNB: 6,
  NNN: 8,
  NNNN: 10,
};

export const calculatePoints = (replayData: ReplayInfo, CC: string): number => {
  try {
    const CCValue = CCValueRecord[CC];
    const score = replayData.stage_score.at(-1)!;
    const game = getGameNumber(replayData.rpy_name);
    const rankValue = rankValueRecord[replayData.rank];
    const scoreValue = ((score / scoreWR[game][replayData.rank]) * 100).toFixed(
      2
    );
    const totalScore = Number(scoreValue) * rankValue * CCValue;

    return Number(totalScore.toFixed());
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const scoreParse = (replay: Replay) => {
  if (replay?.stage_score?.includes("+")) {
    const scoreParts = replay.stage_score.split("+");
    return scoreParts;
  }
  return [replay?.stage_score!];
};

import { format, fromUnixTime } from "date-fns";
import { ScoreObject, emptyScoreObject } from "../types/Replay";





export const emptyScoreObjectString = JSON.stringify(emptyScoreObject);
export const parseRankingString = (scoreString: string): ScoreObject => {
  return JSON.parse(scoreString);
};
export const stringifyRanking = (scoreObject: ScoreObject): string => {
  return JSON.stringify(scoreObject);
};

export const getCharacterFromData = (
  characters: string | string[],
  shotType: string
) => {
  if (!characters) {
    return "";
  }
  if (characters instanceof Array) {
    return characters[0].split(" vs ")[0].replace(/\s/g, "");
  }

  return `${characters} ${shotType}`;
};


export const getCharacterFromDataWithoutType = (
  characters: string | string[]
) => {
  if (!characters) {
    return "";
  }
  if (characters instanceof Array) {
    return characters[0].split(" vs ")[0].replace(/\s/g, "");
  }

  return characters;
};

export const getGameNumber = (replayName: string) => {
  const game = parseInt(replayName.split("_")[0].substring(2));
  return game;
};

export interface AchievementValuesType {
  CC: number;
  NM: number;
  NB: number;
  NMNB: number;
  NNN: number;
  NNNN: number;
  [key: string]: number; // General index signature
}

export const AchievementRank: AchievementValuesType = {
  CC: 1,
  NM: 2,
  NB: 3,
  NMNB: 4,
  NNN: 5,
  NNNN: 6,
};

export const getCCstring = (CCNumber: number) => {
  const CCString = Object.keys(AchievementRank).find(
    (key) => AchievementRank[key] === CCNumber
  );
  return CCString || "CC";
};

export const gameCodeRecord: Record<string, number> = {
  EOSD: 6,
  PCB: 7,
  IN: 8,
  POFV: 9,
  MOF: 10,
  SA: 11,
  UFO: 12,
  GFW: 128,
  TD: 13,
  DDC: 14,
  LOLK: 15,
  HSIFS: 16,
  WBAWC: 17,
  UM: 18,
};
export const getGameInt = (gameCode: string) => {
  return gameCodeRecord[gameCode] || 6;
};
export const getGameString = (gameNumber: number) => {
  const gameCode = Object.keys(gameCodeRecord).find(
    (key) => gameCodeRecord[key] === gameNumber
  );
  return gameCode || "EOSD";
};

export const getDateFromReplay = (uploadedDate: Date) => {
  const replayDateString = uploadedDate?.toString();
  const dateObject = new Date(replayDateString!);
  return format(dateObject, "dd-MM-yyyy");
};

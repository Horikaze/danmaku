import { type ClassValue, clsx } from "clsx";
import { format, fromUnixTime } from "date-fns";
import { twMerge } from "tailwind-merge";
import { emptyScoreObject } from "../types/Replay";
export const emptyScoreObjectString = JSON.stringify(emptyScoreObject);
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const convertUnixDate = (date: number) => {
  try {
    if (!date) {
      return "";
    }
    return format(fromUnixTime(date / 1000), "dd-MM-yyyy");
  } catch (error) {
    console.log(error);
  }
};
export const convertUnixDateHours = (date: number) => {
  try {
    if (!date) {
      return "";
    }
    return format(fromUnixTime(date / 1000), "HH:mm-dd-MM-yyyy");
  } catch (error) {
    console.log(error);
  }
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

export const getCCstring = (CCNumber: number) => {
  const AchievementRank = {
    CC: 1,
    NM: 2,
    NB: 3,
    NMNB: 4,
    NNN: 5,
    NNNN: 6,
  };
  const CCString = Object.keys(AchievementRank).find(
    //@ts-ignore
    (key) => AchievementRank[key] === CCNumber
  );
  return CCString || "CC";
};
export const getGameNumber = (replayName: string) => {
  try {
    const game = parseInt(replayName.split("_")[0].substring(2));
    return game;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const getCharacterFromData = (
  characters: string | string[],
  shotType: string,
  includeType: boolean = true
) => {
  if (!characters) {
    return "";
  }

  if (characters instanceof Array) {
    const characterWithoutSpaces = characters[0]
      .split(" vs ")[0]
      .replace(/\s/g, "");
    return includeType
      ? `${characterWithoutSpaces} ${shotType}`
      : characterWithoutSpaces;
  }

  return includeType ? `${characters} ${shotType}` : characters;
};

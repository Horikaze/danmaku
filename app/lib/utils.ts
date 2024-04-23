import { Prisma } from '@prisma/client';
import { clsx, type ClassValue } from "clsx";
import { format, fromUnixTime } from "date-fns";
import { twMerge } from "tailwind-merge";
import { emptyScoreObject, gameCodeRecord } from "../constants/games";

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
    return 6;
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

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<
  keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>;

export function prismaExclude<T extends Entity, K extends Keys<T>>(
  type: T,
  omit: K[],
) {
  type Key = Exclude<Keys<T>, K>;
  type TMap = Record<Key, true>;
  const result: TMap = {} as TMap;
  for (const key in Prisma[`${type}ScalarFieldEnum`]) {
    if (!omit.includes(key as K)) {
      result[key as Key] = true;
    }
  }
  return result;
}

export const inDevEnvironment = !!process && process.env.NODE_ENV === 'development';
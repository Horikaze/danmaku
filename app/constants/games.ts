import { ScoreObject } from "../types/Replay";

export const allGamesString = [
  "HRtP",
  "SoEW",
  "PoDD",
  "LLS",
  "MS",
  "EoSD",
  "PCB",
  "IN",
  "PoFV",
  "MoF",
  "SA",
  "UFO",
  "GFW",
  "TD",
  "DDC",
  "LoLK",
  "HSiFS",
  "WBaWC",
  "UM",
  "UDoALG",
];
export const games618 = [
  "EOSD",
  "PCB",
  "IN",
  "POFV",
  "MOF",
  "SA",
  "UFO",
  "GFW",
  "TD",
  "DDC",
  "LOLK",
  "HSIFS",
  "WBAWC",
  "UM",
];

export const achievementList = ["CC", "NM", "NB", "NMNB", "NNN", "NNNN"];

export const achievementRankValues: Record<string, number> = {
  CC: 1,
  NM: 2,
  NB: 3,
  NMNB: 4,
  NNN: 5,
  NNNN: 6,
};

export const touhouDifficulty = [
  "Easy",
  "Normal",
  "Hard",
  "Lunatic",
  "Extra",
  "Phantasm",
];
export const difficultyLevelsTable = [
  "EASY",
  "NORMAL",
  "HARD",
  "LUNATIC",
  "EXTRA",
];
export const shotTypeList = ["A", "B", "C", "Wolf", "Otter", "Eagle"];

export const emptyScoreObject: ScoreObject = {
  EASY: { score: 0, id: "", CC: 0, char: "" },
  NORMAL: { score: 0, id: "", CC: 0, char: "" },
  HARD: { score: 0, id: "", CC: 0, char: "" },
  LUNATIC: { score: 0, id: "", CC: 0, char: "" },
  EXTRA: { score: 0, id: "", CC: 0, char: "" },
  PHANTASM: { score: 0, id: "", CC: 0, char: "" },
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

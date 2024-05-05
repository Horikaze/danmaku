import { Replay } from "@prisma/client";
export type ReplayInfo = {
  character: string | string[];
  date: string;
  frame_count: number;
  player: string;
  rank: string;
  rpy_name: string;
  shottype: string;
  slow_rate: number;
  stage: string;
  stage_score: number[];
  shift: number;
  x_keys: number;
  z_keys: number;
  c_keys: number;
};

export type ReplayFormData = {
  CC?: string;
  comment?: string;
  character?: string;
  date?: string;
  player?: string;
  rank?: string;
  selectReplay?: File;
  slowRate?: string;
  type?: string;
  stage?: string;
  score?: string;
  fileDate?: string;
  videoLink?: string;
};
export type ScoreObject = {
  EASY: { score: number; id: string; CC: number; char: string };
  NORMAL: { score: number; id: string; CC: number; char: string };
  HARD: { score: number; id: string; CC: number; char: string };
  LUNATIC: { score: number; id: string; CC: number; char: string };
  EXTRA: { score: number; id: string; CC: number; char: string };
  PHANTASM: { score: number; id: string; CC: number; char: string };
  [key: string]: { score: number; id: string; CC: number; char: string };
};

export type replayList = {
  replayId: string;
  nickname: string;
  character: string;
  game: number;
  shottype: string | null;
  rank: string;
  achievement: number;
  score: number;
  uploadedDate: Date;
  status: boolean;
};

export type searchParamsPropsReplay = {
  tab: string;
};

export type RankingUser = {
  id: string;
  imageUrl?: string;
  nickname: string;
  value: number;
};

// @ts-nocheck
"use client";
import { useState } from "react";
import { InputText } from "../mainComponents/InputText";
import { gameCodeRecord, games618, touhouDifficulty } from "../constants/games";
import { calculatePoints } from "../lib/calculatePoints";
import { scoreWR } from "../constants/wrScores";

export default function Search() {
  const [selectedGame, setSelectedGame] = useState(6);
  const [selectedScore, setSelectedScore] = useState("0");
  const [selectedRank, setSelectedRank] = useState("Easy");
  const [selectedAchiv, setSelectedAchiv] = useState("CC");

  const [rankValueRecord, setRankValueRecord] = useState({
    Easy: 1,
    Normal: 4,
    Hard: 4,
    Extra: 4,
    Lunatic: 7,
    Phantasm: 4,
  });

  const [CCValueRecord, setCCValueRecord] = useState({
    CC: 1,
    NM: 7,
    NB: 7,
    NMNB: 14,
    NNN: 28,
    NNNN: 36,
  });

  const calculatePoints = (): number => {
    try {
      //@ts-ignore
      const rankValue = rankValueRecord[selectedRank];
      const scoreValue = (
        (Number(selectedScore) / scoreWR[selectedGame][selectedRank]) *
        100
      ).toFixed(2);
      console.log(Number(selectedScore));
      const totalScore =
        //@ts-ignore
        Number(scoreValue) * rankValue * CCValueRecord[selectedAchiv];

      return Number(totalScore.toFixed());
    } catch (error) {
      console.log(error);
      return 0;
    }
  };
  const points = calculatePoints() || 0;

  return (
    <div className="flex flex-col bg-primary w-full h-full p-3 rounded-md drop-shadow-md overflow-x-scroll gap-y-4">
      <div className="flex gap-x-4">
        <div className="grid w-full gap-1.5">
          <p>Game</p>
          <select
            value={selectedGame}
            onChange={(e) => {
              setSelectedGame(Number(e.target.value));
            }}
            className="outline-white/20 focus:outline-white transition-all outline-none border-none bg-primary py-1 px-4 rounded-md cursor-pointer"
          >
            {Object.values(gameCodeRecord).map((game) => (
              <option key={game + "select"} value={game}>
                {game}
              </option>
            ))}
          </select>
        </div>
        <div className="grid w-full gap-1.5">
          <p>Score</p>
          <InputText
            value={selectedScore}
            onChange={(e) => {
              if (isNaN(Number(e.target.value.trim()))) {
                return;
              }
              setSelectedScore(e.target.value.trim());
            }}
            type="text"
            placeholder="Score"
            name="score"
          />
        </div>
        <div className="grid w-full gap-1.5">
          <p>Rank</p>
          <select
            value={selectedRank}
            onChange={(e) => {
              setSelectedRank(e.target.value);
            }}
            className="outline-white/20 focus:outline-white transition-all outline-none border-none bg-primary py-1 px-4 rounded-md cursor-pointer"
          >
            {touhouDifficulty.map((diff) => (
              <option key={diff + "select"} value={diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>
        <div className="grid w-full gap-1.5">
          <p>Achiv</p>
          <select
            value={selectedAchiv}
            onChange={(e) => {
              setSelectedAchiv(e.target.value);
            }}
            className="outline-white/20 focus:outline-white transition-all outline-none border-none bg-primary py-1 px-4 rounded-md cursor-pointer"
          >
            {Object.keys(CCValueRecord).map((achiv) => (
              <option key={achiv + "select"} value={achiv}>
                {achiv}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col items-end gap-y-3">
        <div className="w-[500px] flex gap-x-3 text-sm justify-end">
          <div className="flex flex-col justify-center text-base items-center">
            <p>Score value =</p>
          </div>
          <div className="flex flex-col items-center">
            <p>Score</p>
            <p>{Number(selectedScore).toLocaleString()}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-2xl">/</p>
          </div>
          <div className="flex flex-col items-center">
            <p>Wr score</p>
            <p>{scoreWR[selectedGame][selectedRank].toLocaleString()}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-2xl">*</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>Fixed *</p>
            <p>100</p>
          </div>
        </div>
        <div className="w-[500px] flex gap-x-3 text-sm justify-end">
          <div className="flex flex-col justify-center text-base items-center">
            <p>Total points =</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>Score value</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-2xl">*</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>Rank value</p>
            <p>{rankValueRecord[selectedRank]}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-2xl">*</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>CC value value</p>
            <p>{CCValueRecord[selectedAchiv]}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-x-4 justify-between">
        <div className="flex flex-col gap-y-2">
          <p className="text-center text-xl">Rank</p>
          {Object.keys(rankValueRecord).map((r) => (
            <div key={r + "change"} className="grid w-full gap-1.5">
              <p>{r}</p>
              <InputText
                //@ts-ignore
                value={rankValueRecord[r]}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value.trim()))) {
                    return;
                  }
                  setRankValueRecord((prevState) => ({
                    ...prevState,
                    [r]: e.target.value.trim(),
                  }));
                }}
                type="text"
                name="score"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-center text-xl">CC</p>
          {Object.keys(CCValueRecord).map((r) => (
            <div key={r + "change"} className="grid w-full gap-1.5">
              <p>{r}</p>
              <InputText
                //@ts-ignore
                value={CCValueRecord[r]}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value.trim()))) {
                    return;
                  }
                  setCCValueRecord((prevState) => ({
                    ...prevState,
                    [r]: e.target.value.trim(),
                  }));
                }}
                type="text"
                name="score"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

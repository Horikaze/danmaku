"use client";

import { useState } from "react";
import { achievementList, touhouDifficulty } from "../constants/games";
import { scoreWR } from "../constants/wrScores";
import { InputText } from "../mainComponents/InputText";

interface RankValueRecord {
  [key: string]: number;
}

interface CCValueRecord {
  [key: string]: number;
}

export default function Search() {
  const [selectedGame, setSelectedGame] = useState(6);
  const [selectedScore, setSelectedScore] = useState(0);
  const [selectedRank, setSelectedRank] = useState("All");
  const [selectedAchiv, setSelectedAchiv] = useState("All");
  const [points, setPoints] = useState(0);

  const [rankValueRecord, setRankValueRecord] = useState<RankValueRecord>({
    Easy: 1,
    Normal: 4,
    Hard: 4,
    Extra: 4,
    Lunatic: 7,
    Phantasm: 4,
  });

  const [CCValueRecord, setCCValueRecord] = useState<CCValueRecord>({
    CC: 1,
    NM: 7,
    NB: 7,
    NMNB: 14,
    NNN: 28,
    NNNN: 36,
  });
  const updateRankValue = (key: string, value: number) => {
    setRankValueRecord((prevRankValueRecord) => ({
      ...prevRankValueRecord,
      [key]: value,
    }));
  };

  const updateCCValue = (key: string, value: number) => {
    setCCValueRecord((prevCCValueRecord) => ({
      ...prevCCValueRecord,
      [key]: value,
    }));
  };

  const handleRankInputTextChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputTextElement>) => {
      const value = parseInt(event.target.value, 10) || 0; // Parse InputText value as an integer
      updateRankValue(key, value);
    };

  const handleCCInputTextChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputTextElement>) => {
      const value = parseInt(event.target.value, 10) || 0; // Parse InputText value as an integer
      updateCCValue(key, value);
    };

  const calculatePoints = () => {
    try {
      const CCValue = CCValueRecord[selectedAchiv!];
      const rankValue = rankValueRecord[selectedRank!];
      const scoreValue = (
        (selectedScore / scoreWR[selectedGame][selectedRank]) *
        100
      ).toFixed(2);
      const totalScore = Number(scoreValue) * rankValue * CCValue;

      return totalScore.toFixed();
    } catch (error) {
      console.log(error);
      return "0";
    }
  };

  return (
    <div className="flex flex-col gap-y-5">
      <div>
        <div>
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="game">Game</label>
              <select
                name="game"
                onChange={(e) => {
                  setSelectedGame(Number(e.target.value));
                }}
                value={selectedGame.toString()}
                defaultValue="1"
              >
                {[6, 7, 8, 9, 10, 11, 12, 12.8, 13, 14, 15, 16, 17, 18].map(
                  (game) => (
                    <option key={game} value={game.toString()}>
                      {game}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="score">Score</label>
              <div className="gap-x-1 flex">
                <InputText
                  name="score"
                  type="number"
                  id="score"
                  onChange={(e) => setSelectedScore(Number(e.target.value))}
                  value={selectedScore.toString()}
                />
              </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="rank">Rank</label>
              <select
                name="rank"
                value={selectedRank}
                onChange={(e) => setSelectedRank(e.target.value)}
              >
                {touhouDifficulty.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="achievement">Achievement</label>
              <select
                name="achievement"
                value={selectedAchiv}
                onChange={(e) => setSelectedAchiv(e.target.value)}
              >
                {achievementList.map((achiv) => (
                  <option key={achiv} value={achiv}>
                    {achiv}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full py-4 flex justify-between">
            <div>
              <p>Points: {calculatePoints()}</p>
            </div>
            <div className="flex flex-col">
              <div className="flex relative text-xs">
                <p className="absolute left-0">your score</p>
                <p className="absolute left-28"> WR score</p>
                <p className="absolute right-11">rank</p>
                <p className="absolute right-0">achiv</p>-
              </div>
              <p>
                ({selectedScore} / {scoreWR[selectedGame][selectedRank]} * 100)
                * <span className="px-2">{rankValueRecord[selectedRank!]}</span>{" "}
                * <span className="px-2"> {CCValueRecord[selectedAchiv!]}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="flex flex-col md:flex-row justify-between gap-y-1.5">
            <div>
              <h2 className="text-center font-bold">Rank Value</h2>
              <ul>
                {Object.entries(rankValueRecord).map(([key, value]) => (
                  <li key={key}>
                    {key}:
                    <InputText
                      type="number"
                      value={value}
                      onChange={handleRankInputTextChange(key)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-center font-bold">CC Value</h2>
              <ul>
                {Object.entries(CCValueRecord).map(([key, value]) => (
                  <li key={key}>
                    {key}:
                    <InputText
                      type="number"
                      value={value}
                      onChange={handleCCInputTextChange(key)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

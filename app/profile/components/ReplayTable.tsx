import {
  achievementList,
  achievementRankValues,
  difficultyLevelsTable,
  games618,
} from "@/app/constants/games";
import prisma from "@/app/lib/prismadb";
import { ScoreObject } from "@/app/types/Replay";
import Link from "next/link";
type ReplayTableProps = {
  userId: string;
};
export default async function ReplayTable({ userId }: ReplayTableProps) {
  const tableData = await prisma.ranking.findFirst({
    where: {
      userIdRankingPoints: userId,
    },
  });
  if (!tableData) return null;
  let forrmatedObject: Record<string, ScoreObject> = {};
  Object.keys(tableData).forEach((key) => {
    if (key === "userIdRankingPoints") {
      return;
    }
    // @ts-ignore known values
    const rankingData = JSON.parse(tableData[key]);
    forrmatedObject[key] = rankingData as ScoreObject;
  });

  const cellColor = (achievement: number) => {
    switch (achievement) {
      case 1:
        return "";
      case 2:
        return "bg-[#bb8888]";
      case 3:
        return "bg-[#0000ff]";
      case 4:
        return "bg-[#ff0099]";
      case 5:
        return "bg-[#ff2f00]";
      case 6:
        return "bg-[#ffbb00]";
      default:
        return "";
    }
  };

  return (
    <div className="overflow-auto grow whitespace-nowrap">
      <table className="text-sm md:text-base w-full">
        <thead>
          <tr>
            <th className="border">Game</th>
            {difficultyLevelsTable.map((e) => (
              <th className="border" key={e}>
                {e}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {games618.map((game) => (
            <tr className="border" key={game}>
              <td className="border">{game}</td>
              {difficultyLevelsTable.map((diff) => {
                if (game === "PCB" && diff === "EXTRA") {
                  return (
                    <td
                      key={diff}
                      className={`text-xs flex md:min-h-7 min-h-6`}
                    >
                      <Link
                        href={`/replay/${forrmatedObject[game][diff].id}`}
                        prefetch={false}
                        className={`text-center flex items-center justify-center w-1/2 hover:opacity-60 transition-opacity ${cellColor(
                          forrmatedObject[game][diff].CC
                        )}`}
                      >
                        E: {forrmatedObject[game][diff].char}
                      </Link>
                      <Link
                        href={`/replay/${forrmatedObject[game]["PHANTASM"].id}`}
                        prefetch={false}
                        className={`text-center flex items-center justify-center w-1/2 hover:opacity-60 transition-opacity ${cellColor(
                          forrmatedObject[game]["PHANTASM"].CC
                        )}`}
                      >
                        P: {forrmatedObject[game]["PHANTASM"].char}
                      </Link>
                    </td>
                  );
                }
                return (
                  <td
                    key={diff}
                    className={`${cellColor(
                      forrmatedObject[game][diff].CC
                    )} border hover:opacity-60 transition-opacity`}
                  >
                    <Link
                      href={`/replay/${forrmatedObject[game][diff].id}`}
                      prefetch={false}
                      className="text-center w-full h-full block"
                    >
                      {forrmatedObject[game][diff].char}
                    </Link>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-x-1 justify-end mt-2">
        {Object.keys(achievementRankValues).map((e) => (
          <div
            key={e}
            className={`h-6 w-12 border flex items-center justify-center text-xs font-semibold ${cellColor(
              achievementRankValues[e]
            )}`}
          >
            <p>{e}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

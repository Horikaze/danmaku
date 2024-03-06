import prisma from "@/app/lib/prismadb";
import { ScoreObject } from "@/app/types/Replay";
type ReplayTableProps = {
  userId: string;
};
const games = [
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
const difficultyLevels = ["EASY", "NORMAL", "HARD", "LUNATIC", "EXTRA"];
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
  return (
    <div className="overflow-auto grow">
      <table className="text-sm md:text-base w-full">
      <thead>
        <tr>
          <th className="border">Game</th>
          {difficultyLevels.map((e) => (
            <th className="border" key={e}>
              {e}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {games.map((game) => (
          <tr className="border" key={game}>
            <td className="border">{game}</td>
            {difficultyLevels.map((diff) => {
              return (
                <td key={diff} className="border">
                  {forrmatedObject[game][diff].score}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

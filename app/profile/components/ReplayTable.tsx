import { difficultyLevelsTable, games618 } from "@/app/constants/games";
import prisma from "@/app/lib/prismadb";
import { ScoreObject } from "@/app/types/Replay";
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
  return (
    <div className="overflow-auto grow">
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

import { games618, touhouDifficulty } from "@/app/constants/games";
import { scoreWR } from "../constants/wrScores";
import Link from "next/link";
import { getGameInt } from "@/app/lib/utils";

export default function WrTable() {
  return (
    <div className="flex flex-col gap-y-2 overflow-x-scroll">
      <table className="border text-xs md:text-base whitespace-nowrap">
        <thead>
          <tr>
            <th className="border">Game </th>
            {touhouDifficulty.map((diff) => {
              if (diff === "Phantasm") return null;
              return (
                <th className="border text-center font-semibold" key={diff}>
                  {diff}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {games618.map((game) => (
            <tr key={game}>
              <td className="border">{game}</td>
              {touhouDifficulty.map((diff) => {
                if (diff === "Phantasm") return null;
                if (diff === "Extra" && game === "PCB") {
                  return (
                    <td
                      key={diff}
                      className="border text-xs flex flex-col px-1"
                    >
                      E:{" "}
                      {(scoreWR[getGameInt(game)][diff] || "").toLocaleString()}
                      <p>
                        {" "}
                        P: {(scoreWR[7]["Phantasm"] || "").toLocaleString()}
                      </p>
                    </td>
                  );
                }
                return (
                  <td key={diff} className="border px-1">
                    {(scoreWR[getGameInt(game)][diff] || "").toLocaleString()}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col">
        <Link
          href="https://maribelhearn.com/wr"
          target="_blank"
          className="self-end text-sm underline"
        >
          Source: https://maribelhearn.com/wr
        </Link>
        <p className="text-end text-sm">Date: 20.07.2023</p>
      </div>
    </div>
  );
}

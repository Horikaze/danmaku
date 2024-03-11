import prisma from "@/app/lib/prismadb";
import { achievementRankValues } from "../constants/games";
import { getGameInt } from "../lib/utils";
import ReplaysList from "../mainComponents/ReplaysList";
import SearchBar from "./SearchBar";
import { replayWithNickname } from "../types/Replay";
export default async function Search({ searchParams }: { searchParams: any }) {
  const getReplays = async () => {
    try {
      const {
        player,
        game,
        scoreFrom,
        scoreTo,
        pointsFrom,
        pointsTo,
        rank,
        achievement,
        shottype,
        character,
        userId,
      } = searchParams;
      const achivInt = achievementRankValues[achievement!];
      let whereClause: Record<string, any> = {};
      console.log(player);
      if (player !== undefined && player !== "") {
        whereClause.player = {
          contains: player,
        };
      }

      if (game !== undefined && game !== "All") {
        whereClause.game = getGameInt(game);
      }
      if (scoreFrom !== undefined && scoreFrom !== "") {
        whereClause.score = {
          ...whereClause.score,
          gte: Number((scoreFrom as string).replace(/\s/g, "")),
        };
      }
      console.log(scoreTo);
      if (scoreTo !== undefined && scoreTo !== "") {
        whereClause.score = {
          ...whereClause.score,
          lte: Number((scoreTo as string).replace(/\s/g, "")),
        };
      }
      if (pointsFrom !== undefined && pointsFrom !== "") {
        whereClause.points = {
          ...whereClause.points,
          gte: Number(pointsFrom),
        };
      }

      if (pointsTo !== undefined && pointsTo !== "") {
        whereClause.points = {
          ...whereClause.points,
          lte: Number(pointsTo),
        };
      }

      if (rank !== undefined && rank !== "All") {
        whereClause.rank = rank;
      }
      if (
        achivInt !== 0 &&
        achievement !== "All" &&
        achievement !== undefined
      ) {
        whereClause.achievement = achivInt;
      }

      if (shottype !== undefined && shottype !== "All") {
        whereClause.shottype = shottype;
      }
      if (character !== undefined && character !== "") {
        whereClause.character = {
          contains: character,
        };
      }

      if (userId !== undefined && userId !== "") {
        whereClause.userId = (userId as string).replace(/\s/g, "");
      }
      console.log(whereClause);
      const isEmpty = Object.keys(whereClause).length <= 0 ? true : false;
      const replays = (await prisma.replay.findMany({
        where: whereClause,
        include: {
          Profile: {
            select: {
              nickname: true,
            },
          },
        },
        orderBy: {
          uploadedDate: "desc",
        },
        take: isEmpty ? 10 : 50,
      })) as replayWithNickname[];
      return replays;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const replays = await getReplays();
  return (
    <div className="flex flex-col">
      <SearchBar />
      {replays && replays.length > 0 ? (
        <ReplaysList replays={replays} />
      ) : (
        <div className="flex text-2xl text-tsecond text-center font-semibold items-center justify-center h-32">
          <h3>No results</h3>
        </div>
      )}
    </div>
  );
}

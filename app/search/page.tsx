import prisma from "@/app/lib/prismadb";
import { achievementRankValues } from "../constants/games";
import { getGameInt } from "../lib/utils";
import ReplaysList from "../mainComponents/ReplaysList";
import SearchBar from "./SearchBar";
import { replayWithNickname } from "../types/Replay";
export default async function Search({ searchParams }: { searchParams: any }) {
  const generateQuery = () => {
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

      if (player !== "") {
        whereClause.player = {
          contains: player,
        };
      }

      if (game !== "" && game !== "All") {
        whereClause.game = getGameInt(game);
      }

      if (scoreFrom !== "") {
        whereClause.score = {
          ...whereClause.score,
          gte: Number(scoreFrom),
        };
      }

      if (scoreTo !== "") {
        whereClause.score = {
          ...whereClause.score,
          lte: Number(scoreTo),
        };
      }
      if (pointsFrom !== "") {
        whereClause.points = {
          ...whereClause.points,
          gte: Number(pointsFrom),
        };
      }

      if (pointsTo !== "") {
        whereClause.points = {
          ...whereClause.points,
          lte: Number(pointsTo),
        };
      }

      if (rank !== "" && rank !== "All") {
        whereClause.rank = rank;
      }
      if (achivInt !== 0 && achievement !== "All") {
        whereClause.achievement = achivInt;
      }

      if (shottype !== "" && shottype !== "All") {
        whereClause.shottype = shottype;
      }
      if (character !== "") {
        whereClause.character = {
          contains: character,
        };
      }

      if (userId !== "") {
        whereClause.userId = userId;
      }

      return whereClause;
    } catch (error) {
      console.log(error);
      return {};
    }
  };
  const whereClause = generateQuery();
  const replays = (await prisma.replay.findMany({
    where: whereClause,
    include: {
      Profile: {
        select: {
          nickname: true,
        },
      },
    },
  })) as replayWithNickname[];
  return (
    <div className="flex flex-col">
      <SearchBar />
      <ReplaysList replays={replays} />
    </div>
  );
}

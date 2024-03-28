import prisma from "@/app/lib/prismadb";
import EventWindow from "./components/EventWindow";
import Ranking from "./components/Ranking";
export default async function Home() {
  const rankingPoints = await prisma.profile.findMany({
    orderBy: {
      points: "desc",
    },
    select: {
      points: true,
      nickname: true,
      imageUrl: true,
      id: true,
    },
  });
  const rankingCC = await prisma.profile.findMany({
    orderBy: {
      CCCount: "desc",
    },
    select: {
      CCCount: true,
      nickname: true,
      imageUrl: true,
      id: true,
    },
  });
  const rankingEvent = await prisma.profile.findMany({
    orderBy: {
      event: "desc",
    },
    select: {
      event: true,
      nickname: true,
      imageUrl: true,
      id: true,
    },
  });
  const forrmatedCC = rankingCC.map((e) => ({
    value: e.CCCount!,
    id: e.id!,
    nickname: e.nickname!,
    imageUrl: e.imageUrl!,
  }));
  const forrmatedPoints = rankingPoints.map((e) => ({
    value: e.points!,
    id: e.id!,
    nickname: e.nickname!,
    imageUrl: e.imageUrl!,
  }));
  const forrmatedEvent = rankingEvent.map((e) => ({
    value: e.event!,
    id: e.id!,
    nickname: e.nickname!,
    imageUrl: e.imageUrl!,
  }));
  return (
    <div className="flex-col flex gap-y-3">
      <div className="flex lg:flex-row flex-col justify-center gap-3">
        <div className="lg:grow bg-primary shadow-md text-center min-h-48">
          other
        </div>
        <EventWindow />
      </div>
      <h2 className="text-center text-3xl font-semibold">Ranking</h2>
      <Ranking
        rankingCC={forrmatedCC || []}
        rankingEvent={forrmatedEvent || []}
        rankingPoints={forrmatedPoints || []}
      />
    </div>
  );
}

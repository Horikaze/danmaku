import prisma from "@/app/lib/prismadb";
import Ranking from "./components/Ranking";
export default async function Home() {
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
  const forrmatedCC = rankingCC.map((e) => ({
    value: e.CCCount!,
    id: e.id!,
    nickname: e.nickname!,
    imageUrl: e.imageUrl!,
  }));

  return (
    <div className="flex-col flex gap-y-3">
      <h2 className="text-center text-3xl font-semibold">Ranking</h2>
      <Ranking rankingCC={forrmatedCC || []} />
    </div>
  );
}

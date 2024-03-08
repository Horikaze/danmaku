import prisma from "@/app/lib/prismadb";
import ReplaysTable from "./ReplaysTable";
export default async function Search() {
  const replays = await prisma.replay.findMany({});
  return (
    <div className="flex w-full jc items-center">
      <ReplaysTable replays={replays}/>
    </div>
  );
}

import { searchParamsPropsReplay } from "../types/Replay";
import Ranking from "./components/Ranking";

export default async function Home({
  searchParams,
}: {
  searchParams: searchParamsPropsReplay;
}) {
  return (
    <div className="flex-col flex gap-y-3">
      {/* <h2 className="text-center text-3xl font-semibold">Ranking</h2> */}
      <Ranking />
    </div>
  );
}

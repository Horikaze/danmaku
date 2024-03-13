import { Suspense } from "react";
import SearchBar from "./SearchBar";
import Loading from "./loading";
import SearchRes from "./SearchRes";

export default async function Search({ searchParams }: { searchParams: any }) {
  return (
    <div className="flex flex-col gap-y-3">
      <SearchBar />
      <Suspense key={JSON.stringify(searchParams)} fallback={<Loading />}>
        <SearchRes searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

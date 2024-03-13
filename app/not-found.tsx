import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex text-2xl flex-col text-tsecond text-center font-semibold items-center gap-y-2 justify-center h-32">
      <h3>Not found :&lt;</h3>
      <Link className="text-xl underline" href={"/"}>
        Back home
      </Link>
    </div>
  );
}

"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="size-full flex flex-col gap-y-2 justify-center items-center text-3xl font-semibold">
          <h2>Something went wrong!</h2>
          <Link className="underline" href={"/"}>
            Try going back to the homepage.
          </Link>
          <span>or</span>
          <button className="underline" onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";

export default function page() {
  return (
    // <html>
    //   <body>
    <div className="size-full flex flex-col gap-y-2 justify-center items-center text-3xl font-semibold">
      <h2>Something went wrong!</h2>
      <Link className="underline" href={"/"}>
        Try going back to the homepage.
      </Link>
    </div>
    /* </body>
    </html> */
  );
}

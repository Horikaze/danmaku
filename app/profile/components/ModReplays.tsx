"use client";
import { Replay } from "@prisma/client";

export default function ModReplays({ replays }: { replays: Replay[] | null }) {
  console.log(replays);
  return <div>ModReplays</div>;
}

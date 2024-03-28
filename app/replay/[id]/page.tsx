import prisma from "@/app/lib/prismadb";
import {
  convertUnixDateHours,
  getCharacterFromData,
  getGameNumber,
  getGameString,
} from "@/app/lib/utils";
import BackButton from "@/app/mainComponents/BackButton";
import Copy from "@/app/mainComponents/Copy";
import { Divider } from "@/app/mainComponents/Divider";
import ReplayChart from "@/app/mainComponents/ReplayChart";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const replay = await prisma.replay.findFirst({
    where: {
      replayId: params.id,
    },
    include: {
      Profile: {
        select: {
          nickname: true,
          id: true,
        },
      },
    },
  });
  return {
    title:
      `${getGameString(replay?.game!)} ${replay?.rank} ${getCharacterFromData(
        replay?.character!,
        replay?.shottype!,
        true
      )}` || ":>",
  };
}

export default async function Replay({ params }: { params: { id: string } }) {
  const replay = await prisma.replay.findFirst({
    where: {
      replayId: params.id,
    },
    include: {
      Profile: {
        select: {
          nickname: true,
          id: true,
        },
      },
    },
  });
  if (!replay) {
    return notFound();
  }
  const replayScores = replay?.stage_score.split("+").map((e) => {
    return Number(e);
  });

  return (
    <div className="bg-primary w-full h-full p-3 rounded-md drop-shadow-md overflow-y-scroll pb-20">
      <div className="flex flex-col gap-y-2">
        <div className="flex relative justify-between items-center">
          <h2 className="text-xl font-semibold absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-tsecond text-center">
            {replay?.rpy_name}
          </h2>
          <BackButton />
          <div className="text-sm text-tsecond flex items-center gap-x-1 hover:brightness-125 cursor-pointer">
            <Copy text={"id"} />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col font-semibold w-full space-y-1 items-start relative">
          <p>
            Game:{" "}
            <span className="text-tsecond">
              {replay ? `Touhou: ${getGameNumber(replay?.rpy_name!)}` : ""}
            </span>
          </p>
          <p>
            Player: <span className="text-tsecond">{replay?.player}</span>
          </p>
          <p>
            Character:{" "}
            <span className="text-tsecond">
              {getCharacterFromData(replay?.character!, replay?.shottype!) ||
                ""}
            </span>
          </p>
          <p>
            Rank: <span className="text-tsecond">{replay?.rank}</span>
          </p>
          <p>
            Score:{" "}
            <span className="text-tsecond">
              {replay?.score.toLocaleString()}
            </span>
          </p>
          <p>
            Points: <span className="text-tsecond">{replay?.points}</span>
          </p>
          <p>
            Stage:{" "}
            <span className="text-tsecond">
              {replay ? (replay.stage ? replay.stage : "Not supported") : ""}
            </span>
          </p>
          <p>
            Slow rate: <span className="text-tsecond">{replay?.slowRate}</span>
          </p>
          <p>
            Date sent:{" "}
            <span className="text-tsecond">
              {convertUnixDateHours(replay?.uploadedDate as any)}
            </span>
          </p>
          <p>
            File date:{" "}
            <span className="text-tsecond">
              {convertUnixDateHours(replay?.fileDate as any)}
            </span>
          </p>
          <p>
            Verified:{" "}
            <span className="text-tsecond">{replay?.status.toString()}</span>
          </p>
          <Link
            href={`/profile/${replay?.Profile?.id}`}
            prefetch={false}
            className="underline"
          >
            Sended by:{" "}
            <span className="text-tsecond">{replay?.Profile?.nickname}</span>
          </Link>
          <Link
            href={replay?.filePath!}
            download
            prefetch={false}
            className="underline"
          >
            Download .rpy
          </Link>
          <div className="absolute right-0 bottom-0 text-xs opacity-60 text-tsecond">
            {replay?.comment ? <p>{replay?.comment || ""}</p> : null}
            {replay?.acceptedBy ? (
              <p> Verified by: {replay?.acceptedBy || ""}</p>
            ) : null}
          </div>
        </div>
        <ReplayChart scores={replayScores || []} />
      </div>
    </div>
  );
}

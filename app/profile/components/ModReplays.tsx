"use client";
import ReplaysList from "@/app/mainComponents/ReplaysList";
import { replayWithNickname } from "@/app/types/Replay";
import { verifyReplay } from "../actions/replayActions";
import toast from "react-hot-toast";
import { ButtonInput } from "@/app/mainComponents/InputButton";
import { InputText } from "@/app/mainComponents/InputText";
import { useState } from "react";

export default function ModReplays({
  initialReplays,
}: {
  initialReplays: replayWithNickname[] | null;
}) {
  const [replays, setReplays] = useState(initialReplays || null);
  const sendToVer = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const replayId = formData.get("replayId") as string;
      const res = await verifyReplay({ replayId });
      toast.success(`${res}`);
      setReplays((prev) => prev!.filter((e) => e.replayId !== replayId));
    } catch (error) {
      console.log(error);
      toast.error(`${error}`);
    }
  };

  if (!replays) {
    return (
      <div className="flex text-2xl text-tsecond text-center font-semibold items-center justify-center h-32">
        <h3>No results</h3>
      </div>
    );
  }

  console.log(replays);
  return (
    <div className="flex w-full flex-col gap-y-3">
      <h2 className="text-center text-2xl">Verify replays</h2>
      <ReplaysList replays={replays} />
      <form className="flex flex-col items-end gap-y-4" onSubmit={sendToVer}>
        <InputText
          name="replayId"
          id="replayId"
          type="text"
          placeholder="replayId"
        />
        <ButtonInput type="submit">Verify</ButtonInput>
      </form>
    </div>
  );
}

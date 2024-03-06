"use client";

import { allGamesString } from "@/app/constants/games";
import { ButtonInput } from "@/app/mainComponents/InputButton";
import { InputText } from "@/app/mainComponents/InputText";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { changeUserAction } from "../actions/profileActions";

export default function Settings() {
  const { data: session, update } = useSession();
  return (
    <form
      action={async (e) => {
        const { status, nickname } = await changeUserAction(e);
        if (status === "Success") {
          if (nickname?.length! >= 3) {
            update({ name: nickname });
          }
          return;
        }
        toast.error(`${status}`);
        console.log(e);
      }}
      className="flex flex-col items-center w-full"
    >
      <div className="w-full justify-between gap-y-4 flex flex-col">
        <div className="grid w-full gap-1.5">
          <p>Nickname</p>
          <InputText type="text" placeholder="Nickname" name="nickname" />
        </div>
        <div className="grid w-full gap-1.5">
          <p>Password</p>
          <InputText type="text" placeholder="Password" name="password" />
        </div>
        <div className="grid w-full gap-1.5">
          <p>Discord</p>
          <InputText type="text" placeholder="Discord" name="discord" />
        </div>
        <div className="grid w-full gap-1.5">
          <p>Favorite game</p>
          <select
            defaultValue={"EoSD"}
            name="game"
            id="game"
            className="outline-white/20 focus:outline-white transition-all outline-none border-none bg-primary py-1.5 px-4 rounded-full"
          >
            {allGamesString.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div className="grid w-full gap-1.5">
          <p>Bio</p>
          <textarea
            placeholder="Write something about yourself..."
            name="bio"
            maxLength={250}
            className="outline-white/20 focus:outline-white transition-all outline-none border-none resize-none bg-primary py-1.5 px-4 rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <ButtonInput variant={"outline"} type="reset">
            Clear
          </ButtonInput>
          <ButtonInput>Save</ButtonInput>
        </div>
      </div>
    </form>
  );
}

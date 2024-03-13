import {
  achievementRankValues,
  games618,
  shotTypeList,
  touhouDifficulty,
} from "../constants/games";
import { ButtonInput } from "../mainComponents/InputButton";
import { InputText } from "../mainComponents/InputText";
import { searchReaplys } from "./searchActions";

export default function SearchBar() {
  return (
    <form
      action={searchReaplys}
      className="flex flex-col gap-y-3 bg-primary drop-shadow-md p-3 rounded-md text-sm md:text-base"
    >
      <div className="flex items-center flex-col md:flex-row justify-center gap-3">
        <div className="flex flex-col w-full ">
          <div className="flex flex-col gap-y-3">
            <div className="flex gap-x-3">
              <div className="grid gap-1.5 w-full">
                <p>Player</p>
                <InputText
                  type="text"
                  placeholder="Player(on .rpy)"
                  name="player"
                  className="w-full"
                />
              </div>
              <div className="grid gap-1.5 w-full">
                <p>Game</p>
                <select
                  name="game"
                  className="w-full  outline-white/20 focus:outline-white transition-all outline-none border-none bg-primary py-1 px-4 rounded-md"
                >
                  <option value={"All"}>All</option>
                  {games618.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-x-3">
              <div className="flex flex-col gap-1.5 w-full">
                <p>Points</p>
                <div className="flex gap-x-2 items-center">
                  <InputText
                    type="text"
                    placeholder="From"
                    name="pointsFrom"
                    className="w-full"
                  />
                  <p>-</p>
                  <InputText
                    type="text"
                    placeholder="To"
                    name="pointsTo"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid gap-1.5 w-full">
                <p>Shot-type</p>
                <select
                  name="shottype"
                  className="w-full  outline-white/20 focus:outline-white transition-all outline-none border-none bg-primary py-1 px-4 rounded-md"
                >
                  <option value={"All"}>All</option>

                  {shotTypeList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <div className="flex flex-col gap-y-3">
            <div className="flex gap-x-3">
              <div className="flex flex-col gap-1.5 w-full">
                <p>Score</p>
                <div className="flex gap-x-2 items-center">
                  <InputText
                    type="text"
                    placeholder="From"
                    name="scoreFrom"
                    className="w-full"
                  />
                  <p>-</p>
                  <InputText
                    type="text"
                    placeholder="To"
                    name="scoreTo"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <div>
                  <p className="float-left">Rank</p>
                  <p className="float-right">Achievement</p>
                </div>
                <div className="flex gap-x-3 items-center">
                  <select
                    name="rank"
                    className="w-full outline-white/20 focus:outline-white transition-all outline-none border-none bg-primary py-1 px-4 rounded-md"
                  >
                    <option value={"All"}>All</option>

                    {touhouDifficulty.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <select
                    name="achievement"
                    className="w-full  outline-white/20 focus:outline-white transition-all outline-none border-none bg-primary py-1 px-4 rounded-md"
                  >
                    <option value={"All"}>All</option>

                    {Object.keys(achievementRankValues).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-x-3">
              <div className="grid gap-1.5 w-full">
                <p>Character</p>
                <InputText
                  type="text"
                  placeholder="Character"
                  name="character"
                  className="w-full"
                />
              </div>
              <div className="grid gap-1.5 w-full">
                <p>User ID</p>
                <InputText
                  type="text"
                  placeholder="User ID"
                  name="userId"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <ButtonInput type="reset" variant={"outline"}>
          Clear
        </ButtonInput>
        <ButtonInput type="submit">Search</ButtonInput>
      </div>
    </form>
  );
}

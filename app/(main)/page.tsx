import { InputText } from "../mainComponents/InputText";
import Event from "./components/Event";
import Ranking from "./components/Ranking";

export default function Home() {
  return (
    <div className="flex-col flex gap-y-3">
      <div className="flex justify-end w-full">{/* <Event /> */}</div>
      <h2 className="text-center text-3xl font-semibold">Ranking</h2>
      <Ranking />
    </div>
  );
}

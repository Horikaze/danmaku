import { CCValueRecord, rankValueRecord } from "../lib/calculatePoints";
import { Divider } from "../mainComponents/Divider";
import WrTable from "./components/WrTable";

const weeklyPoints = [360, 180, 120, 90, 72, 60, 52, 45, 40, 36];
const Info = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-2xl font-semibold text-center" id="points">
        How are points calculated?
      </h2>
      <Divider />
      <p>Points are awarded through a formula:</p>
      <p>(YourScore / WrScore * 100) * Rank * Achievement</p>
      {/* <PointsTesting /> */}
      <div className="flex flex-row gap-x-10">
        <div className="flex flex-col">
          <p className="text-center">Rank</p>
          {Object.values(rankValueRecord).map((ele, idx) => (
            <div key={ele + idx} className="flex">
              <p className="w-24">{Object.keys(rankValueRecord)[idx]}</p>
              <p>{ele}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <p className="text-center">Achievement</p>
          {Object.values(CCValueRecord).map((ele, idx) => (
            <div key={ele.toString() + "CC" + idx.toString()} className="flex">
              <p className="w-24">{Object.keys(CCValueRecord)[idx]}</p>
              <p>{ele}</p>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-center" id="wr">
        WR scores table
      </h2>
      <WrTable />
    </div>
  );
};

export default Info;

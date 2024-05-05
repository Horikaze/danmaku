import WrTable from "./WrTable";


const Info = () => {
  return (
    <div className="flex flex-col gap-y-2 container">
      <h2 className="text-2xl font-semibold text-center">
        WR scores table
      </h2>
      <WrTable />
    </div>
  );
};

export default Info;

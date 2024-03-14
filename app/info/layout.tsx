import InfoController from "./components/InfoController";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-3 flex flex-col gap-y-3 bg-primary rounded-md drop-shadow-md min-h-[1200px] overflow-y-scroll">
      <h1 className="text-3xl font-semibold text-center">Info page</h1>
      <InfoController />
      {children}
    </div>
  );
}

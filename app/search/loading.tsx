export default function Loading() {
  const dummyArr = [1, 2, 3, 4];
  return (
    <div className="flex flex-col gap-y-2 animate-pulse pt-[60px] p-3">
      {dummyArr.map((e) => (
        <div
          className="w-full h-9 bg-primary rounded-md"
          key={e}
        ></div>
      ))}
    </div>
  );
}

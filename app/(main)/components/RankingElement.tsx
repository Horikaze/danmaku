type RankingElementProps = {
  idx: number;
};
export default function RankingElement({ idx }: RankingElementProps) {
  return (
    <div className="w-full flex gap-x-2 items-center bg-background p-2 rounded-md">
      <p className="w-5 text-center">{idx + 1}.</p>
      <div className="bg-primary size-20"></div>
    </div>
  );
}

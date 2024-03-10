import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { sortTypesType } from "./ReplaysList";

type SortLabelProps = {
  onClick: (type: sortTypesType) => void;
  type: sortTypesType;
  activeSort: sortTypesType;
  sortDir: boolean;
};
export default function SortLabel({
  onClick,
  type,
  activeSort,
  sortDir,
}: SortLabelProps) {
  return (
    <div
      onClick={() => {
        onClick(type);
      }}
      className={`hover:bg-hover ${
        activeSort === type ? "bg-hover" : ""
      } px-2 py-1 text-center flex justify-start h-8 overflow-x-hidden relative select-none items-center rounded-md cursor-pointer`}
    >
      {activeSort === type ? sortDir ? <FaArrowDown /> : <FaArrowUp /> : null}
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {type.length > 6 ? type.slice(0, -7) : type}
      </p>
    </div>
  );
}

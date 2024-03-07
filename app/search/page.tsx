"use client";
import toast from "react-hot-toast";
import { InputCheckbox } from "../mainComponents/InputCheckbox";

export default function Search() {
  return (
    <div className="flex w-full">
      <button
        onClick={() => {
          toast.success("aha");
        }}
      >
        aha
      </button>
    </div>
  );
}

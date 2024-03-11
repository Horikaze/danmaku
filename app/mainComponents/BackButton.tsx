"use client";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.back();
      }}
      className="hover:bg-hover px-2 py-1 rounded-md"
    >
      <FaArrowLeft className="size-8" />
    </button>
  );
}

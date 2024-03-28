"use client";
import React from "react";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa";

export default function Copy({ text }: { text: string }) {
  return (
    <div
      onClick={() => {
        navigator.clipboard.writeText(text);
        toast.success("Copied");
      }}
      className="text-sm text-tsecond flex items-center gap-x-1"
    >
      <FaCopy />
      <span>Copy {text}</span>
    </div>
  );
}

"use client";
import React from "react";

export default function DownloadRpy({
  buffer,
  rpy_name,
}: {
  buffer: Buffer;
  rpy_name: string;
}) {
  const onClick = () => {
    const replatBuffer = Buffer.from(buffer);
    const blob = new Blob([replatBuffer]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = rpy_name; // Replace 'filename.ext' with the actual file name and extension
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <p className="underline cursor-pointer" onClick={onClick}>
      Download .rpy
    </p>
  );
}

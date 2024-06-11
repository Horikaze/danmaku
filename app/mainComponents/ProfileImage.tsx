"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function ProfileImage({
  imageUrl,
}: {
  imageUrl: string | null;
}) {
  const [hasError, setHasError] = useState(false);
  return (
    <Image
      src={hasError || !imageUrl ? "/images/placeholder.jpg" : imageUrl}
      alt="ProfileImage"
      fill
      sizes="auto"
      style={{ objectFit: "cover" }}
      onError={() => {
        setHasError(true);
      }}
    />
  );
}

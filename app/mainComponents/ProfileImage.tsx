import Image from "next/image";
import React from "react";

export default function ProfileImage({
  imageUrl,
}: {
  imageUrl: string | null;
}) {
  return (
    <Image
      src={imageUrl || "/images/placeholder.jpg"}
      alt="ProfileImage"
      fill
      style={{ objectFit: "cover" }}
    />
  );
}

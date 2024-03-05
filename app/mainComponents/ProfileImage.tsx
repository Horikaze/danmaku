import Image from "next/image";
import React from "react";

export default function ProfileImage({ imageUrl }: { imageUrl: string }) {
  return (
    <Image
      src={imageUrl || "/images/placeholder.jpg"}
      alt="ProfileImage"
      fill
      style={{ objectFit: "cover" }}
    />
  );
}

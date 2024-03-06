"use client";
import { UploadButton } from "@/app/lib/uploadthing";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa6";
export default function UpdateImages({
  endpoint,
}: {
  endpoint: "profileBanner" | "profileImage" | "siteBG";
}) {
  const { update } = useSession();
  return (
    <UploadButton
      content={{
        button({}) {
          return <FaImage className="size-8 cursor-pointer z-10" />;
        },
        allowedContent(arg) {
          return <div className="hidden" />;
        },
      }}
      endpoint={endpoint}
      onClientUploadComplete={async (res) => {
        if (endpoint === "profileImage") {
          await update({ image: res[0].url });
        }
        toast.success("Updated");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        toast.error("Error");
      }}
    />
  );
}

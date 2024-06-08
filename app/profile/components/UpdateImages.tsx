"use client";
import { useSession } from "next-auth/react";
import React, { useId } from "react";
import toast from "react-hot-toast";
import { updateImage } from "../actions/profileActions";
export default function UpdateImages({
  endpoint,
  children,
}: {
  endpoint: "profileBanner" | "profileImage";
  children: React.ReactNode;
}) {
  const ACCEPT_FILES = [".png", ".jpeg", ".webp", ".jpg"];
  const id = useId();
  const updateImageFn = async (file: File) => {
    try {
      if (!file || file.size < 10) return;
      const formData = new FormData();
      formData.append("file", file);
      const res = await updateImage(formData, endpoint);
      if (res.Error) {
        toast.error(`${res.Error.errorMsg}`);
        return;
      }
      if (endpoint === "profileImage") {
        await update({ image: res.data?.imageUrl });
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  const { update } = useSession();
  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          updateImageFn(e.target.files![0]);
        }}
        multiple={false}
        accept={ACCEPT_FILES.join(",")}
        hidden
        id={id}
      />
      <label className="size-full cursor-pointer" htmlFor={id}>
        {children}
      </label>
    </>
  );
}

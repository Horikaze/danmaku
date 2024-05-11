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
      const res = await updateImage(formData);
      console.log(res);
      return
      await update({ image: res });
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  const { update } = useSession();
  return (
    // <UploadButton
    //   content={{
    //     button({}) {
    //       return <FaImage className="size-8 cursor-pointer z-10" />;
    //     },
    //     allowedContent(arg) {
    //       return <div className="hidden" />;
    //     },
    //   }}
    //   endpoint={endpoint}
    //   onClientUploadComplete={async (res) => {
    //     if (endpoint === "profileImage") {
    //       await update({ image: res[0].url });
    //     }
    //     toast.success("Updated");
    //   }}
    //   onUploadError={(error: Error) => {
    //     // Do something with the error.
    //     toast.error("Error");
    //   }}
    // />
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

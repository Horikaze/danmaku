"use server";
import { redirect } from "next/navigation";

export const searchReaplys = async (formData: FormData) => {
  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    if (value.toString() !== "" && value.toString() !== "All") {
      urlSearchParams.append(key, value.toString());
    }
  }
  const searchString = urlSearchParams.toString();

  redirect(`/search?${searchString}`);
};

"use server";
import { redirect } from "next/navigation";

export const searchReaplys = async (formData: FormData) => {
  const urlSearchParams = new URLSearchParams();
  for (let [key, value] of formData.entries()) {
    value = value.toString();
    if (value !== "" && value !== "All") {
      urlSearchParams.append(key, value);
    }
  }
  const searchString = urlSearchParams.toString();

  redirect(`/search?${searchString}`);
};

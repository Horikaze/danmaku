"use server";
import { redirect } from "next/navigation";

export const searchReaplys = async (formData: FormData) => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append("player", formData.get("player") as string);
  urlSearchParams.append("game", formData.get("game") as string);
  urlSearchParams.append("scoreFrom", formData.get("scoreFrom") as string);
  urlSearchParams.append("scoreTo", formData.get("scoreTo") as string);
  urlSearchParams.append("pointsFrom", formData.get("pointsFrom") as string);
  urlSearchParams.append("pointsTo", formData.get("pointsTo") as string);
  urlSearchParams.append("rank", formData.get("rank") as string);
  urlSearchParams.append("achievement", formData.get("achievement") as string);
  urlSearchParams.append("shottype", formData.get("shottype") as string);
  urlSearchParams.append("character", formData.get("character") as string);
  urlSearchParams.append("userId", formData.get("userId") as string);

  const searchString = urlSearchParams.toString(); // Encodes key-value pairs

  redirect(`/search?${searchString}`);
};

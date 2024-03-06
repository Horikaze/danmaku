"use server";
import { ReplayInfo } from "@/app/types/Replay";
import axios from "axios";
  // export const sendReplayAction = async (any) => {
  //   console.log("object");
  //   console.log(any);
  // };
export const threp = async (formData: FormData) => {
  try {
    const res = await axios.post(process.env.THREP as string, formData);
    return res.data as ReplayInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

import { type ClassValue, clsx } from "clsx";
import { format, fromUnixTime } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const convertUnixDate = (date: number) => {
  try {
    if (!date) {
      return "";
    }
    return format(fromUnixTime(date / 1000), "dd-MM-yyyy");
  } catch (error) {
    console.log(error);
  }
};
export const convertUnixDateHours = (date: number) => {
  try {
    if (!date) {
      return "";
    }
    return format(fromUnixTime(date / 1000), "HH:mm-dd-MM-yyyy");
  } catch (error) {
    console.log(error);
  }
};

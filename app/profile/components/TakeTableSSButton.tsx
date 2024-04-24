import { convertUnixDate, inDevEnvironment } from "@/app/lib/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaCamera, FaSpinner } from "react-icons/fa6";

export default function TakeTableSSButton() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  console.log(pathname);
  const user = useSession();
  const takeSS = async () => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      const url = `http://${
        inDevEnvironment ? "localhost:3000" : "danmaku.horikaze.pl"
      }${pathname}`;

      const res = await axios.post("/api/table", {
        url: url,
      });
      const file = res.data.data.data;
      if (!file) {
        throw new Error("Internal Error");
      }

      const ui8Array = new Uint8Array(file.toString().split(",").map(Number));
      const blob = new Blob([ui8Array], { type: "image/png" });
      const objectURL = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectURL;
      const date = Date.now();
      console.log("a");
      link.download = `Table-${user.data?.user.info.nickname}-${convertUnixDate(
        date
      )}.png`;
      link.click();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div
      className="flex h-6 items-center text-tsecond transition-all group-hover:opacity-100 opacity-0 mr-auto gap-x-1 cursor-pointer"
      onClick={takeSS}
    >
      {isLoading ? (
        <FaSpinner className="size-6 animate-spin" />
      ) : (
        <FaCamera className="size-6" />
      )}

      <p className="text-sm">
        {isLoading ? "generating..." : "take screenshot"}
      </p>
    </div>
  );
}

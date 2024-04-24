import { convertUnixDate } from "@/app/lib/utils";
import { useSession } from "next-auth/react";
import { RefObject } from "react";
import { FaCamera } from "react-icons/fa6";

export default function TakeTableSSButton({
  refTable,
}: {
  refTable: RefObject<HTMLDivElement>;
}) {
  const user = useSession();
  const takeSS = async () => {
    try {
      const html2canvas = (await import("html2canvas")).default;
      const res = await html2canvas(refTable.current!, {
        allowTaint: true,
        useCORS: true,
        logging: true,
        windowWidth: 850,
      });

      const dataURL = res.toDataURL();
      const a = document.createElement("a");
      a.href = dataURL;
      const date = Date.now();
      a.download = `Table-${user.data?.user.info.nickname}-${convertUnixDate(
        date
      )}.png`;
      a.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex h-6 items-center text-tsecond transition-all group-hover:opacity-100 opacity-0 mr-auto gap-x-1 cursor-pointer"
      onClick={takeSS}
    >
      <FaCamera className="size-6" />

      <p className="text-sm">take screenshot</p>
    </div>
  );
}

"use client";

import { InputCheckbox } from "@/app/mainComponents/InputCheckbox";
import ReplayScoreChart from "@/app/mainComponents/ReplayScoreChart";
import { useState } from "react";

export default function ReplayChart({ scores }: { scores: number[] }) {
  const [chart, setChart] = useState(true);
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <div className="gap-x-1 flex items-center">
        <InputCheckbox
          id="sendChart"
          name="sendChart"
          checked={chart}
          onChange={(e) => {
            setChart(e.target.checked);
          }}
        />
        <label htmlFor="sendChart" className="select-none">
          Show chart
        </label>
      </div>
      {scores && chart ? (
        <div className="flex justify-center items-center w-full">
          <div className="max-w-3xl w-full min-h-96">
            <ReplayScoreChart scores={scores!} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

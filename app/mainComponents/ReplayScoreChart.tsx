"use client";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      right: 60, // Adjust the padding value as needed
    },
  },
  plugins: {
    tooltip: {
      enabled: false,
    },
    datalabels: {
      display: true,
      formatter: (value: number) => value.toLocaleString(),
      size: 40,
      font: {
        size: 15,
        weight: "bold",
        color: "yellow",
      },
      backgroundColor: "#2F3136",
      color: "white",
      borderRadius: 2,
    },
    legend: {
      display: false,
    },
  },
};

export default function ReplayScoreChart({ scores }: { scores: number[] }) {
  if (scores.length <= 1) {
    return (
      <div className="flex text-2xl text-tsecond text-center font-semibold items-center justify-center h-32">
        <h3>Replay needs at least 2 stages to show chart</h3>
      </div>
    );
  }
  const labels = Array.from(
    { length: scores.length },
    (_, i) => `Stage ${i + 1}`
  );
  const data = {
    labels,
    datasets: [
      {
        data: scores,
        borderColor: "#8dd294",
      },
    ],
  };
  //@ts-ignore
  return <Line options={options} plugins={[ChartDataLabels]} data={data} />;
}

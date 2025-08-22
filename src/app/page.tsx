import Image from "next/image";
import Tracker from "@/components/tracker";
import { ChartAreaInteractive } from "@/components/chart";
import { Square } from "@/components/square";

export default function Home() {
  return (
    <div className="flex flex-col h-screen px-5">
      <h1 className="text-2xl font-semibold pt-5">Weight Tracker</h1>
      <div className="flex gap-6 mt-5">
        <div className="w-1/2">
          <Tracker />
        </div>
        <div className="w-1/2">
          <ChartAreaInteractive />
          <div className="mt-4">
            <Square />
          </div>
        </div>
      </div>
    </div>
  );
}

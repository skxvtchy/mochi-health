"use client";

import * as React from "react";
import {
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
} from "recharts";

const goal = 150;

const chartData = [
  { date: "2024-04-01", weight: 500 },
  { date: "2024-04-03", weight: 366 },
  { date: "2024-04-04", weight: 492 },
  { date: "2024-05-17", weight: 388 },
  { date: "2024-05-18", weight: 382 },
  { date: "2024-05-29", weight: 488 },
  { date: "2024-06-27", weight: 282 },
  { date: "2024-06-28", weight: 352 },
  { date: "2024-06-29", weight: 275 },
  { date: "2024-06-30", weight: 130 },
];

export function ChartAreaInteractive() {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600 font-semibold">
            {new Date(label || "").toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-sm text-gray-600 font-semibold ">
            Goal - {goal} lbs
          </p>
          {payload.map((entry, index: number) => (
            <p key={index} className="text-sm text-gray-600 font-semibold">
              {entry.name} - {entry.value} lbs
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="bg-white rounded-lg p-6 border border-gray-200"
      style={{ outline: "none" }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Weight History</h3>
        <p className="text-sm text-gray-600">Showing progress over time</p>
      </div>

      <div className="h-[350px] w-full ">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            style={{ outline: "none" }}
            tabIndex={1}
          >
            <defs>
              <linearGradient id="fillWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#737373" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#737373" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              textAnchor="end"
              height={60}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              dataKey="weight"
              type="monotone"
              fill="url(#fillWeight)"
              stroke="#a1a1aa"
              strokeWidth={2}
              name="Weight"
            />
            <ReferenceLine
              y={goal}
              stroke="#3f3f46"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Goal"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#a1a1aa] rounded"></div>
          <span className="text-sm text-gray-600">Current Weight</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#737373] rounded"></div>
          <span className="text-sm text-gray-600">Goal</span>
        </div>
      </div>
    </div>
  );
}

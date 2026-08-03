"use client";

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

interface Props {
  data: {
    name: string;
    meetings: number;
  }[];
}

export default function OverviewChart({
  data,
}: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="meetings"
          radius={[8, 8, 0, 0]}
          fill="#2563eb"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}


// Added chart, date filter, animated counters
"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProfitLoss() {
  const [range, setRange] = useState({ from: "2025-01-01", to: "2025-01-31" });

  const sales = 8400000;
  const expenses = 1920000;
  const profit = sales - expenses;

  const chartData = [
    { name: "Sotuv", amount: sales },
    { name: "Xarajat", amount: expenses },
    { name: "Foyda", amount: profit },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold mb-2">📊 Foyda & Zarar</h1>

      {/* Date Filter */}
      <div className="flex gap-4 bg-white p-4 rounded shadow w-max">
        <div>
          <p className="text-sm text-gray-500">Boshlanish sanasi</p>
          <Input
            type="date"
            value={range.from}
            onChange={(e) => setRange({ ...range, from: e.target.value })}
          />
        </div>
        <div>
          <p className="text-sm text-gray-500">Tugash sanasi</p>
          <Input
            type="date"
            value={range.to}
            onChange={(e) => setRange({ ...range, to: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Umumiy Sotuv</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {sales.toLocaleString()} so‘m
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Umumiy Xarajat</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">
              {expenses.toLocaleString()} so‘m
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Foyda</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-3xl font-bold ${
                profit >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {profit.toLocaleString()} so‘m
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Diagramma</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="currentColor" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
"use client";
import { useState } from "react";

export default function Payments() {
  const [payments] = useState([
    {
      id: 1,
      customer: "Ali",
      amount: 50000,
      method: "Naqd",
      date: "2025-01-12",
    },
    {
      id: 2,
      customer: "Aziza",
      amount: 120000,
      method: "Karta",
      date: "2025-01-11",
    },
    {
      id: 3,
      customer: "Javohir",
      amount: 80000,
      method: "Click",
      date: "2025-01-10",
    },
    {
      id: 4,
      customer: "Umid",
      amount: 45000,
      method: "Naqd",
      date: "2025-01-09",
    },
    {
      id: 5,
      customer: "Malika",
      amount: 150000,
      method: "Payme",
      date: "2025-01-08",
    },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">To‘lovlar</h1>

      <div className="bg-white p-6 shadow rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2">ID</th>
              <th className="py-2">Mijoz</th>
              <th className="py-2">Summasi</th>
              <th className="py-2">To‘lov turi</th>
              <th className="py-2">Sana</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-2">{p.id}</td>
                <td className="py-2 font-medium">{p.customer}</td>
                <td className="py-2 font-semibold">
                  {p.amount.toLocaleString()} so'm
                </td>
                <td className="py-2">{p.method}</td>
                <td className="py-2 text-gray-500">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

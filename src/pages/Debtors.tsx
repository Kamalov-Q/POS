"use client";
import { useState } from "react";

export default function Debtors() {
  const [debtors, setDebtors] = useState([
    { id: 1, name: "Aziz", phone: "+998 90 111 22 33", debt: 240000 },
    { id: 2, name: "Sardor", phone: "+998 93 222 33 44", debt: 90000 },
    { id: 3, name: "Madina", phone: "+998 91 555 66 77", debt: 150000 },
    { id: 4, name: "Bekzod", phone: "+998 99 777 88 99", debt: 450000 },
    { id: 5, name: "Dilshod", phone: "+998 94 333 22 11", debt: 320000 },
  ]);

  const payDebt = (id: number, amount: number) => {
    if (!amount) return;

    setDebtors((list) =>
      list.map((d) =>
        d.id === id ? { ...d, debt: Math.max(0, d.debt - amount) } : d
      )
    );
  };

  const removeDebtor = (id: number) =>
    setDebtors(debtors.filter((d) => d.id !== id));

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-5">💵 Qarzdorlar</h1>

      <div className="overflow-hidden rounded shadow bg-white">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3">Ism</th>
              <th className="p-3">Telefon</th>
              <th className="p-3">Qarz Summasi</th>
              <th className="p-3 w-48">To‘lash</th>
              <th className="p-3 w-16"></th>
            </tr>
          </thead>

          <tbody>
            {debtors.map((d) => {
              const [localAmount, setLocalAmount] = useState("");

              return (
                <tr key={d.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 font-medium">{d.name}</td>
                  <td className="p-3 text-gray-600">{d.phone}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm font-semibold ${
                        d.debt === 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {d.debt.toLocaleString()} so‘m
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={localAmount}
                        onChange={(e) => setLocalAmount(e.target.value)}
                        className="border px-2 py-1 rounded w-24"
                        placeholder="Summa"
                      />

                      <button
                        onClick={() => {
                          payDebt(d.id, Number(localAmount));
                          setLocalAmount("");
                        }}
                        className="bg-green-600 text-white px-3 rounded"
                      >
                        Pay
                      </button>
                    </div>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => removeDebtor(d.id)}
                      className="bg-red-600 text-white px-3 rounded"
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

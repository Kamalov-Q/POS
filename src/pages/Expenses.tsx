"use client";
import { useState } from "react";

export default function Expenses() {
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Elektr energiyasi", amount: 150000, date: "2025-01-12" },
    { id: 2, title: "Yetkazib berish", amount: 50000, date: "2025-01-11" },
    { id: 3, title: "Internet to'lovi", amount: 90000, date: "2025-01-10" },
    { id: 4, title: "Xodim ovqatlanishi", amount: 60000, date: "2025-01-09" },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const addExpense = () => {
    if (!newTitle || !newAmount) return;

    setExpenses((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: newTitle,
        amount: Number(newAmount),
        date: new Date().toISOString().slice(0, 10),
      },
    ]);

    setNewTitle("");
    setNewAmount("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Xarajatlar</h1>

      <div className="bg-white p-4 shadow rounded mb-4 flex gap-3 border">
        <input
          className="border px-3 py-2 rounded w-1/3"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Xarajat nomi"
        />
        <input
          className="border px-3 py-2 rounded w-1/3"
          value={newAmount}
          type="number"
          onChange={(e) => setNewAmount(e.target.value)}
          placeholder="Summa"
        />
        <button
          onClick={addExpense}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Qo‘shish
        </button>
      </div>

      <div className="bg-white p-4 shadow rounded border">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2">ID</th>
              <th className="py-2">Nomi</th>
              <th className="py-2">Summasi</th>
              <th className="py-2">Sana</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((e) => (
              <tr key={e.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-2">{e.id}</td>
                <td className="py-2 font-medium">{e.title}</td>
                <td className="py-2 font-semibold">
                  {e.amount.toLocaleString()} so'm
                </td>
                <td className="py-2 text-gray-500">{e.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

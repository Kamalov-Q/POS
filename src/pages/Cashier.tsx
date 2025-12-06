import { useState } from "react";

export default function CashierPage() {
  const [balance, setBalance] = useState(1_200_000);
  const [history, setHistory] = useState([
    { id: 1, type: "kirim", amount: 200000, note: "Kun boshlandi" },
    { id: 2, type: "chiqim", amount: 50000, note: "Choyxona" },
    { id: 3, type: "kirim", amount: 150000, note: "Tovar sotildi" },
    { id: 4, type: "chiqim", amount: 30000, note: "Ofis uchun qalam" },
    { id: 5, type: "kirim", amount: 220000, note: "Naqd tushum" },
  ]);

  const addIncome = () => {
    setBalance(balance + 100000);
    setHistory([
      ...history,
      {
        id: history.length + 1,
        type: "kirim",
        amount: 100000,
        note: "Kirim qo'shildi",
      },
    ]);
  };

  const addExpense = () => {
    setBalance(balance - 50000);
    setHistory([
      ...history,
      {
        id: history.length + 1,
        type: "chiqim",
        amount: 50000,
        note: "Xarajat qilingan",
      },
    ]);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Kassa</h1>

      {/* Balance Card */}
      <div className="p-6 border rounded-xl shadow bg-white mb-6">
        <h2 className="text-xl font-semibold">Joriy balans</h2>
        <p className="text-4xl font-bold mt-2 text-gray-800">
          {balance.toLocaleString()} so‘m
        </p>

        <div className="flex gap-3 mt-5">
          <button
            onClick={addIncome}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
          >
            + Kirim
          </button>
          <button
            onClick={addExpense}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow"
          >
            - Chiqim
          </button>
        </div>
      </div>

      {/* History */}
      <h3 className="text-xl font-semibold mb-3">Kassa tarixi</h3>
      <div className="space-y-3">
        {history.map((h) => (
          <div
            key={h.id}
            className="p-4 border rounded-lg bg-white shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{h.note}</p>
              <p className="text-sm text-gray-500">ID: {h.id}</p>
            </div>

            <span
              className={
                h.type === "kirim"
                  ? "text-green-600 font-bold text-lg"
                  : "text-red-600 font-bold text-lg"
              }
            >
              {h.type === "kirim" ? "+" : "-"} {h.amount.toLocaleString()} so‘m
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

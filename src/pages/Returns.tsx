import { useState } from "react";

export default function ReturnsPage() {
  const [returns, setReturns] = useState([
    {
      id: 1,
      product: "Coca Cola 1L",
      qty: 2,
      reason: "Yaroqsiz",
      date: "2025-01-02",
    },
    {
      id: 2,
      product: "Snickers",
      qty: 1,
      reason: "Mijoz qaytardi",
      date: "2025-01-03",
    },
    {
      id: 3,
      product: "Tovuq Go‘shti",
      qty: 3,
      reason: "Muddat o'tgan",
      date: "2025-01-05",
    },
  ]);

  const deleteReturn = (id: number) => {
    setReturns((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Qaytgan Mahsulotlar</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Mahsulot</th>
            <th className="p-2 border">Soni</th>
            <th className="p-2 border">Sabab</th>
            <th className="p-2 border">Sana</th>
            <th className="p-2 border">Amal</th>
          </tr>
        </thead>

        <tbody>
          {returns.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="border p-2">{r.id}</td>
              <td className="border p-2">{r.product}</td>
              <td className="border p-2">{r.qty}</td>
              <td className="border p-2">{r.reason}</td>
              <td className="border p-2">{r.date}</td>

              <td className="border p-2">
                <button
                  onClick={() => deleteReturn(r.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  O‘chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

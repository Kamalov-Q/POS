"use client";
import { useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([
    { id: 1, customer: "Ali", total: 240000, status: "Pending" },
    { id: 2, customer: "Aziza", total: 450000, status: "Completed" },
    { id: 3, customer: "Jahongir", total: 90000, status: "Pending" },
  ]);

  const toggleStatus = (id) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, status: o.status === "Pending" ? "Completed" : "Pending" }
          : o
      )
    );
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Buyurtmalar</h1>

      <div className="bg-white p-4 shadow rounded">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th>ID</th>
              <th>Mijoz</th>
              <th>Summasi</th>
              <th>Status</th>
              <th>Amal</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t">
                <td>{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.total} so'm</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      o.status === "Completed"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => toggleStatus(o.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    O‘zgartirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

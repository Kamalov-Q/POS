"use client";
import { useState } from "react";

export default function Warehouses() {
  const [warehouses] = useState([
    { id: 1, name: "Asosiy Ombor", location: "Tashkent", stock: 1240 },
    { id: 2, name: "Chilonzor Ombori", location: "Chilonzor", stock: 560 },
    { id: 3, name: "Sergeli Ombori", location: "Sergeli", stock: 320 },
  ]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Omborlar</h1>

      <div className="bg-white p-4 shadow rounded">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th>ID</th>
              <th>Nomi</th>
              <th>Manzil</th>
              <th>Zaxira</th>
            </tr>
          </thead>

          <tbody>
            {warehouses.map((w) => (
              <tr key={w.id} className="border-t">
                <td>{w.id}</td>
                <td>{w.name}</td>
                <td>{w.location}</td>
                <td>{w.stock} dona</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

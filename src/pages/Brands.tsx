"use client";
import { useState } from "react";

export default function Brands() {
  const [brands] = useState([
    { id: 1, name: "Coca Cola", products: 12 },
    { id: 2, name: "Nestle", products: 7 },
    { id: 3, name: "Pepsi", products: 10 },
  ]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Brendlar</h1>

      <div className="bg-white p-4 shadow rounded">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th>ID</th>
              <th>Brend</th>
              <th>Mahsulotlar</th>
            </tr>
          </thead>

          <tbody>
            {brands.map((b) => (
              <tr key={b.id} className="border-t">
                <td>{b.id}</td>
                <td>{b.name}</td>
                <td>{b.products}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

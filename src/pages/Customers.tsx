"use client";
import { useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([
    { id: 1, name: "Azizbek", phone: "+998 90 123 45 67", purchases: 14 },
    { id: 2, name: "Malika", phone: "+998 93 888 77 55", purchases: 4 },
    { id: 3, name: "Jamshid", phone: "+998 99 555 44 22", purchases: 9 },
  ]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const addCustomer = () => {
    if (!name || !phone) return;

    setCustomers([...customers, { id: Date.now(), name, phone, purchases: 0 }]);

    setName("");
    setPhone("");
  };

  const removeCustomer = (id: number) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">👤 Mijozlar</h1>

      <div className="flex gap-3 mb-4">
        <input
          className="border px-3 py-2 rounded"
          placeholder="Mijoz ismi"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border px-3 py-2 rounded"
          placeholder="+998 ..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          onClick={addCustomer}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Qo‘shish
        </button>
      </div>

      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Ism</th>
            <th className="p-2 border">Telefon</th>
            <th className="p-2 border">Xaridlar</th>
            <th className="p-2 border w-24">Amal</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.phone}</td>
              <td className="p-2 border">{c.purchases}</td>
              <td className="p-2 border">
                <button
                  onClick={() => removeCustomer(c.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  O'chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";
import { useState } from "react";

export default function Staff() {
  const [staff, setStaff] = useState([
    { id: 1, name: "Akmal", position: "Sotuvchi", phone: "+998 90 112 23 45" },
    { id: 2, name: "Nigora", position: "Kassir", phone: "+998 93 777 12 45" },
    {
      id: 3,
      name: "Jasurbek",
      position: "Omborchi",
      phone: "+998 99 333 44 11",
    },
    { id: 4, name: "Umida", position: "Sotuvchi", phone: "+998 90 556 44 21" },
    { id: 5, name: "Kamron", position: "Kassir", phone: "+998 97 111 77 88" },
  ]);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");

  const addStaff = () => {
    if (!name || !position || !phone) return;

    setStaff([...staff, { id: Date.now(), name, position, phone }]);

    setName("");
    setPosition("");
    setPhone("");
  };

  const removeStaff = (id: number) => {
    setStaff(staff.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">👥 Xodimlar</h1>

      {/* Add Form */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-3 border">
        <input
          className="border px-3 py-2 rounded w-1/4"
          placeholder="Ismi"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border px-3 py-2 rounded w-1/4"
          placeholder="Lavozimi"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <input
          className="border px-3 py-2 rounded w-1/4"
          placeholder="+998 ..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={addStaff}
          className="bg-blue-600 text-white px-5 rounded hover:bg-blue-700 transition"
        >
          Qo‘shish
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">Ism</th>
              <th className="p-3 border">Lavozimi</th>
              <th className="p-3 border">Telefon</th>
              <th className="p-3 border w-24">Amal</th>
            </tr>
          </thead>

          <tbody>
            {staff.map((s) => (
              <tr
                key={s.id}
                className="hover:bg-gray-50 transition border-t even:bg-gray-50/40"
              >
                <td className="p-3 border">{s.name}</td>
                <td className="p-3 border">{s.position}</td>
                <td className="p-3 border">{s.phone}</td>

                <td className="p-3 border">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => removeStaff(s.id)}
                  >
                    O‘chirish
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

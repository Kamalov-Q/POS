import { useState } from "react";

export default function UnitsPage() {
  const [units, setUnits] = useState([
    { id: 1, name: "Dona", short: "don" },
    { id: 2, name: "Litr", short: "L" },
    { id: 3, name: "Kilogramm", short: "kg" },
  ]);

  const addUnit = () => {
    const newUnit = {
      id: units.length + 1,
      name: "Yangi Qadoq",
      short: "yq",
    };
    setUnits([...units, newUnit]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Qadoqlar</h1>

      <button
        onClick={addUnit}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        + Qadoq qo‘shish
      </button>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Nomi</th>
            <th className="p-2 border">Qisqa</th>
          </tr>
        </thead>

        <tbody>
          {units.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.short}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

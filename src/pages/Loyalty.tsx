"use client";
import { useState } from "react";

export default function Loyalty() {
  const [users, setUsers] = useState([
    { id: 1, name: "Doston", points: 120 },
    { id: 2, name: "Rayhona", points: 340 },
    { id: 3, name: "Bekzod", points: 85 },
    { id: 4, name: "Malika", points: 410 },
    { id: 5, name: "Jamshid", points: 255 },
  ]);

  // store per-user input
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});

  const addPoints = (id: number) => {
    const amt = Number(inputValues[id]);
    if (!amt) return;

    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, points: u.points + amt } : u))
    );

    setInputValues({ ...inputValues, [id]: "" });
  };

  const redeem = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, points: Math.max(0, u.points - 50) } : u
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🎁 Bonus Tizimi</h1>

      <div className="bg-white rounded-xl shadow border">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">Ism</th>
              <th className="p-3 border">Bonus Ballar</th>
              <th className="p-3 border w-56">Amallar</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="hover:bg-gray-50 transition border-t even:bg-gray-50/40"
              >
                <td className="p-3 border font-medium">{u.name}</td>

                <td className="p-3 border text-blue-600 font-semibold">
                  {u.points.toLocaleString()}
                </td>

                <td className="p-3 border">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="border px-2 py-1 w-20 rounded bg-white"
                      placeholder="+ball"
                      value={inputValues[u.id] || ""}
                      onChange={(e) =>
                        setInputValues({
                          ...inputValues,
                          [u.id]: e.target.value,
                        })
                      }
                    />

                    <button
                      onClick={() => addPoints(u.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      +
                    </button>

                    <button
                      onClick={() => redeem(u.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      -50
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

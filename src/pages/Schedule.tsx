"use client";
import { useState } from "react";

export default function Schedule() {
  const [schedule, setSchedule] = useState([
    { id: 1, name: "Akmal", day: "Dushanba", time: "09:00 - 18:00" },
    { id: 2, name: "Nigora", day: "Seshanba", time: "09:00 - 18:00" },
    { id: 3, name: "Jasurbek", day: "Payshanba", time: "10:00 - 19:00" },
    { id: 4, name: "Dilshod", day: "Juma", time: "08:00 - 17:00" },
    { id: 5, name: "Madina", day: "Shanba", time: "12:00 - 20:00" },
  ]);

  const weekdays = [
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
    "Yakshanba",
  ];

  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const addSchedule = () => {
    if (!name || !day || !startTime || !endTime) return;

    setSchedule([
      ...schedule,
      {
        id: Date.now(),
        name,
        day,
        time: `${startTime} - ${endTime}`,
      },
    ]);

    setName("");
    setDay("");
    setStartTime("");
    setEndTime("");
  };

  const removeSchedule = (id: number) =>
    setSchedule(schedule.filter((s) => s.id !== id));

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-5">📅 Ish Jadvali</h1>

      {/* ADD NEW SCHEDULE BLOCK */}
      <div className="border p-4 rounded mb-5 bg-white shadow">
        <h2 className="text-lg font-semibold mb-3">Yangi jadval qo‘shish</h2>

        <div className="flex gap-3 flex-wrap mb-4">
          <input
            className="border px-3 py-2 rounded w-48"
            placeholder="Xodim ismi"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="border px-3 py-2 rounded w-48"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="">Hafta kuni</option>
            {weekdays.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <input
            type="time"
            className="border px-3 py-2 rounded w-40"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <input
            type="time"
            className="border px-3 py-2 rounded w-40"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />

          <button
            onClick={addSchedule}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Qo‘shish
          </button>
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full border text-left bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Ism</th>
            <th className="p-2 border">Kun</th>
            <th className="p-2 border">Ish Vaqti</th>
            <th className="p-2 border w-20">Amal</th>
          </tr>
        </thead>

        <tbody>
          {schedule.map((s) => (
            <tr key={s.id}>
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border">{s.day}</td>
              <td className="p-2 border font-semibold">{s.time}</td>
              <td className="p-2 border text-center">
                <button
                  className="bg-red-600 text-white px-2 rounded"
                  onClick={() => removeSchedule(s.id)}
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

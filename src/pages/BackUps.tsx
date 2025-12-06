import { useState } from "react";

export default function BackupPage() {
  const [logs, setLogs] = useState([]);

  const createBackup = () => {
    const timestamp = new Date().toLocaleString();
    setLogs((prev) => [...prev, `Backup yaratildi: ${timestamp}`]);
  };

  const restoreBackup = () => {
    alert("Backup tiklandi (dummy action)");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Backup & Restore</h1>

      <div className="flex gap-4">
        <button
          onClick={createBackup}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Backup yaratish
        </button>

        <button
          onClick={restoreBackup}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Backup tiklash
        </button>
      </div>

      <h2 className="text-xl font-semibold mt-6">Backup Loglari</h2>
      <ul className="mt-3 p-3 border rounded bg-gray-50">
        {logs.map((log, i) => (
          <li key={i} className="border-b p-1 last:border-none">
            {log}
          </li>
        ))}
      </ul>
    </div>
  );
}

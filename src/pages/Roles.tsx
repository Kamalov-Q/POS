"use client";
import { useState } from "react";

export default function Roles() {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      permissions: [
        "Sotuv",
        "Ombor",
        "Xodimlar",
        "Rollar",
        "Moliya",
        "Sozlamalar",
      ],
    },
    {
      id: 2,
      name: "Kassir",
      permissions: ["Sotuv", "Cheklar"],
    },
    { id: 3, name: "Omborchi", permissions: ["Ombor", "Mahsulotlar"] },
    {
      id: 4,
      name: "Hisobchi",
      permissions: ["Moliya", "Xarajatlar", "Foyda & Zarar"],
    },
  ]);

  const [roleName, setRoleName] = useState("");
  const [permissionInput, setPermissionInput] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);

  // ➕ Add permission to list
  const addPermissionToList = () => {
    if (!permissionInput.trim()) return;

    setPermissions([...permissions, permissionInput.trim()]);
    setPermissionInput("");
  };

  // ➕ Add role
  const addRole = () => {
    if (!roleName.trim()) return;

    setRoles([
      ...roles,
      {
        id: Date.now(),
        name: roleName.trim(),
        permissions,
      },
    ]);

    setRoleName("");
    setPermissionInput("");
    setPermissions([]);
  };

  // ❌ Remove role
  const removeRole = (id: number) => setRoles(roles.filter((r) => r.id !== id));

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🛡 Rollar & Huquqlar</h1>

      {/* ADD ROLE SECTION */}
      <div className="border p-4 rounded shadow bg-white mb-6">
        <h2 className="text-lg font-semibold mb-3">Yangi Rol Qo‘shish</h2>

        <div className="flex gap-3 mb-3">
          <input
            className="border px-3 py-2 rounded w-1/3"
            placeholder="Rol nomi"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />

          <input
            className="border px-3 py-2 rounded w-1/3"
            placeholder="Huquq (masalan: Sotuv)"
            value={permissionInput}
            onChange={(e) => setPermissionInput(e.target.value)}
          />

          <button
            onClick={addPermissionToList}
            className="bg-gray-700 text-white px-4 rounded"
          >
            Qo‘shish +
          </button>
        </div>

        {/* List of selected permissions */}
        {permissions.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {permissions.map((p, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {p}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={addRole}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Rolni Saqlash
        </button>
      </div>

      {/* ROLES TABLE */}
      <table className="w-full border text-left bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Rol</th>
            <th className="p-2 border">Huquqlar</th>
            <th className="p-2 border w-20">Amal</th>
          </tr>
        </thead>

        <tbody>
          {roles.map((r) => (
            <tr key={r.id}>
              <td className="p-2 border font-semibold">{r.name}</td>

              <td className="p-2 border">
                <div className="flex flex-wrap gap-2">
                  {r.permissions.length ? (
                    r.permissions.map((p, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
                      >
                        {p}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      Huquqlar mavjud emas
                    </span>
                  )}
                </div>
              </td>

              <td className="p-2 border text-center">
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => removeRole(r.id)}
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

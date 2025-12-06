"use client";

import { useState } from "react";
import {
  Settings,
  ShieldCheck,
  Store,
  Globe,
  Database,
  Plus,
  X,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  /* -------------------- STATE -------------------- */
  const [language, setLanguage] = useState("O‘zbek");
  const [currency, setCurrency] = useState("UZS");

  const [darkMode, setDarkMode] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const [autoLock, setAutoLock] = useState(false);
  const [showLogs, setShowLogs] = useState(true);

  const [backupMode, setBackupMode] = useState("daily");
  const [lastBackup, setLastBackup] = useState("2025-01-12 14:32");

  const [branches, setBranches] = useState([
    { id: 1, name: "Chilonzor filial", active: true },
    { id: 2, name: "Yunusobod filial", active: false },
    { id: 3, name: "Sergeli filial", active: true },
  ]);

  const [showAddBranch, setShowAddBranch] = useState(false);
  const [newBranch, setNewBranch] = useState("");

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  /* -------------------- ACTIONS -------------------- */

  function toggleBranch(id: number) {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b))
    );
  }

  function createBackup() {
    const now = new Date().toLocaleString("uz-UZ");
    setLastBackup(now);
    alert("Backup muvaffaqiyatli yaratildi!");
  }

  function addBranch() {
    if (!newBranch.trim()) return;
    setBranches([
      ...branches,
      { id: Date.now(), name: newBranch, active: true },
    ]);
    setNewBranch("");
    setShowAddBranch(false);
  }

  /* -------------------- RENDER -------------------- */

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Settings className="w-6 h-6" />
        Sozlamalar
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* GENERAL SETTINGS */}
        <Card
          title="Umumiy sozlamalar"
          icon={<Globe className="w-5 h-5 text-blue-600" />}
        >
          <SettingRow label="Tizim tili">
            <select
              className="border rounded-md px-3 py-1 text-sm"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>O‘zbek</option>
              <option>Русский</option>
              <option>English</option>
            </select>
          </SettingRow>

          <SettingRow label="Valyuta">
            <select
              className="border rounded-md px-3 py-1 text-sm"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="UZS">UZS (so‘m)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </SettingRow>

          <SettingRow label="Qorong‘i rejim">
            <Switch value={darkMode} onChange={setDarkMode} />
          </SettingRow>
        </Card>

        {/* BRANCHES */}
        <Card
          title="Filial boshqaruvi"
          icon={<Store className="w-5 h-5 text-green-600" />}
        >
          <div className="space-y-3">
            {branches.map((b) => (
              <div key={b.id} className="flex justify-between items-center">
                <span>{b.name}</span>
                <span
                  onClick={() => toggleBranch(b.id)}
                  className={`text-xs cursor-pointer px-2 py-1 rounded ${
                    b.active
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {b.active ? "Aktiv" : "O‘chirilgan"}
                </span>
              </div>
            ))}
          </div>

          <button
            className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg"
            onClick={() => setShowAddBranch(true)}
          >
            <Plus size={16} /> Yangi filial qo‘shish
          </button>
        </Card>

        {/* SECURITY */}
        <Card
          title="Xavfsizlik"
          icon={<ShieldCheck className="w-5 h-5 text-purple-600" />}
        >
          <SettingRow label="2FA himoya">
            <Switch value={twoFA} onChange={setTwoFA} />
          </SettingRow>

          <SettingRow label="Avto-blok (5 daq)">
            <Switch value={autoLock} onChange={setAutoLock} />
          </SettingRow>

          <SettingRow label="Kirish loglarini ko‘rsatish">
            <Switch value={showLogs} onChange={setShowLogs} />
          </SettingRow>

          <button
            onClick={() => setShowPasswordModal(true)}
            className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg"
          >
            Parolni almashtirish
          </button>
        </Card>

        {/* BACKUP */}
        <Card
          title="Ma’lumotlar bazasi"
          icon={<Database className="w-5 h-5 text-orange-600" />}
        >
          <SettingRow label="Oxirgi backup">
            <span className="text-xs text-gray-500">{lastBackup}</span>
          </SettingRow>

          <SettingRow label="Backup rejimi">
            <select
              className="border rounded-md px-3 py-1 text-sm"
              value={backupMode}
              onChange={(e) => setBackupMode(e.target.value)}
            >
              <option value="daily">Har kuni</option>
              <option value="weekly">Har hafta</option>
              <option value="off">O‘chirilgan</option>
            </select>
          </SettingRow>

          <button
            className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg"
            onClick={createBackup}
          >
            Backup yaratish
          </button>

          <button className="w-full bg-gray-100 mt-2 text-gray-700 py-2 rounded-lg border">
            Backup yuklash
          </button>
        </Card>
      </div>

      {/* ADD BRANCH MODAL */}
      {showAddBranch && (
        <Modal
          title="Yangi filial qo‘shish"
          onClose={() => setShowAddBranch(false)}
        >
          <input
            className="border w-full p-2 rounded mb-4"
            placeholder="Filial nomi..."
            value={newBranch}
            onChange={(e) => setNewBranch(e.target.value)}
          />
          <button
            onClick={addBranch}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Saqlash
          </button>
        </Modal>
      )}

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <Modal
          title="Parolni almashtirish"
          onClose={() => setShowPasswordModal(false)}
        >
          <input
            className="border w-full p-2 rounded mb-2"
            placeholder="Eski parol"
          />
          <input
            className="border w-full p-2 rounded mb-2"
            placeholder="Yangi parol"
          />
          <input
            className="border w-full p-2 rounded mb-4"
            placeholder="Tasdiqlash"
          />

          <button className="w-full bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
            <Save size={16} /> Saqlash
          </button>
        </Modal>
      )}
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: any;
  children: any;
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
}

function SettingRow({ label, children }: any) {
  return (
    <div className="flex justify-between items-center mb-3">
      <span className="text-sm">{label}</span>
      {children}
    </div>
  );
}

function Switch({ value, onChange }: { value: boolean; onChange: any }) {
  return (
    <div
      onClick={() => onChange(!value)}
      className={`w-11 h-6 rounded-full p-1 flex items-center cursor-pointer transition ${
        value ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
          value ? "translate-x-5" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: any;
  children: any;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[350px] rounded-xl p-5 shadow-lg animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

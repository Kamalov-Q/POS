"use client";
import {
  LayoutDashboard,
  ShoppingCart,
  Boxes,
  Tags,
  Building2,
  Truck,
  ClipboardList,
  CreditCard,
  BarChart,
  Wallet,
  DollarSign,
  Users,
  ShieldCheck,
  Settings,
} from "lucide-react";

export default function Sidebar({
  setView,
  view,
}) {
  const items = [
    {
      section: "Asosiy",
      children: [
        { label: "Boshqaruv", icon: LayoutDashboard, view: "dashboard" },
        { label: "POS / Sotuv", icon: ShoppingCart, view: "pos" },
        { label: "Filiallar", icon: Building2, view: "branches" },
      ],
    },
    {
      section: "Mahsulotlar",
      children: [
        { label: "Barcha Mahsulotlar", icon: Boxes, view: "products" },
        { label: "Kategoriyalar", icon: Tags, view: "category" },
        { label: "Omborlar", icon: Building2, view: "warehouses" },
        { label: "Yetkazib Beruvchilar", icon: Truck, view: "suppliers" },
      ],
    },
    {
      section: "Hisobotlar",
      children: [
        { label: "Cheklar", icon: CreditCard, view: "receipts" },
        { label: "Statistika", icon: BarChart, view: "analytics" },
      ],
    },
    {
      section: "Moliya",
      children: [
        { label: "Kassa", icon: Wallet, view: "cashier" },
        { label: "To‘lovlar", icon: DollarSign, view: "payments" },
        { label: "Xarajatlar", icon: DollarSign, view: "expenses" },
        { label: "Foyda & Zarar", icon: BarChart, view: "profit-loss" },
      ],
    },
    {
      section: "Mijozlar",
      children: [
        { label: "Mijozlar", icon: Users, view: "customers" },
        { label: "Qarzdorlar", icon: DollarSign, view: "debtors" },
        { label: "Bonus Tizimi", icon: ShieldCheck, view: "loyalty" },
      ],
    },
    {
      section: "Xodimlar",
      children: [
        { label: "Xodimlar", icon: Users, view: "staff" },
        { label: "Rollar & Huquqlar", icon: ShieldCheck, view: "roles" },
        { label: "Ish Jadvali", icon: ClipboardList, view: "schedule" },
      ],
    },
    {
      section: "Sozlamalar",
      children: [
        { label: "Tizim Sozlamalari", icon: Settings, view: "settings" },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg p-4 overflow-auto">
      {items.map((section) => (
        <div key={section.section} className="mb-6">
          <p className="text-xs text-gray-500 uppercase mb-2">
            {section.section}
          </p>
          {section.children.map((item) => {
            const Icon = item.icon;
            const active = view === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setView(item.view)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1
                  ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>
      ))}
    </aside>
  );
}

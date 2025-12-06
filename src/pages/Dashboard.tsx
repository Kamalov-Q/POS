"use client";
import {
  BarChart3,
  ShoppingCart,
  Users,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      label: "Bugungi Sotuv",
      value: "1,240,000 so'm",
      icon: ShoppingCart,
      trend: "+12%",
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Foyda",
      value: "420,000 so'm",
      icon: DollarSign,
      trend: "+8%",
      color: "from-green-500 to-green-600",
    },
    {
      label: "Yangi Mijozlar",
      value: "32",
      icon: Users,
      trend: "+5%",
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Buyurtmalar",
      value: "158",
      icon: BarChart3,
      trend: "+19%",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const recentSales = [
    { id: 1, customer: "Ali", total: "240,000", date: "14:20" },
    { id: 2, customer: "Aziza", total: "120,000", date: "14:05" },
    { id: 3, customer: "Jahongir", total: "450,000", date: "13:50" },
  ];

  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6 tracking-tight">
        Boshqaruv Paneli
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-14 w-14 rounded-xl bg-linear-to-br ${s.color} flex items-center justify-center text-white shadow`}
                >
                  <Icon size={32} />
                </div>

                <div>
                  <p className="text-sm text-gray-500 p-2">{s.label}</p>
                  <p className="text-xl font-semibold">{s.value}</p>

                  {/* Trend */}
                  <p className="text-xs flex items-center gap-1 text-green-600 font-medium mt-1">
                    <ArrowUpRight size={14} /> {s.trend}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Sales */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="font-semibold text-lg mb-4">So‘nggi Sotuvlar</h2>

        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b">
              <th className="pb-2">ID</th>
              <th className="pb-2">Mijoz</th>
              <th className="pb-2">Summasi</th>
              <th className="pb-2">Vaqti</th>
            </tr>
          </thead>

          <tbody>
            {recentSales.map((s) => (
              <tr
                key={s.id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="py-3">{s.id}</td>
                <td>{s.customer}</td>
                <td className="font-medium">{s.total} so'm</td>
                <td>{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

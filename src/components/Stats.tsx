import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function Stats() {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "year"
  >("month");
  const [showExportMenu, setShowExportMenu] = useState(false);

  const salesData = [
    { name: "Dush", savdo: 2400000, xarajat: 1800000 },
    { name: "Sesh", savdo: 3200000, xarajat: 2100000 },
    { name: "Chor", savdo: 2800000, xarajat: 1900000 },
    { name: "Pay", savdo: 3500000, xarajat: 2300000 },
    { name: "Juma", savdo: 4200000, xarajat: 2600000 },
    { name: "Shan", savdo: 5100000, xarajat: 2800000 },
    { name: "Yak", savdo: 4800000, xarajat: 2400000 },
  ];

  const categoryData = [
    { name: "Ichimliklar", value: 35, color: "#3B82F6" },
    { name: "Oziq-ovqat", value: 25, color: "#10B981" },
    { name: "Sut mahsulotlari", value: 20, color: "#F59E0B" },
    { name: "Nonvoylar", value: 12, color: "#EF4444" },
    { name: "Boshqalar", value: 8, color: "#8B5CF6" },
  ];

  const monthlyTrend = [
    { month: "Yan", savdo: 45000000, foyda: 12000000 },
    { month: "Fev", savdo: 52000000, foyda: 15000000 },
    { month: "Mar", savdo: 48000000, foyda: 13000000 },
    { month: "Apr", savdo: 61000000, foyda: 18000000 },
    { month: "May", savdo: 55000000, foyda: 16000000 },
    { month: "Iyun", savdo: 67000000, foyda: 20000000 },
    { month: "Iyul", savdo: 73000000, foyda: 22000000 },
    { month: "Avg", savdo: 69000000, foyda: 21000000 },
    { month: "Sen", savdo: 78000000, foyda: 24000000 },
    { month: "Okt", savdo: 82000000, foyda: 26000000 },
    { month: "Noy", savdo: 88000000, foyda: 28000000 },
    { month: "Dek", savdo: 95000000, foyda: 32000000 },
  ];

  const topProducts = [
    { name: "Cola 1.5L", sold: 450, revenue: 5400000, trend: 12 },
    { name: "Non 400gr", sold: 380, revenue: 1330000, trend: 8 },
    { name: "Sut 1L", sold: 320, revenue: 2720000, trend: -3 },
    { name: "Guruch 1kg", sold: 290, revenue: 4350000, trend: 15 },
    { name: "Choy 200gr", sold: 250, revenue: 4500000, trend: 5 },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-gray-900 mb-2">Statistika va hisobotlar</h2>
            <p className="text-gray-600">Biznes ko'rsatkichlari tahlili</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedPeriod("week")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedPeriod === "week"
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Haftalik
            </button>
            <button
              onClick={() => setSelectedPeriod("month")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedPeriod === "month"
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Oylik
            </button>
            <button
              onClick={() => setSelectedPeriod("year")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedPeriod === "year"
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Yillik
            </button>
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Eksport
              </button>
              {showExportMenu && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 w-40">
                  <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                    PDF
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                    Excel
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                    CSV
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUp className="w-4 h-4" />
                <span>18.2%</span>
              </div>
            </div>
            <p className="text-gray-600 mb-1">Jami savdo</p>
            <p className="text-gray-900">95.2M UZS</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUp className="w-4 h-4" />
                <span>22.5%</span>
              </div>
            </div>
            <p className="text-gray-600 mb-1">Sof foyda</p>
            <p className="text-gray-900">32.0M UZS</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUp className="w-4 h-4" />
                <span>8.1%</span>
              </div>
            </div>
            <p className="text-gray-600 mb-1">Mijozlar</p>
            <p className="text-gray-900">1,847 ta</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex items-center gap-1 text-red-600">
                <ArrowDown className="w-4 h-4" />
                <span>3.2%</span>
              </div>
            </div>
            <p className="text-gray-600 mb-1">Sotilgan mahsulot</p>
            <p className="text-gray-900">2,456 ta</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900">Yillik trend</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded"></div>
                  <span className="text-gray-600">Savdo</span>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <span className="text-gray-600">Foyda</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="savdo"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="foyda"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6">Kategoriyalar bo'yicha</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6">Haftalik savdo va xarajat</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="savdo" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="xarajat" fill="#EF4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6">Top mahsulotlar</h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="pb-4 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-900">{product.name}</span>
                        <span
                          className={`flex items-center gap-1 ${
                            product.trend > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {product.trend > 0 ? (
                            <ArrowUp className="w-3 h-3" />
                          ) : (
                            <ArrowDown className="w-3 h-3" />
                          )}
                          <span>{Math.abs(product.trend)}%</span>
                        </span>
                      </div>
                      <p className="text-gray-600">{product.sold} ta sotildi</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900">
                        {(product.revenue / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(product.sold / 450) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

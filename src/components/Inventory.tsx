import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from "lucide-react";

interface Transaction {
  id: number;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string;
  date: string;
  paymentMethod: string;
}

export function Inventory() {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "today" | "week" | "month" | "year"
  >("today");
  const [activeTab, setActiveTab] = useState<"all" | "income" | "expense">(
    "all"
  );
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const transactions: Transaction[] = [
    {
      id: 1,
      type: "income",
      category: "Savdo",
      amount: 2500000,
      description: "Kunlik savdo",
      date: "2024-12-04 14:30",
      paymentMethod: "Naqd",
    },
    {
      id: 2,
      type: "expense",
      category: "Xodimlar",
      amount: 5000000,
      description: "Oylik maosh",
      date: "2024-12-04 10:00",
      paymentMethod: "Bank o'tkazmasi",
    },
    {
      id: 3,
      type: "income",
      category: "Savdo",
      amount: 1800000,
      description: "Online buyurtmalar",
      date: "2024-12-04 13:15",
      paymentMethod: "Karta",
    },
    {
      id: 4,
      type: "expense",
      category: "Ombor",
      amount: 3200000,
      description: "Mahsulot xaridi",
      date: "2024-12-04 09:30",
      paymentMethod: "Bank o'tkazmasi",
    },
    {
      id: 5,
      type: "income",
      category: "Savdo",
      amount: 950000,
      description: "Chakana savdo",
      date: "2024-12-04 16:45",
      paymentMethod: "Naqd",
    },
    {
      id: 6,
      type: "expense",
      category: "Kommunal",
      amount: 850000,
      description: "Elektr energiya",
      date: "2024-12-03 11:20",
      paymentMethod: "Bank o'tkazmasi",
    },
    {
      id: 7,
      type: "income",
      category: "Savdo",
      amount: 3100000,
      description: "Ulgurji savdo",
      date: "2024-12-03 15:00",
      paymentMethod: "Bank o'tkazmasi",
    },
    {
      id: 8,
      type: "expense",
      category: "Transport",
      amount: 450000,
      description: "Yetkazib berish",
      date: "2024-12-03 08:30",
      paymentMethod: "Naqd",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === "income") return transaction.type === "income";
    if (activeTab === "expense") return transaction.type === "expense";
    return true;
  });

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const cashPayments = transactions
    .filter((t) => t.paymentMethod === "Naqd")
    .reduce(
      (sum, t) => (t.type === "income" ? sum + t.amount : sum - t.amount),
      0
    );

  const cardPayments = transactions
    .filter((t) => t.paymentMethod === "Karta")
    .reduce(
      (sum, t) => (t.type === "income" ? sum + t.amount : sum - t.amount),
      0
    );

  const handleAddTransaction = (type: "income" | "expense") => {
    setShowIncomeModal(true);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-gray-900 mb-2">Moliya boshqaruvi</h2>
            <p className="text-gray-600">Daromad va xarajatlar</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors relative"
            >
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Bugun</span>
              {showDatePicker && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>
              )}
            </button>
            <button
              onClick={() => handleAddTransaction("income")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowUpRight className="w-5 h-5" />
              Kirim qo'shish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-1">Balans</p>
            <p className="text-gray-900">
              {(balance / 1000000).toFixed(1)}M UZS
            </p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600">+12.5%</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-1">Daromad</p>
            <p className="text-gray-900">
              {(totalIncome / 1000000).toFixed(1)}M UZS
            </p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600">+8.2%</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-1">Xarajat</p>
            <p className="text-gray-900">
              {(totalExpense / 1000000).toFixed(1)}M UZS
            </p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingDown className="w-4 h-4 text-red-600" />
              <span className="text-red-600">-3.1%</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-1">Tranzaksiyalar</p>
            <p className="text-gray-900">{transactions.length} ta</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-gray-600">Bugun</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900">Tranzaksiyalar tarixi</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "all"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Barchasi
                </button>
                <button
                  onClick={() => setActiveTab("income")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "income"
                      ? "bg-green-100 text-green-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Kirim
                </button>
                <button
                  onClick={() => setActiveTab("expense")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "expense"
                      ? "bg-red-100 text-red-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Chiqim
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    transaction.type === "income"
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === "income"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUpRight
                          className={`w-5 h-5 ${
                            transaction.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-gray-900">{transaction.description}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-gray-600">
                          {transaction.category}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">
                          {transaction.paymentMethod}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">
                          {transaction.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {transaction.amount.toLocaleString()} UZS
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">To'lov usullari</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">Naqd pul</span>
                    </div>
                    <span className="text-gray-900">
                      {(cashPayments / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(cashPayments / totalIncome) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">Plastik karta</span>
                    </div>
                    <span className="text-gray-900">
                      {(cardPayments / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${(cardPayments / totalIncome) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">Bank o'tkazmasi</span>
                    </div>
                    <span className="text-gray-900">
                      {(
                        (totalIncome - cashPayments - cardPayments) /
                        1000000
                      ).toFixed(1)}
                      M
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${
                          ((totalIncome - cashPayments - cardPayments) /
                            totalIncome) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Xarajat kategoriyalari</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Xodimlar</span>
                  <span className="text-gray-900">5.0M UZS</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Ombor</span>
                  <span className="text-gray-900">3.2M UZS</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Kommunal</span>
                  <span className="text-gray-900">850K UZS</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Transport</span>
                  <span className="text-gray-900">450K UZS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showIncomeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl">
            <h3 className="text-gray-900 mb-6">Tranzaksiya qo'shish</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Turi</label>
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 border-2 border-green-500 bg-green-50 text-green-700 rounded-lg">
                    <div className="flex items-center justify-center gap-2">
                      <ArrowUpRight className="w-4 h-4" />
                      Kirim
                    </div>
                  </button>
                  <button className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-center gap-2">
                      <ArrowDownRight className="w-4 h-4" />
                      Chiqim
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Kategoriya</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Savdo</option>
                  <option>Xodimlar</option>
                  <option>Ombor</option>
                  <option>Kommunal</option>
                  <option>Transport</option>
                  <option>Boshqa</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Summa (UZS)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Izoh</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Qo'shimcha ma'lumot..."
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">To'lov usuli</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Naqd</option>
                  <option>Karta</option>
                  <option>Bank o'tkazmasi</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Sana</label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={new Date().toISOString().slice(0, 16)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowIncomeModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => setShowIncomeModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import {
  Package,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  warehouse: string;
  lastUpdate: string;
}

export function Warehouse() {
  const [activeTab, setActiveTab] = useState<
    "all" | "low-stock" | "out-of-stock"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [stockAction, setStockAction] = useState<"in" | "out">("in");
  const [stockAmount, setStockAmount] = useState("");

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Cola 1.5L",
      category: "Ichimliklar",
      stock: 150,
      minStock: 50,
      price: 12000,
      warehouse: "Asosiy ombor",
      lastUpdate: "2024-12-04",
    },
    {
      id: 2,
      name: "Non 400gr",
      category: "Nonvoylar",
      stock: 25,
      minStock: 30,
      price: 3500,
      warehouse: "Asosiy ombor",
      lastUpdate: "2024-12-04",
    },
    {
      id: 3,
      name: "Sut 1L",
      category: "Sut mahsulotlari",
      stock: 0,
      minStock: 20,
      price: 8500,
      warehouse: "Sovuq ombor",
      lastUpdate: "2024-12-03",
    },
    {
      id: 4,
      name: "Guruch 1kg",
      category: "Don mahsulotlari",
      stock: 200,
      minStock: 100,
      price: 15000,
      warehouse: "Asosiy ombor",
      lastUpdate: "2024-12-04",
    },
    {
      id: 5,
      name: "Yog' 1L",
      category: "Oziq-ovqat",
      stock: 15,
      minStock: 25,
      price: 22000,
      warehouse: "Asosiy ombor",
      lastUpdate: "2024-12-04",
    },
    {
      id: 6,
      name: "Choy 200gr",
      category: "Ichimliklar",
      stock: 80,
      minStock: 30,
      price: 18000,
      warehouse: "Asosiy ombor",
      lastUpdate: "2024-12-04",
    },
    {
      id: 7,
      name: "Shakar 1kg",
      category: "Don mahsulotlari",
      stock: 5,
      minStock: 50,
      price: 11000,
      warehouse: "Asosiy ombor",
      lastUpdate: "2024-12-03",
    },
    {
      id: 8,
      name: "Tuxum 10ta",
      category: "Sut mahsulotlari",
      stock: 45,
      minStock: 20,
      price: 16000,
      warehouse: "Sovuq ombor",
      lastUpdate: "2024-12-04",
    },
  ]);

  const warehouses = ["all", "Asosiy ombor", "Sovuq ombor", "Quruq ombor"];

  const filteredProducts = products
    .filter((product) => {
      if (activeTab === "low-stock")
        return product.stock > 0 && product.stock < product.minStock;
      if (activeTab === "out-of-stock") return product.stock === 0;
      return true;
    })
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        selectedWarehouse === "all" || product.warehouse === selectedWarehouse
    );

  const totalProducts = products.length;
  const lowStockCount = products.filter(
    (p) => p.stock > 0 && p.stock < p.minStock
  ).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const totalValue = products.reduce((sum, p) => sum + p.stock * p.price, 0);

  const handleStockAdjustment = (product: Product, action: "in" | "out") => {
    setSelectedProduct(product);
    setStockAction(action);
    setStockAmount("");
    setShowStockModal(true);
  };

  const handleSaveStock = () => {
    if (selectedProduct && stockAmount) {
      const amount = parseInt(stockAmount);
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                stock:
                  stockAction === "in"
                    ? p.stock + amount
                    : Math.max(0, p.stock - amount),
                lastUpdate: new Date().toISOString().split("T")[0],
              }
            : p
        )
      );
      setShowStockModal(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-gray-900 mb-2">Omborlar boshqaruvi</h2>
            <p className="text-gray-600">Mahsulotlar va inventarizatsiya</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            Mahsulot qo'shish
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-1">Jami mahsulotlar</p>
            <p className="text-gray-900">{totalProducts} ta</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-1">Kam qolgan</p>
            <p className="text-gray-900">{lowStockCount} ta</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-1">Tugagan</p>
            <p className="text-gray-900">{outOfStockCount} ta</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-1">Umumiy qiymat</p>
            <p className="text-gray-900">
              {(totalValue / 1000000).toFixed(1)}M UZS
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Mahsulot qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Barcha omborlar</option>
              {warehouses
                .filter((w) => w !== "all")
                .map((warehouse) => (
                  <option key={warehouse} value={warehouse}>
                    {warehouse}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === "all"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Barchasi ({totalProducts})
            </button>
            <button
              onClick={() => setActiveTab("low-stock")}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === "low-stock"
                  ? "border-yellow-600 text-yellow-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Kam qolgan ({lowStockCount})
            </button>
            <button
              onClick={() => setActiveTab("out-of-stock")}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === "out-of-stock"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Tugagan ({outOfStockCount})
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600">
                    Mahsulot
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600">
                    Kategoriya
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600">Ombor</th>
                  <th className="text-left py-3 px-4 text-gray-600">Zaxira</th>
                  <th className="text-left py-3 px-4 text-gray-600">Narx</th>
                  <th className="text-left py-3 px-4 text-gray-600">Holat</th>
                  <th className="text-left py-3 px-4 text-gray-600">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const isLowStock =
                    product.stock > 0 && product.stock < product.minStock;
                  const isOutOfStock = product.stock === 0;

                  return (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4 text-gray-900">
                        {product.name}
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {product.category}
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {product.warehouse}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`${
                            isOutOfStock
                              ? "text-red-600"
                              : isLowStock
                              ? "text-yellow-600"
                              : "text-gray-900"
                          }`}
                        >
                          {product.stock} / {product.minStock}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {product.price.toLocaleString()} UZS
                      </td>
                      <td className="py-4 px-4">
                        {isOutOfStock ? (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">
                            Tugagan
                          </span>
                        ) : isLowStock ? (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                            Kam
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                            Yetarli
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                            Kirish
                          </button>
                          <button className="flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <ArrowDownRight className="w-4 h-4" />
                            Chiqim
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">So'nggi harakatlar</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <ArrowUpRight className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-gray-900">Cola 1.5L</p>
                    <p className="text-gray-600">Kirish: 50 ta</p>
                  </div>
                </div>
                <span className="text-gray-600">14:30</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <ArrowDownRight className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-gray-900">Guruch 1kg</p>
                    <p className="text-gray-600">Chiqim: 30 ta</p>
                  </div>
                </div>
                <span className="text-gray-600">13:15</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <ArrowUpRight className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-gray-900">Choy 200gr</p>
                    <p className="text-gray-600">Kirish: 40 ta</p>
                  </div>
                </div>
                <span className="text-gray-600">11:45</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Omborlar ma'lumoti</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Asosiy ombor</span>
                  <span className="text-gray-900">6 mahsulot</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Sovuq ombor</span>
                  <span className="text-gray-900">2 mahsulot</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Quruq ombor</span>
                  <span className="text-gray-900">0 mahsulot</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-400 h-2 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-gray-900 mb-6">Yangi mahsulot qo'shish</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Mahsulot nomi
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masalan: Cola 1.5L"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Kategoriya</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Ichimliklar</option>
                  <option>Oziq-ovqat</option>
                  <option>Sut mahsulotlari</option>
                  <option>Nonvoylar</option>
                  <option>Don mahsulotlari</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Ombor</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Asosiy ombor</option>
                  <option>Sovuq ombor</option>
                  <option>Quruq ombor</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Narx (UZS)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="15000"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Boshlang'ich zaxira
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Minimal zaxira
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="50"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Qo'shish
              </button>
            </div>
          </div>
        </div>
      )}

      {showStockModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-gray-900 mb-4">
              {stockAction === "in" ? "Tovar kirimi" : "Tovar chiqimi"}
            </h3>

            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-1">Mahsulot</p>
              <p className="text-gray-900">{selectedProduct.name}</p>
              <p className="text-gray-600 mt-2">
                Joriy zaxira: {selectedProduct.stock} ta
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                {stockAction === "in"
                  ? "Qo'shiladigan miqdor"
                  : "Chiqariladigan miqdor"}
              </label>
              <input
                type="number"
                value={stockAmount}
                onChange={(e) => setStockAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
              />
            </div>

            {stockAmount && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-600">Yangi zaxira:</p>
                <p className="text-gray-900">
                  {stockAction === "in"
                    ? selectedProduct.stock + parseInt(stockAmount || "0")
                    : Math.max(
                        0,
                        selectedProduct.stock - parseInt(stockAmount || "0")
                      )}{" "}
                  ta
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowStockModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSaveStock}
                className={`px-4 py-2 text-white rounded-lg transition-colors ${
                  stockAction === "in"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Tasdiqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

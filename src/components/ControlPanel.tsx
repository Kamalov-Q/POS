import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export function ControlPanel() {
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [showNotif, setShowNotif] = useState(false);

  const categories = [
    "Barchasi",
    "Ichimlik",
    "Shirinlik",
    "Non",
    "Go‘sht",
    "Sovuq",
    "Kundalik",
    "Sabzavot",
    "Guruch",
  ];

  const products = [
    { id: 1, name: "Choy 100 gr", price: 12000, category: "Ichimlik" },
    { id: 2, name: "Shokolad", price: 8000, category: "Shirinlik" },
    { id: 3, name: "Sut 1L", price: 9000, category: "Ichimlik" },
    { id: 4, name: "Qalam", price: 2000, category: "Kundalik" },
    { id: 5, name: "Sabun", price: 6000, category: "Kundalik" },
    { id: 6, name: "Kola 330ml", price: 10000, category: "Ichimlik" },
    { id: 7, name: "Pepsi 1L", price: 14000, category: "Ichimlik" },
    { id: 8, name: "Fanta 500ml", price: 9000, category: "Ichimlik" },
    { id: 9, name: "Baton Non", price: 3500, category: "Non" },
    { id: 10, name: "Buxanka Non", price: 5000, category: "Non" },
    { id: 11, name: "Go‘sht 1kg", price: 85000, category: "Go‘sht" },
    { id: 12, name: "Tovuq 1kg", price: 30000, category: "Go‘sht" },
    { id: 13, name: "Pomidor 1kg", price: 9000, category: "Sabzavot" },
    { id: 14, name: "Bodring 1kg", price: 7000, category: "Sabzavot" },
    { id: 15, name: "Guruch 1kg", price: 16000, category: "Guruch" },
    { id: 16, name: "Guruch Lazer 1kg", price: 21000, category: "Guruch" },
    { id: 17, name: "Muzqaymoq Classic", price: 6000, category: "Sovuq" },
    { id: 18, name: "Muzqaymoq Choco", price: 7000, category: "Sovuq" },
    { id: 19, name: "Pechenye", price: 11000, category: "Shirinlik" },
    { id: 20, name: "Vafli", price: 9000, category: "Shirinlik" },
    { id: 21, name: "Limonad", price: 8000, category: "Ichimlik" },
    { id: 22, name: "Chips Lay’s", price: 15000, category: "Shirinlik" },
    { id: 23, name: "Kurka 1kg", price: 35000, category: "Go‘sht" },
    { id: 24, name: "Coca 1.5L", price: 15000, category: "Ichimlik" },
    { id: 25, name: "Energetik", price: 17000, category: "Ichimlik" },
    { id: 26, name: "Yuvish kukuni 1kg", price: 24000, category: "Kundalik" },
    { id: 27, name: "Cherevichka Non", price: 4500, category: "Non" },
    { id: 28, name: "Smetana 500gr", price: 16000, category: "Sovuq" },
    { id: 29, name: "Yogurt 1L", price: 11000, category: "Sovuq" },
    { id: 30, name: "Pishloq", price: 30000, category: "Sovuq" },
  ];

  const filteredProducts =
    selectedCategory === "Barchasi"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const addToCart = (p: any) => {
    setCart([...cart, p]);
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 1200);
  };

  const removeItem = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* LEFT MAIN AREA */}
        <div className="col-span-9 space-y-6">
          {/* HEADER */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Bugungi savdo", value: "0 so’m" },
              { label: "Omonatdagi mahsulot", value: "3 ta" },
              { label: "Jami mahsulot", value: products.length + " ta" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl border shadow-sm text-center"
              >
                <p className="text-gray-600">{stat.label}</p>
                <p className="text-xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* CATEGORY FILTER */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-5 py-2 rounded-xl border transition
                  ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white border-blue-700 shadow"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                className="bg-white group border rounded-xl p-4 shadow-sm 
                  hover:shadow-md hover:border-blue-300 transition text-left active:scale-[0.98]"
              >
                <div className="text-gray-900 font-semibold mb-1">{p.name}</div>
                <div className="text-gray-600">
                  {p.price.toLocaleString()} so’m
                </div>

                <div className="mt-3 flex justify-end">
                  <Plus className="h-5 w-5 text-blue-600 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CART */}
        <div className="col-span-3">
          <div className="bg-white rounded-xl border shadow-sm p-4 h-full flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Savatcha
            </h3>

            <div className="space-y-3 flex-1 overflow-y-auto pr-2">
              {cart.length === 0 && (
                <p className="text-gray-500 text-center mt-10">
                  Savatcha bo‘sh
                </p>
              )}

              {cart.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-gray-50 border rounded-lg p-2"
                >
                  <div>
                    <p className="text-gray-900 font-medium">{item.name}</p>
                    <p className="text-gray-600 text-sm">{item.price} so’m</p>
                  </div>
                  <button
                    onClick={() => removeItem(i)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* CART FOOTER */}
            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between text-gray-900 font-semibold mb-3">
                <span>Jami:</span>
                <span>
                  {cart.reduce((a, b) => a + b.price, 0).toLocaleString()} so’m
                </span>
              </div>

              <button
                className="w-full py-3 bg-blue-600 text-white rounded-xl 
                hover:bg-blue-700 transition font-medium text-lg shadow-sm active:scale-[0.98]"
              >
                To‘lov
              </button>

              <button
                onClick={() => setCart([])}
                className="w-full mt-2 py-3 bg-gray-200 text-gray-800 rounded-xl 
                hover:bg-gray-300 transition font-medium shadow-sm active:scale-[0.98]"
              >
                Tozalash
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP */}
      {showNotif && (
        <div
          className="fixed bottom-6 right-6 bg-green-600 text-white 
          px-4 py-2 rounded-xl shadow-lg animate-fade-in"
        >
          Savatchaga qo‘shildi
        </div>
      )}
    </div>
  );
}

"use client";

import BarcodeScanner from "@/components/BarcodeScanner";
import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  sku?: string;
  category?: string;
  img?: string;
};

export default function POSPage({
  onAddToCart,
}: {
  onAddToCart?: (p: Product) => void;
}) {
  const initialProducts: Product[] = [
    {
      id: 1,
      name: "Coca Cola 1L",
      price: 9000,
      sku: "COKE1000",
      category: "Ichimliklar",
      img: "https://picsum.photos/seed/coke/320/240",
    },
    {
      id: 2,
      name: "Non",
      price: 4000,
      sku: "BREAD01",
      category: "Non",
      img: "https://picsum.photos/seed/bread/320/240",
    },
    {
      id: 3,
      name: "Kartoshka 1kg",
      price: 6000,
      sku: "POT1KG",
      category: "Sabzavot",
      img: "https://picsum.photos/seed/potato/320/240",
    },
    {
      id: 4,
      name: "Lavash",
      price: 17000,
      sku: "LAVASH01",
      category: "Taomlar",
      img: "https://picsum.photos/seed/lavash/320/240",
    },
    {
      id: 5,
      name: "Pepsi 1.5L",
      price: 11000,
      sku: "PEP1500",
      category: "Ichimliklar",
      img: "https://picsum.photos/seed/pepsi/320/240",
    },
    {
      id: 6,
      name: "Shokolad",
      price: 8000,
      sku: "CHOC01",
      category: "Shirinliklar",
      img: "https://picsum.photos/seed/choc/320/240",
    },
    {
      id: 7,
      name: "Sut 1L",
      price: 8000,
      sku: "MILK1L",
      category: "Sut mahsulotlari",
      img: "https://picsum.photos/seed/milk/320/240",
    },
  ];

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<(Product & { qty: number })[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);

  // UI helpers
  const [toast, setToast] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [ordersCount, setOrdersCount] = useState<number>(0);

  function pushToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  }
  function pushTranscript(msg: string) {
    setTranscript((s) => [msg, ...s].slice(0, 12));
  }

  // ----------- cart operations ----------
  function addToCart(p: Product) {
    setCart((prev) => {
      const found = prev.find((x) => x.id === p.id);
      if (found) {
        return prev.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x));
      }
      pushToast(`${p.name} qo'shildi`);
      const next = [...prev, { ...p, qty: 1 }];
      // also notify parent App (so the App-level cart remains in sync)
      onAddToCart?.(p);
      return next;
    });
  }

  function incQty(id: number) {
    setCart((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))
    );
  }
  function decQty(id: number) {
    setCart((prev) =>
      prev.flatMap((x) =>
        x.id === id ? (x.qty === 1 ? [] : [{ ...x, qty: x.qty - 1 }]) : [x]
      )
    );
  }
  function removeItem(id: number) {
    setCart((prev) => prev.filter((x) => x.id !== id));
  }
  function clearCart() {
    setCart([]);
    pushToast("Savat tozalandi");
  }

  // total
  const total = useMemo(
    () => cart.reduce((s, i) => s + i.price * i.qty, 0),
    [cart]
  );

  // ----------- receipt / checkout ----------
  function checkout() {
    if (cart.length === 0) {
      pushToast("Savat bo'sh");
      return;
    }
    // update analytics
    setTotalSales((s) => s + total);
    setOrdersCount((n) => n + 1);
    setReceiptOpen(true);
    pushTranscript("Checkout - voice/manual");
  }

  function confirmCheckout() {
    setReceiptOpen(false);
    setCart([]);
    pushToast("To'lov qabul qilindi");
  }

  // ----------- product helpers ----------
  function findProductByName(name: string) {
    const t = (name || "").toLowerCase().trim();
    if (!t) return null;
    // SKU direct match
    const bySku = products.find((p) => p.sku?.toLowerCase() === t);
    if (bySku) return bySku;
    const byExact = products.find((p) => p.name.toLowerCase() === t);
    if (byExact) return byExact;
    const byInclude = products.find((p) => p.name.toLowerCase().includes(t));
    if (byInclude) return byInclude;
    // partial match first word
    return products.find((p) =>
      p.name.toLowerCase().startsWith(t.split(" ")[0])
    );
  }

  // ----------- voice & barcode global events ----------
  useEffect(() => {
    function onAdd(e: any) {
      const name = (e.detail?.name || "").toString();
      pushTranscript(`voice add: ${name}`);
      const p = findProductByName(name);
      if (p) addToCart(p);
      else pushToast("Mahsulot topilmadi");
    }
    function onClear() {
      pushTranscript("voice clear cart");
      clearCart();
    }
    function onCheckout(e: any) {
      pushTranscript("voice checkout");
      checkout();
    }
    function onPriceChange(e: any) {
      const { name, price } = e.detail || {};
      if (!name || !price) {
        pushToast("Narx yoki mahsulot nomi yo'q");
        return;
      }
      const productName = name.toString().toLowerCase().trim();
      setProducts((prev) =>
        prev.map((p) =>
          p.name.toLowerCase().includes(productName) ? { ...p, price } : p
        )
      );
      pushTranscript(`price ${name} -> ${price}`);
      pushToast("Narx o'zgartirildi");
    }
    function onBarcode(e: any) {
      const code = e?.detail?.code ?? e;
      pushTranscript(`barcode: ${code}`);
      // try to find by sku
      const found = products.find(
        (p) =>
          p.sku?.toString().toLowerCase() ===
            (code || "").toString().toLowerCase() || p.sku === code
      );
      if (found) addToCart(found);
      else pushToast("Barcode bilan mahsulot topilmadi");
    }

    window.addEventListener("cart-add", onAdd);
    window.addEventListener("cart-clear", onClear);
    window.addEventListener("voice-checkout", onCheckout);
    window.addEventListener("price-change", onPriceChange);
    window.addEventListener("barcode-detected", onBarcode as EventListener);

    return () => {
      window.removeEventListener("cart-add", onAdd);
      window.removeEventListener("cart-clear", onClear);
      window.removeEventListener("voice-checkout", onCheckout);
      window.removeEventListener("price-change", onPriceChange);
      window.removeEventListener(
        "barcode-detected",
        onBarcode as EventListener
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, cart]);

  // ----------- filtered products ----------
  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category || "Barchasi"))),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = products;
    if (category) list = list.filter((p) => p.category === category);
    if (q)
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q)
      );
    return list;
  }, [products, search, category]);

  // manual barcode input helper
  function handleManualBarcode() {
    const code = prompt("Enter barcode / SKU");
    if (!code) return;
    window.dispatchEvent(
      new CustomEvent("barcode-detected", { detail: { code } })
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Left: products (2/3) */}
      <div className="col-span-2">
        {/* Top controls */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold">POS</h2>
            <div className="text-sm text-gray-500">
              Hotword: "Kassa" — say `kassa` then command
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products or SKU..."
              className="pl-3 pr-3 py-2 border rounded w-72"
            />
            <button
              className="px-3 py-2 bg-gray-100 rounded"
              onClick={() => {
                setProducts(initialProducts);
                setCategory(null);
                setSearch("");
              }}
            >
              Reset
            </button>
            <button
              className="px-3 py-2 bg-blue-600 text-white rounded"
              onClick={() => setScannerOpen(true)}
            >
              Barcode
            </button>
          </div>
        </div>

        {/* categories */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          <button
            onClick={() => {
              setCategory(null);
              setProducts(initialProducts);
            }}
            className={`px-3 py-2 rounded ${
              category === null ? "bg-blue-50" : "hover:bg-gray-100"
            }`}
          >
            Barchasi
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCategory(c);
                setSearch("");
              }}
              className={`px-3 py-2 rounded ${
                category === c ? "bg-blue-50" : "hover:bg-gray-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* products grid */}
        <div className="grid grid-cols-3 gap-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg p-4 shadow flex flex-col justify-between"
            >
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                className="w-full h-32 object-cover rounded mb-3"
              />
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-gray-500">{p.category ?? ""}</div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="font-bold">{p.price.toLocaleString()} so'm</div>
                <button
                  onClick={() => addToCart(p)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Qo'shish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: cart */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="font-bold text-lg mb-2">Savat</h2>

        {cart.length === 0 && <p className="text-gray-500">Savat bo‘sh</p>}

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm">{item.price.toLocaleString()} so'm</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="px-2 bg-gray-200 rounded"
                onClick={() => decQty(item.id)}
              >
                -
              </button>
              <span>{item.qty}</span>
              <button
                className="px-2 bg-gray-200 rounded"
                onClick={() => incQty(item.id)}
              >
                +
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 ml-2"
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        {/* Checkout */}
        <div className="mt-4 pt-4 border-t">
          <p className="font-bold text-xl mb-2">
            {total.toLocaleString()} so'm
          </p>
          <div className="flex gap-2">
            <button
              onClick={checkout}
              className="flex-1 bg-green-600 text-white py-2 rounded"
            >
              To'lov
            </button>
            <button
              onClick={clearCart}
              className="flex-1 bg-gray-100 py-2 rounded"
            >
              Tozalash
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <div>Jami sotuv: {totalSales.toLocaleString()} so'm</div>
            <div>Buyurtmalar: {ordersCount}</div>
          </div>

          <div className="mt-4">
            <div className="font-semibold mb-2">Oxirgi buyruqlar</div>
            <ul className="text-sm text-gray-600 max-h-32 overflow-auto">
              {transcript.length ? (
                transcript.map((t, i) => <li key={i}>{t}</li>)
              ) : (
                <li className="text-gray-400">Hech narsa</li>
              )}
            </ul>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => {
                setScannerOpen((s) => !s);
              }}
              className="flex-1 bg-white border py-2 rounded"
            >
              Barcode Scanner
            </button>
            <button
              onClick={handleManualBarcode}
              className="flex-1 bg-white border py-2 rounded"
            >
              Manual SKU
            </button>
          </div>
        </div>
      </div>

      {/* scanner modal */}
      {scannerOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow w-[720px]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Barcode Scanner</h3>
              <button
                onClick={() => setScannerOpen(false)}
                className="text-sm text-gray-500"
              >
                Close
              </button>
            </div>

            <BarcodeScanner
              onDetect={(code) => {
                window.dispatchEvent(
                  new CustomEvent("barcode-detected", { detail: { code } })
                );
                pushToast(`Barcode: ${code}`);
                setScannerOpen(false);
              }}
            />

            <div className="mt-3 text-sm text-gray-500">
              If scanning fails, use Manual SKU.
            </div>
          </div>
        </div>
      )}

      {/* receipt modal */}
      {receiptOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-[560px]">
            <h3 className="font-bold text-lg mb-3">Chek</h3>
            <div className="space-y-2 max-h-64 overflow-auto">
              {cart.map((it) => (
                <div key={it.id} className="flex justify-between">
                  <div>
                    {it.name} x {it.qty}
                  </div>
                  <div>{(it.price * it.qty).toLocaleString()} so'm</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between font-bold">
              <div>Jami</div>
              <div>{total.toLocaleString()} so'm</div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={confirmCheckout}
                className="flex-1 bg-green-600 text-white py-2 rounded"
              >
                Tasdiqlash
              </button>
              <button
                onClick={() => setReceiptOpen(false)}
                className="flex-1 bg-gray-200 py-2 rounded"
              >
                Bekor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* toast */}
      {toast && (
        <div className="fixed right-6 bottom-6 z-50">
          <div className="bg-black/90 text-white px-4 py-2 rounded shadow">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

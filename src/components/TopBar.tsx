"use client";

import { Search, Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Topbar({
  title,
  onSearch,
  onNavigate,
}: {
  title: string;
  onSearch?: (value: string) => void;
  onNavigate: (v: string) => void;
}) {
  const [value, setValue] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const hotwordActive = useRef(false);
  const hotwordTimer = useRef<number | null>(null);

  // Debounced search -> call parent
  useEffect(() => {
    const id = setTimeout(() => onSearch?.(value), 300);
    return () => clearTimeout(id);
  }, [value]);

  // Setup continuous SpeechRecognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;
    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.lang = "uz-UZ"; // multilingual: uz-UZ default, recognition works for en/ru too
    rec.interimResults = false;
    rec.continuous = true;

    rec.onresult = (e: any) => {
      // get latest transcript
      const transcript = Array.from(e.results)
        .slice(e.resultIndex)
        .map((r: any) => r[0].transcript)
        .join(" ")
        .toLowerCase()
        .trim();

      // If hotword not active, try to detect wake words
      if (!hotwordActive.current) {
        if (transcript.includes("hey pos") || transcript.includes("kassa")) {
          hotwordActive.current = true;
          speak("Tayinlandi. Buyruqni ayting."); // Uzbek feedback
          // deactivate hotword after 8s if no command
          if (hotwordTimer.current) window.clearTimeout(hotwordTimer.current);
          hotwordTimer.current = window.setTimeout(() => {
            hotwordActive.current = false;
          }, 8_000);
          return;
        }
      }

      // If hotword active, process the command and then reset hotword
      if (hotwordActive.current) {
        handleVoiceCommand(transcript);
        hotwordActive.current = false;
        if (hotwordTimer.current) {
          window.clearTimeout(hotwordTimer.current);
          hotwordTimer.current = null;
        }
        return;
      }

      // Also allow direct commands without hotword:
      handleVoiceCommand(transcript);
    };

    rec.onend = () => {
      // auto-restart if we left listening mode active
      if (listening) {
        try {
          rec.start();
        } catch {}
      }
    };

    rec.onerror = () => {
      setListening(false);
    };

    recognitionRef.current = rec;
    // cleanup on unmount
    return () => {
      try {
        rec.stop();
      } catch {}
    };
  }, [listening]);

  // Speak feedback
  function speak(text: string, lang = "uz-UZ") {
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  // Helper: emit custom events used by POS and other pages
  function emit(name: string, detail?: any) {
    window.dispatchEvent(new CustomEvent(name, { detail }));
  }

  // Fuzzy product name extractor
  function extractProductName(text: string) {
    // example: "add coca cola" or "add two coca cola"
    // remove known verbs and numbers — keep simple: return everything after known verb
    const verbs = [
      "add",
      "qo'sh",
      "qo'shish",
      "qo'shing",
      "добавить",
      "put",
      "add to cart",
    ];
    let t = text;
    for (const v of verbs) t = t.replace(v, "");
    // remove numbers like "2", "ikki"
    t = t.replace(/\b\d+\b/g, "");
    return t.trim();
  }

  // Handle recognized command text
  function handleVoiceCommand(text: string) {
    if (!text) return;
    console.log("Voice command:", text);

    // 1) Navigation commands (multilingual)
    const routeMap: [string[], string][] = [
      [["dashboard", "bosh sahifa", "home"], "dashboard"],
      [["pos", "kassa", "sotuv", "savdo"], "pos"],
      [["products", "mahsulotlar", "товары"], "products"],
      [["categories", "kategoriya", "kategoriyalar"], "category"],
      [["orders", "buyurtmalar", "zakazy"], "orders"],
      [["customers", "mijozlar", "clients"], "customers"],
      [["branches", "filiallar"], "branches"],
      [["suppliers", "yetkazib beruvchilar", "поставщики"], "suppliers"],
      [["receipts", "cheklar"], "receipts"],
      [["analytics", "tahlil", "reports"], "analytics"],
      [["cashier", "kassir"], "cashier"],
      [["payments", "to'lovlar", "oplata"], "payments"],
      [["expenses", "xarajatlar"], "expenses"],
      [["profit", "foyda", "zarar"], "profit-loss"],
      [["debt", "qarz", "qarzdorlar"], "debtors"],
      [["loyalty", "bonus", "loyallik"], "loyalty"],
      [["staff", "xodimlar"], "staff"],
      [["roles", "rollar"], "roles"],
      [["schedule", "jadval"], "schedule"],
      [["settings", "sozlamalar", "настройки"], "settings"],
    ];

    for (const [keys, route] of routeMap) {
      if (keys.some((k) => text.includes(k))) {
        onNavigate(route);
        speak(route + " sahifasi ochildi", "uz-UZ");
        return;
      }
    }

    // 2) Checkout commands
    if (
      text.includes("finish purchase") ||
      text.includes("checkout") ||
      text.includes("to'lov") ||
      text.includes("tolov") ||
      text.includes("tugadi")
    ) {
      emit("voice-checkout");
      speak("To'lov jarayoni boshlanmoqda", "uz-UZ");
      return;
    }

    // 3) Clear cart
    if (
      text.includes("clear cart") ||
      text.includes("empty cart") ||
      text.includes("savatni tozalash") ||
      text.includes("savatni bo'shat")
    ) {
      emit("cart-clear");
      speak("Savat tozalandi", "uz-UZ");
      return;
    }

    // 4) Add to cart — "add coca cola" / "qo'sh coca cola"
    if (
      text.includes("add") ||
      text.includes("qo'sh") ||
      text.includes("qo'shish")
    ) {
      const productName = extractProductName(text);
      if (!productName) {
        speak("Mahsulot nomini aniqlay olmadim", "uz-UZ");
        return;
      }
      emit("cart-add", { name: productName });
      speak(`${productName} savatga qo'shildi`, "uz-UZ");
      return;
    }

    // 5) Search command — "search coca cola"
    if (
      text.startsWith("search ") ||
      text.startsWith("qidir ") ||
      text.includes("qidirish")
    ) {
      // extract term after keyword
      const term = text.replace(/^(search|qidir|qidirish)\s*/, "").trim();
      setValue(term); // fill search input
      onSearch?.(term);
      speak(`${term} uchun qidirish`, "uz-UZ");
      return;
    }

    // 6) Change price command
    // Examples: "change price of coca cola to 12000", "set price coca cola 12000", "narxini 12000 ga o'zgartir"
    const priceMatch = text.match(/(\d{4,})/); // a number like 12000
    if (
      text.includes("change price") ||
      text.includes("set price") ||
      text.includes("narx")
    ) {
      const productName = extractProductName(
        text.replace(/(change price|set price|narx|narxini)/g, "")
      );
      const amount = priceMatch ? Number(priceMatch[0]) : null;
      if (!productName || !amount) {
        speak("Iltimos, mahsulot nomi va yangi narxni ayting", "uz-UZ");
        return;
      }
      emit("price-change", { name: productName, price: amount });
      speak(`${productName} narxi ${amount}ga o'zgartirildi`, "uz-UZ");
      return;
    }

    // Not recognized fallback
    speak("Buyruq tanilmadi. Iltimos qayta ayting.", "uz-UZ");
  }

  // Toggle listening via button
  function toggleListening() {
    const rec = recognitionRef.current;
    if (!rec) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    if (!listening) {
      try {
        rec.start();
        setListening(true);
        speak(
          "Ovoz boshlandi. Kassa so‘zini ayting yoki buyruq bering",
          "uz-UZ"
        );
      } catch (err) {
        console.warn(err);
      }
    } else {
      try {
        rec.stop();
      } catch {}
      setListening(false);
      hotwordActive.current = false;
      speak("Ovoz o'chirildi", "uz-UZ");
    }
  }

  return (
    <div className="flex items-center justify-between mb-4 gap-10">
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search products, orders..."
            className="pl-9 pr-3 py-2 rounded-md border bg-white text-sm focus:ring-2 focus:ring-blue-400"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Mic */}
        <button
          onClick={toggleListening}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
            listening ? "bg-red-500 text-white" : "bg-blue-600 text-white"
          }`}
          title="Voice control"
        >
          {listening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>

        {/* Admin */}
        <div className="flex items-center gap-2">
          <div className="text-sm text-slate-500">Admin</div>
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
            A
          </div>
        </div>
      </div>
    </div>
  );
}

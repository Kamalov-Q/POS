"use client";

import { Search, Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function TopBar({
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
  const [permissionState, setPermissionState] = useState<
    "unknown" | "granted" | "denied"
  >("unknown");
  const [transcriptLog, setTranscriptLog] = useState<string[]>([]);
  const recRef = useRef<any>(null);
  const hotwordActive = useRef(false);
  const hotwordTimeout = useRef<number | null>(null);
  const maleVoice = useRef<SpeechSynthesisVoice | null>(null);
  const safeStartLock = useRef(false); // prevent concurrent start calls

  // ---------- voice search debounce ----------
  useEffect(() => {
    const id = setTimeout(() => onSearch?.(value), 300);
    return () => clearTimeout(id);
  }, [value, onSearch]);

  // ---------- pick male voice (prefer uz) ----------
  useEffect(() => {
    function pick() {
      const voices = window.speechSynthesis.getVoices() || [];
      if (!voices.length) return;
      // prefer uz male
      const uzMale = voices.find(
        (v) =>
          v.lang?.toLowerCase().startsWith("uz") && /male|man|boy/i.test(v.name)
      );
      if (uzMale) {
        maleVoice.current = uzMale;
        return;
      }
      // prefer any uz
      const uzAny = voices.find((v) => v.lang?.toLowerCase().startsWith("uz"));
      if (uzAny) {
        maleVoice.current = uzAny;
        return;
      }
      // prefer male en
      const enMale = voices.find(
        (v) => /en/.test(v.lang || "") && /male|man|boy/i.test(v.name)
      );
      if (enMale) {
        maleVoice.current = enMale;
        return;
      }
      // any male
      const anyMale = voices.find((v) => /male|man|boy/i.test(v.name));
      if (anyMale) {
        maleVoice.current = anyMale;
        return;
      }
      // fallback to first
      maleVoice.current = voices[0] ?? null;
    }

    pick();
    window.speechSynthesis.onvoiceschanged = pick;
  }, []);

  // ---------- speak helper (male voice if available) ----------
  function speakUz(text: string, lang = "uz-UZ") {
    if (!("speechSynthesis" in window)) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      if (maleVoice.current) u.voice = maleVoice.current;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (err) {
      // ignore
    }
  }

  // ---------- permission check helper ----------
  async function checkMicPermission(): Promise<
    "granted" | "denied" | "unknown"
  > {
    if (!navigator.permissions) return "unknown";
    try {
      // Not all browsers support "microphone" name in permissions API
      // Try and fall back
      // @ts-ignore
      const p = await navigator.permissions.query({ name: "microphone" });
      // @ts-ignore sometimes state is 'prompt' etc
      if (p.state === "granted") return "granted";
      if (p.state === "denied") return "denied";
      return "unknown";
    } catch {
      return "unknown";
    }
  }

  // ---------- initialize recognition once (but do not start) ----------
  useEffect(() => {
    const SR =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;
    if (!SR) {
      console.warn("SpeechRecognition not supported");
      return;
    }
    const rec = new SR();
    rec.lang = "uz-UZ";
    rec.continuous = true;
    rec.interimResults = false;

    // result handler
    rec.onresult = (ev: any) => {
      // build the transcript from latest results
      let transcript = "";
      try {
        const last = ev.results[ev.results.length - 1];
        transcript = Array.from(last)
          .map((r: any) => r[0].transcript)
          .join(" ")
          .toLowerCase()
          .trim();
      } catch {
        transcript = "";
      }
      if (!transcript) return;
      pushTranscript(`🗣 ${transcript}`);

      // hotword detection
      if (!hotwordActive.current) {
        if (
          transcript.includes("kassa") ||
          transcript.includes("hey pos") ||
          transcript.includes("xabar")
        ) {
          hotwordActive.current = true;
          speakUz("Tayinlandi. Buyruqni ayting.");
          if (hotwordTimeout.current)
            window.clearTimeout(hotwordTimeout.current);
          hotwordTimeout.current = window.setTimeout(() => {
            hotwordActive.current = false;
            hotwordTimeout.current = null;
          }, 8000);
          return;
        }
      }

      // if hotword active, process once then reset hotword
      if (hotwordActive.current) {
        processCommand(transcript);
        hotwordActive.current = false;
        if (hotwordTimeout.current) {
          window.clearTimeout(hotwordTimeout.current);
          hotwordTimeout.current = null;
        }
        return;
      }

      // direct commands
      processCommand(transcript);
    };

    rec.onend = () => {
      // if user wanted listening, restart safely with short delay (Chrome sometimes throws if start called immediately)
      if (listening) {
        setTimeout(() => {
          try {
            if (!recRef.current) return;
            rec.start();
          } catch (err) {
            console.warn("Restart SR failed", err);
          }
        }, 300);
      }
    };

    rec.onerror = (e: any) => {
      console.warn("SR error", e);
      // on fatal errors, stop the listening flag
      if (e.error === "not-allowed" || e.error === "permission-denied") {
        setListening(false);
        setPermissionState("denied");
      }
    };

    recRef.current = rec;

    // check permission state initially
    (async () => {
      const state = await checkMicPermission();
      setPermissionState(state);
    })();

    return () => {
      try {
        rec.stop();
      } catch {}
      if (hotwordTimeout.current) window.clearTimeout(hotwordTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // small transcript push helper (also dispatch event so POS can show it)
  function pushTranscript(t: string) {
    setTranscriptLog((s) => [t, ...s].slice(0, 12));
    try {
      window.dispatchEvent(
        new CustomEvent("voiceTranscript", { detail: { text: t } })
      );
    } catch {}
  }

  console.log("Transcript", transcriptLog);

  // ---------- process spoken command (improved) ----------
  function processCommand(textRaw: string) {
    const text = (textRaw || "").toLowerCase();
    pushTranscript(`cmd: ${text}`);

    // navigation map (match the same view keys used by your Sidebar/App)
    const navMap: [string[], string][] = [
      [["dashboard", "bosh sahifa", "home"], "dashboard"],
      [["pos", "kassa", "sotuv", "savdo"], "pos"],
      [["products", "mahsulot", "товары"], "products"],
      [["category", "kategoriya", "kategoriyalar"], "category"],
      [["orders", "buyurtma", "zakaz"], "orders"],
      [["customers", "mijoz", "mijozlar"], "customers"],
      [["branches", "filial"], "branches"],
      [["suppliers", "yetkazib"], "suppliers"],
      [["receipts", "chek", "cheklar"], "receipts"],
      [["analytics", "statistika", "tahlil"], "analytics"],
      [["cashier", "kassir"], "cashier"],
      [["payments", "to'lov"], "payments"],
      [["expenses", "xarajat"], "expenses"],
      [["profit", "foyda", "zarar"], "profit-loss"],
      [["debt", "qarz"], "debtors"],
      [["loyalty", "bonus"], "loyalty"],
      [["staff", "xodim"], "staff"],
      [["roles", "rol"], "roles"],
      [["schedule", "jadval"], "schedule"],
      [["settings", "sozlama"], "settings"],
    ];

    for (const [keys, route] of navMap) {
      if (keys.some((k) => text.includes(k))) {
        onNavigate(route);
        speakUz(`${route} sahifasi ochildi.`);
        return;
      }
    }

    // checkout
    if (/\b(checkout|to'lov|tolov|tolovni)\b/.test(text)) {
      window.dispatchEvent(new CustomEvent("voice-checkout"));
      speakUz("To'lov jarayoni boshlanmoqda.");
      return;
    }

    // clear cart
    if (
      /\b(clear cart|savatni tozalash|savatni bo'shat|tozalash)\b/.test(text)
    ) {
      window.dispatchEvent(new CustomEvent("cart-clear"));
      speakUz("Savat tozalandi.");
      return;
    }

    // add with quantity: "add 2 coca cola" or "qo'sh 2 coca cola"
    const addMatch = text.match(
      /\b(?:add|qo'sh|qo'shish|qosh)\b\s*(\d+)?\s*(.+)/
    );
    if (addMatch) {
      const qty = addMatch[1] ? Number(addMatch[1]) : 1;
      const name = addMatch[2]?.trim();
      if (name) {
        // emit cart-add with quantity if needed
        window.dispatchEvent(
          new CustomEvent("cart-add", { detail: { name, qty } })
        );
        speakUz(`${name} ${qty} dona savatga qo'shildi.`);
        return;
      }
    }

    // remove or set qty: "remove coca cola" or "set coca cola 3"
    const removeMatch = text.match(/\b(remove|o'chirish|ochirish)\b\s*(.+)/);
    if (removeMatch) {
      const name = removeMatch[2]?.trim();
      if (name) {
        window.dispatchEvent(
          new CustomEvent("cart-remove", { detail: { name } })
        );
        speakUz(`${name} savatdan o'chirildi.`);
        return;
      }
    }

    const setQtyMatch = text.match(
      /\b(?:set|ato'ldir|sonini|sonini)\b\s*(.+)\s*(\d+)/
    );
    if (setQtyMatch) {
      const name = setQtyMatch[1]?.trim();
      const qty = Number(setQtyMatch[2]);
      if (name && qty) {
        window.dispatchEvent(
          new CustomEvent("cart-set-qty", { detail: { name, qty } })
        );
        speakUz(`${name} miqdori ${qty} ga o'zgartirildi.`);
        return;
      }
    }

    // price change: "narx coca cola 12000"
    const priceMatch = text.match(/(\d{3,})/);
    if (text.includes("narx") && priceMatch) {
      const price = Number(priceMatch[1]);
      // estimate product name by removing 'narx' and digits
      const candidate = text
        .replace(/narx|narxini|set price|change price/gi, "")
        .replace(/\d+/g, "")
        .replace(/\b(ga|so'm|so'm)\b/g, "")
        .trim();
      if (candidate) {
        window.dispatchEvent(
          new CustomEvent("price-change", {
            detail: { name: candidate, price },
          })
        );
        speakUz(`${candidate} narxi ${price} ga o'zgartirildi.`);
        return;
      }
    }

    // search
    const searchMatch = text.match(/\b(search|qidir|qidirish)\b\s*(.+)/);
    if (searchMatch) {
      const term = searchMatch[2].trim();
      setValue(term);
      onSearch?.(term);
      speakUz(`${term} bo'yicha qidirilmoqda.`);
      return;
    }

    // barcode voice scan (saying code digits)
    const codeDigits = text.match(/\b(\d{6,})\b/);
    if (codeDigits) {
      const code = codeDigits[1];
      window.dispatchEvent(
        new CustomEvent("barcode-detected", { detail: { code } })
      );
      speakUz(`Barcode: ${code}`);
      return;
    }

    // fallback
    speakUz("Buyruq tanilmadi, iltimos qayta ayting.");
  }

  // ---------- mic toggle (user gesture required to start recognition) ----------
  async function toggleMic() {
    const rec = recRef.current;
    if (!rec) {
      alert("Brauzeringizda SpeechRecognition qo`llab-quvvatlanmaydi.");
      return;
    }

    // check permission
    const perm = await (async () => {
      try {
        // some browsers don't support permissions API for microphone
        // but we still try
        // @ts-ignore
        if (navigator.permissions) {
          // @ts-ignore
          const q = await navigator.permissions.query({ name: "microphone" });
          return q.state;
        }
        return "unknown";
      } catch {
        return "unknown";
      }
    })();
    setPermissionState(
      perm === "granted" ? "granted" : perm === "denied" ? "denied" : "unknown"
    );

    if (!listening) {
      // start
      try {
        if (safeStartLock.current) return;
        safeStartLock.current = true;
        await rec.start();
        setListening(true);
        speakUz(
          "Ovoz faollashtirildi. Kassa so‘zini ayting yoki buyruq bering."
        );
      } catch (err) {
        console.warn("start failed", err);
        alert(
          "Mikrofonga ulanish muvaffaqiyatsiz — iltimos brauzer ruxsatlarini tekshiring."
        );
      } finally {
        safeStartLock.current = false;
      }
    } else {
      try {
        rec.stop();
      } catch {}
      setListening(false);
      hotwordActive.current = false;
      speakUz("Ovoz o‘chirildi.");
    }
  }

  // ---------- small helper UI for permission hint ----------
  function PermissionHint() {
    if (permissionState === "denied") {
      return (
        <div className="text-sm text-red-600">
          Mikrofonga ruxsat rad etilgan — brauzer sozlamalarida yoqing.
        </div>
      );
    }
    if (permissionState === "unknown") {
      return (
        <div className="text-sm text-gray-500">Mikrofon ruxsati: noma'lum</div>
      );
    }
    return null;
  }

  // ---------- UI ----------
  return (
    <div className="flex items-center justify-between mb-4 gap-10">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="text-sm text-gray-500">
          Til: Oʻzbekcha — Hotword: “kassa”
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Search input */}
        <div className="relative">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Mahsulot yoki buyurtma qidirish..."
            className="pl-9 pr-3 py-2 rounded-md border bg-white text-sm focus:ring-2 focus:ring-blue-400"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Mic button */}
        <div className="flex flex-col items-center">
          <button
            onClick={toggleMic}
            title="Voice control"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
              listening ? "bg-red-500 text-white" : "bg-blue-600 text-white"
            }`}
          >
            {listening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <div className="mt-1">
            <PermissionHint />
          </div>
        </div>

        {/* Admin badge */}
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

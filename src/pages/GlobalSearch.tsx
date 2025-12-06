"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

export default function GlobalSearch({
  onSelect,
}: {
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  function selectItem(item: string) {
    onSelect(item);
    setHistory((h) => [...new Set([item, ...h])].slice(0, 5));
    close();
  }

  // Ctrl + K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center pt-32 z-50">
      <div className="bg-white w-[500px] rounded-xl shadow-xl p-4 animate-fadeIn">
        <div className="flex items-center gap-3 border-b pb-3">
          <Search className="text-slate-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, orders, customers..."
            className="flex-1 outline-none text-sm"
          />
          <button onClick={close}>
            <X />
          </button>
        </div>

        {/* Suggestions */}
        <div className="mt-4">
          {query ? (
            <div>
              <p className="text-xs text-slate-500 mb-1">Search results</p>
              <button
                onClick={() => selectItem(query)}
                className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded"
              >
                Search: <b>{query}</b>
              </button>
            </div>
          ) : (
            <div>
              <p className="text-xs text-slate-500 mb-1">Recent</p>
              {history.map((h) => (
                <button
                  key={h}
                  onClick={() => selectItem(h)}
                  className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded"
                >
                  {h}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

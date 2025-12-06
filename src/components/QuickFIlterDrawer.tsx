"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function QuickFilterDrawer({
  open,
  onClose,
  categories,
  brands,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  categories: string[];
  brands: string[];
  onApply: (filters: {
    category: string | null;
    brand: string | null;
    min: number | null;
    max: number | null;
    inStock: boolean;
  }) => void;
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");
  const [inStock, setInStock] = useState(false);

  const applyFilters = () => {
    onApply({
      category,
      brand,
      min: min ? Number(min) : null,
      max: max ? Number(max) : null,
      inStock,
    });
    onClose();
  };

  const clear = () => {
    setCategory(null);
    setBrand(null);
    setMin("");
    setMax("");
    setInStock(false);
    onApply({
      category: null,
      brand: null,
      min: null,
      max: null,
      inStock: false,
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
      <div className="bg-white w-[350px] h-full p-5 shadow-xl animate-slideLeft">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Quick Filters</h2>
          <button onClick={onClose}>
            <X className="text-slate-500" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-5">
          <p className="font-medium mb-2 text-sm">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c === category ? null : c)}
                className={`px-3 py-1 text-sm rounded border ${
                  category === c ? "bg-blue-600 text-white" : "bg-slate-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="mb-5">
          <p className="font-medium mb-2 text-sm">Brand</p>
          <div className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b === brand ? null : b)}
                className={`px-3 py-1 text-sm rounded border ${
                  brand === b ? "bg-purple-600 text-white" : "bg-slate-100"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-5">
          <p className="font-medium mb-2 text-sm">Price Range</p>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="border p-2 rounded w-1/2 text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="border p-2 rounded w-1/2 text-sm"
            />
          </div>
        </div>

        {/* In Stock Toggle */}
        <div className="flex items-center gap-2 mb-8">
          <input
            type="checkbox"
            checked={inStock}
            onChange={() => setInStock(!inStock)}
          />
          <p className="text-sm">In Stock Only</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            className="flex-1 bg-slate-200 py-2 rounded font-medium"
            onClick={clear}
          >
            Clear All
          </button>
          <button
            className="flex-1 bg-blue-600 text-white py-2 rounded font-medium"
            onClick={applyFilters}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

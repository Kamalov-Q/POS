"use client";

import ProductCard from "@/components/ProductCart";
import QuickFilterDrawer from "@/components/QuickFIlterDrawer";
import { sampleProducts } from "@/data/dummy-data";
import { useState } from "react";

export default function POSPage({
  onAddToCart,
  searchQuery = "", // <-- FIXED DEFAULT VALUE
}: {
  onAddToCart: (p: any) => void;
  searchQuery?: string;
}) {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const categories = Array.from(new Set(sampleProducts.map((p) => p.category)));
  const brands = Array.from(new Set(sampleProducts.map((p) => p.brand)));

  const [filters, setFilters] = useState({
    category: null as string | null,
    brand: null as string | null,
    min: null as number | null,
    max: null as number | null,
    inStock: false,
  });

  const products = sampleProducts
    .filter((p) => (filters.category ? p.category === filters.category : true))
    .filter((p) => (filters.brand ? p.brand === filters.brand : true))
    .filter((p) => (filters.min ? p.price >= filters.min : true))
    .filter((p) => (filters.max ? p.price <= filters.max : true))
    .filter((p) => (filters.inStock ? p.stock > 0 : true))
    .filter((p) =>
      p.name?.toLowerCase().includes(searchQuery?.toLowerCase() || "")
    );

  return (
    <div>
      {/* TOP FILTER BUTTON */}
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => setFilterDrawerOpen(true)}
          className="px-4 py-2 bg-slate-200 rounded shadow hover:bg-slate-300 transition"
        >
          Quick Filters
        </button>
      </div>

      {/* DRAWER */}
      <QuickFilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        categories={categories}
        brands={brands}
        onApply={(f) => setFilters(f)}
      />

      {/* PRODUCT LIST */}
      <div className="grid grid-cols-3 gap-4">
        {products.length === 0 ? (
          <div className="col-span-3 text-center text-slate-500 py-6">
            ❌ Hech nima topilmadi
          </div>
        ) : (
          products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
          ))
        )}
      </div>
    </div>
  );
}

import type { Product } from "@/types/types";

export default function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (p: Product) => void;
}) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col justify-between">
      <div>
        <div className="font-semibold mb-1">{product.name}</div>
        <div className="text-slate-500 text-sm">
          {product.price.toLocaleString()} so'm
        </div>
        <div className="text-xs text-slate-400 mt-2">{product.category}</div>
      </div>
      <div className="mt-4">
        <button
          onClick={() => onAdd(product)}
          className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm w-full"
        >
          Qo'shish
        </button>
      </div>
    </div>
  );
}

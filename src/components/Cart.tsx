import type { CartItem } from "@/types/types";

export default function Cart({
  cart,
  onInc,
  onDec,
  onRemove,
}: {
  cart: CartItem[];
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm h-full flex flex-col">
      <h3 className="font-semibold mb-3">Savatcha</h3>
      <div className="flex-1 overflow-auto space-y-3">
        {cart.length === 0 && (
          <div className="text-slate-400">Savatcha bo'sh</div>
        )}
        {cart.map((it) => (
          <div
            key={it.productId}
            className="flex items-center justify-between bg-slate-50 p-2 rounded"
          >
            <div>
              <div className="font-medium">{it.name}</div>
              <div className="text-sm text-slate-500">
                {it.price.toLocaleString()} so'm
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onDec(it.productId)}
                className="px-2 py-1 rounded bg-white border"
              >
                -
              </button>
              <div className="px-2">{it.qty}</div>
              <button
                onClick={() => onInc(it.productId)}
                className="px-2 py-1 rounded bg-white border"
              >
                +
              </button>
              <button
                onClick={() => onRemove(it.productId)}
                className="ml-2 text-sm text-red-500"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t pt-3">
        <div className="flex justify-between text-sm text-slate-600 mb-1">
          <div>Subtotal</div>
          <div>{subtotal.toLocaleString()} so'm</div>
        </div>
        <div className="flex justify-between text-sm text-slate-600 mb-1">
          <div>Soliq (12%)</div>
          <div>{tax.toLocaleString()} so'm</div>
        </div>
        <div className="flex justify-between font-semibold text-lg mt-2">
          <div>Jami</div>
          <div>{total.toLocaleString()} so'm</div>
        </div>
        <button className="mt-4 w-full py-2 rounded bg-green-600 text-white">
          To'lov
        </button>
      </div>
    </div>
  );
}

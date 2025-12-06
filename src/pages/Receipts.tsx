import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ReceiptsPage() {
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const [receipts, setReceipts] = useState([
    { id: 101, total: 56000, date: "2025-01-04", cashier: "Dilshod" },
    { id: 102, total: 23000, date: "2025-01-04", cashier: "Vali" },
    { id: 103, total: 87000, date: "2025-01-05", cashier: "Dilshod" },
    { id: 104, total: 120000, date: "2025-01-06", cashier: "Madina" },
    { id: 105, total: 45000, date: "2025-01-06", cashier: "Vali" },
    { id: 106, total: 99000, date: "2025-01-07", cashier: "Dilshod" },
    { id: 107, total: 152000, date: "2025-01-07", cashier: "Madina" },
    { id: 108, total: 31000, date: "2025-01-08", cashier: "Aziza" },
  ]);

  const openReceipt = (receipt) => setSelectedReceipt(receipt);
  const closeModal = () => setSelectedReceipt(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cheklar</h1>

      <table className="w-full border shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Check #</th>
            <th className="border p-2">Summa</th>
            <th className="border p-2">Sana</th>
            <th className="border p-2">Kassir</th>
            <th className="border p-2">Amal</th>
          </tr>
        </thead>

        <tbody>
          {receipts.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50 transition">
              <td className="border p-2">{r.id}</td>
              <td className="border p-2">{r.total.toLocaleString()} so‘m</td>
              <td className="border p-2">{r.date}</td>
              <td className="border p-2">{r.cashier}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => openReceipt(r)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Ko‘rish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DETAILS MODAL */}
      <Dialog open={!!selectedReceipt} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Check tafsilotlari</DialogTitle>
          </DialogHeader>

          {selectedReceipt && (
            <div className="space-y-3 mt-2">
              <p>
                <strong>Check №:</strong> {selectedReceipt.id}
              </p>
              <p>
                <strong>Kassir:</strong> {selectedReceipt.cashier}
              </p>
              <p>
                <strong>Sana:</strong> {selectedReceipt.date}
              </p>
              <p>
                <strong>Umumiy summa:</strong>{" "}
                {selectedReceipt.total.toLocaleString()} so‘m
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Yopish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Eye } from "lucide-react";

export default function SuppliersPage() {
  const [search, setSearch] = useState("");

  const [suppliers, setSuppliers] = useState([
    { id: 1, name: "UzBeverages", phone: "+998 90 123 45 67", items: 12 },
    { id: 2, name: "SweetFood Co.", phone: "+998 93 998 22 11", items: 5 },
    { id: 3, name: "AgroMeat", phone: "+998 99 555 88 44", items: 7 },
    { id: 4, name: "FreshFruits", phone: "+998 97 111 22 33", items: 18 },
    { id: 5, name: "GoldenSnacks", phone: "+998 95 700 33 88", items: 9 },
    { id: 6, name: "MilkFarm", phone: "+998 91 555 44 22", items: 14 },
  ]);

  const removeSupplier = (id: number) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  };

  const filtered = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold">Yetkazib Beruvchilar</h1>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Yetkazib beruvchi qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Nomi</th>
                <th className="p-3 border">Telefon</th>
                <th className="p-3 border">Mahsulotlar</th>
                <th className="p-3 border">Amallar</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="border p-3">{s.id}</td>
                  <td className="border p-3 font-medium">{s.name}</td>
                  <td className="border p-3">{s.phone}</td>
                  <td className="border p-3">{s.items}</td>

                  <td className="border p-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Eye size={16} /> Tafsilotlar
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex items-center gap-1"
                        onClick={() => removeSupplier(s.id)}
                      >
                        <Trash2 size={16} /> O'chirish
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    Yetkazib beruvchi topilmadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

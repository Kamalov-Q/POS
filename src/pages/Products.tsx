"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Trash2, Plus } from "lucide-react";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Coca Cola 1L",
      price: 8000,
      stock: 50,
      category: "Ichimliklar",
    },
    {
      id: 2,
      name: "Pepsi 1.5L",
      price: 9000,
      stock: 35,
      category: "Ichimliklar",
    },
    {
      id: 3,
      name: "Snickers",
      price: 7000,
      stock: 100,
      category: "Shirinliklar",
    },
    {
      id: 4,
      name: "Kit-Kat",
      price: 11000,
      stock: 80,
      category: "Shirinliklar",
    },
    {
      id: 5,
      name: "Tovuq Go‘shti 1kg",
      price: 38000,
      stock: 20,
      category: "Go'sht",
    },
    {
      id: 6,
      name: "Mol Go‘shti 1kg",
      price: 68000,
      stock: 12,
      category: "Go'sht",
    },
    { id: 7, name: "Nok 1kg", price: 15000, stock: 40, category: "Mevalar" },
    { id: 8, name: "Olma 1kg", price: 12000, stock: 70, category: "Mevalar" },
    { id: 9, name: "Lavash", price: 17000, stock: 15, category: "Taomlar" },
    {
      id: 10,
      name: "Burger Set",
      price: 25000,
      stock: 10,
      category: "Taomlar",
    },
  ]);

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const categories = [
    "Ichimliklar",
    "Shirinliklar",
    "Go'sht",
    "Mevalar",
    "Taomlar",
  ];

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      filterCategory === "all" || p.category === filterCategory;

    return matchSearch && matchCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Barcha Mahsulotlar</h1>

        <Button className="flex items-center gap-2">
          <Plus size={18} /> Yangi Mahsulot
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 flex items-center gap-4 flex-wrap">
          <Input
            className="max-w-xs"
            placeholder="Mahsulot qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select onValueChange={setFilterCategory} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kategoriya" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Barchasi</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Mahsulot</th>
                <th className="p-3 border">Kategoriya</th>
                <th className="p-3 border">Narxi</th>
                <th className="p-3 border">Qoldiq</th>
                <th className="p-3 border">Amallar</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="border p-3">{p.id}</td>
                  <td className="border p-3 font-medium">{p.name}</td>
                  <td className="border p-3">{p.category}</td>
                  <td className="border p-3">
                    {p.price.toLocaleString()} so‘m
                  </td>
                  <td className="border p-3">{p.stock}</td>

                  <td className="border p-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Edit size={16} /> Tahrirlash
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex items-center gap-1"
                        onClick={() => deleteProduct(p.id)}
                      >
                        <Trash2 size={16} /> O'chirish
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td className="p-4 text-center text-gray-500" colSpan={6}>
                    Mahsulot topilmadi
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

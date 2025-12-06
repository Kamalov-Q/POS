import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

// Dummy Data
const categories = [
  { id: 1, name: "Ichimliklar", products: 12 },
  { id: 2, name: "Shirinliklar", products: 8 },
  { id: 3, name: "Maishiy tovarlar", products: 6 },
  { id: 4, name: "Non va un mahsulotlari", products: 4 },
  { id: 5, name: "Gazaklar", products: 10 },
];

export default function CategoriesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kategoriyalar</h1>

        <Button className="flex items-center gap-2">
          <Plus size={18} /> Yangi kategoriya
        </Button>
      </div>

      <div className="max-w-md">
        <Input placeholder="Kategoriyalarni qidirish..." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Card
            key={cat.id}
            className="cursor-pointer hover:shadow-md transition"
          >
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold text-lg">{cat.name}</p>
              <p className="text-sm text-muted-foreground">
                Mahsulotlar: {cat.products} ta
              </p>
              <Button variant="secondary" className="w-full mt-2">
                Ko'rish
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

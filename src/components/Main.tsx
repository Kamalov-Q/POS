import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { motion } from "framer-motion";

export default function MainComponent() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Coca Cola", category: "drinks", price: 2 },
    { id: 2, name: "Pepsi", category: "drinks", price: 2 },
    { id: 3, name: "Fanta", category: "drinks", price: 2 },
    { id: 4, name: "Burger", category: "food", price: 6 },
    { id: 5, name: "Pizza", category: "food", price: 10 },
    { id: 6, name: "Hot Dog", category: "food", price: 4 },
    { id: 7, name: "Water 1L", category: "drinks", price: 1 },
    { id: 8, name: "Chocolate", category: "snacks", price: 3 },
    { id: 9, name: "Chips", category: "snacks", price: 2 },
    { id: 10, name: "Latte", category: "coffee", price: 5 },
    { id: 11, name: "Espresso", category: "coffee", price: 3 },
    { id: 12, name: "Cappuccino", category: "coffee", price: 4 },
  ];

  const filtered = products.filter((p) => {
    return (
      (category === "all" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const total = cart.reduce((a, c) => a + c.price, 0);

  return (
    <div className="p-6 grid grid-cols-4 gap-6 h-screen">
      {/* Products */}
      <div className="col-span-3 flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select onValueChange={setCategory} defaultValue="all">
            <SelectTrigger className="w-40">Category</SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="drinks">Drinks</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="snacks">Snacks</SelectItem>
              <SelectItem value="coffee">Coffee</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-4 overflow-y-auto pr-2">
          {filtered.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card
                className="cursor-pointer hover:shadow-xl transition"
                onClick={() => addToCart(product)}
              >
                <CardContent className="p-4 flex flex-col items-center gap-2">
                  <div className="text-lg font-semibold">{product.name}</div>
                  <div>${product.price}</div>
                  <Button>Add</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="col-span-1 p-4 bg-gray-50 rounded-2xl flex flex-col justify-between shadow-lg">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Cart</h2>
          <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
            {cart.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-3 flex justify-between">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="text-lg font-bold">Total: ${total}</div>
          <Button className="w-full mt-3">Checkout</Button>
        </div>
      </div>
    </div>
  );
}

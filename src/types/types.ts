export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
};

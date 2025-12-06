import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Cart from "./components/Cart";
import DashboardPage from "./pages/Dashboard";
import POSPage from "./pages/POSPage";
import ProductsPage from "./pages/Products";
import CustomersPage from "./pages/Customers";
import SettingsPage from "./pages/Settings";
import type { CartItem, Product } from "./types/types";
import OrdersPage from "./pages/Order";
import Topbar from "./components/TopBar";
import BranchesPage from "./pages/Branches";
import CategoriesPage from "./pages/Category";
import SuppliersPage from "./pages/Suppliers";
import ReceiptsPage from "./pages/Receipts";
import AnalyticsPage from "./pages/Analytics";
import { Warehouse } from "./components/Warehouse";
import CashierPage from "./pages/Cashier";
import Payments from "./pages/Payments";
import Expenses from "./pages/Expenses";
import ProfitLoss from "./pages/ProfitLoss";
import Debtors from "./pages/Debtors";
import Loyalty from "./pages/Loyalty";
import Staff from "./pages/Staff";
import Roles from "./pages/Roles";
import Schedule from "./pages/Schedule";

export default function App() {
  const [activeView, setActiveView] = useState<string>("pos");
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(p: Product) {
    setCart((c) => {
      const found = c.find((x) => x.productId === p.id);
      if (found)
        return c.map((x) =>
          x.productId === p.id ? { ...x, qty: x.qty + 1 } : x
        );
      return [...c, { productId: p.id, name: p.name, price: p.price, qty: 1 }];
    });
  }

  function incQty(id: string) {
    setCart((c) =>
      c.map((x) => (x.productId === id ? { ...x, qty: x.qty + 1 } : x))
    );
  }
  function decQty(id: string) {
    setCart((c) => {
      const found = c.find((x) => x.productId === id);
      if (!found) return c;
      if (found.qty === 1) return c.filter((x) => x.productId !== id);
      return c.map((x) => (x.productId === id ? { ...x, qty: x.qty - 1 } : x));
    });
  }
  function removeItem(id: string) {
    setCart((c) => c.filter((x) => x.productId !== id));
  }

  function renderView() {
    switch (activeView) {
      case "dashboard":
        return <DashboardPage />;
      case "pos":
        return <POSPage onAddToCart={addToCart} />;
      case "products":
        return <ProductsPage />;
      case "category":
        return <CategoriesPage />;
      case "suppliers":
        return <SuppliersPage />;
      case "receipts":
        return <ReceiptsPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "warehouses":
        return <Warehouse />;
      case "cashier":
        return <CashierPage />;
      case "payments":
        return <Payments />;
      case "expenses":
        return <Expenses />;
      case "profit-loss":
        return <ProfitLoss />;
      case "debtors":
        return <Debtors />;
      case "loyalty":
        return <Loyalty />;
      case "staff":
        return <Staff />;
      case "roles":
        return <Roles />;
      case "schedule":
        return <Schedule />;
      case "branches":
        return <BranchesPage />;
      case "orders":
        return <OrdersPage />;
      case "customers":
        return <CustomersPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <div>Unknown view: {activeView}</div>;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800">
      <Sidebar view={activeView} setView={setActiveView} />
      <main className="flex-1 p-8">
        <div className="max-w-[1280px] mx-auto grid grid-cols-4 gap-6">
          <div className="col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <Topbar
                title={activeView.toUpperCase()}
                onNavigate={setActiveView}
              />
            </div>
            {renderView()}
          </div>

          {activeView === "pos" && (
            <div className="col-span-1">
              <Cart
                cart={cart}
                onInc={incQty}
                onDec={decQty}
                onRemove={removeItem}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

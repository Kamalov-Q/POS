import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  DollarSign,
  BarChart3,
  ShoppingCart,
  Menu,
  ChevronLeft,
} from "lucide-react";

export function EnhancedPOSLayout({ activeView, onViewChange, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuGroups = [
    {
      title: "Asosiy",
      items: [
        {
          id: "control",
          icon: LayoutDashboard,
          label: "Boshqaruv",
          view: "control",
        },
        { id: "pos", icon: ShoppingCart, label: "POS / Sotuv", view: "pos" },
      ],
    },
    {
      title: "Tizim",
      items: [
        { id: "xodimlar", icon: Users, label: "Xodimlar", view: "xodimlar" },
        { id: "omborlar", icon: Package, label: "Omborlar", view: "omborlar" },
      ],
    },
    {
      title: "Hisob-kitob",
      items: [
        { id: "moliya", icon: DollarSign, label: "Moliya", view: "moliya" },
        {
          id: "statistika",
          icon: BarChart3,
          label: "Statistika",
          view: "statistika",
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* MOBILE TOP NAV */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b">
        <button onClick={() => setMobileOpen(true)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-blue-600">POS System</h1>
        <div className="w-6" />
      </div>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static z-50 h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* SIDEBAR HEADER */}
        <div
          className={`p-4 border-b border-gray-200 flex items-center justify-between ${
            collapsed ? "justify-center" : ""
          }`}
        >
          {!collapsed && (
            <h1 className="text-blue-600 font-semibold">POS System</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ChevronLeft
              className={`w-5 h-5 transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* MENU GROUPS */}
        <nav className="flex-1 overflow-auto p-3">
          {menuGroups.map((group) => (
            <div key={group.title} className="mb-6">
              {!collapsed && (
                <div className="text-xs font-semibold text-gray-500 mb-2 pl-2">
                  {group.title}
                </div>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.view;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange(item.view);
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-100 text-gray-700"
                      }
                      ${collapsed ? "justify-center" : ""}`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-blue-600" : "text-gray-600"
                      }`}
                    />
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </div>
  );
}

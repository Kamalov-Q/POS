export default function AnalyticsPage() {
  const salesData = [
    { month: "Yanvar", amount: 1200000 },
    { month: "Fevral", amount: 950000 },
    { month: "Mart", amount: 1400000 },
    { month: "Aprel", amount: 1600000 },
  ];

  const topProducts = [
    { id: 1, name: "Coca Cola 1L", sold: 230 },
    { id: 2, name: "Snickers", sold: 180 },
    { id: 3, name: "Choy", sold: 150 },
  ];

  const maxSale = Math.max(...salesData.map((s) => s.amount));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Statistika</h1>

      {/* Sales Chart */}
      <h2 className="text-xl font-semibold mb-2">Oylik Sotuvlar</h2>
      <div className="space-y-3 mb-8">
        {salesData.map((s) => (
          <div key={s.month}>
            <div className="flex justify-between text-sm mb-1">
              <span>{s.month}</span>
              <span>{s.amount} so‘m</span>
            </div>

            <div className="w-full h-4 bg-gray-200 rounded">
              <div
                className="h-4 bg-blue-500 rounded"
                style={{ width: `${(s.amount / maxSale) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Top products */}
      <h2 className="text-xl font-semibold mb-3">
        Eng Ko‘p Sotilgan Mahsulotlar
      </h2>
      <ul className="space-y-2">
        {topProducts.map((p) => (
          <li
            key={p.id}
            className="p-3 border rounded flex justify-between items-center"
          >
            <span>{p.name}</span>
            <span className="font-bold">{p.sold} dona</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

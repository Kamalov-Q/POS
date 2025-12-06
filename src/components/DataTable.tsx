export function DataTable() {
  const tableData = [
    { period: "Mensual", days: "Ro-1-76", count: 0, time: "0 ta sur" },
    { period: "Chay-Meg", days: "", count: 0, time: "12.00 min sur" },
    { period: "Standard", days: "", count: 0, time: "0 sur" },
    { period: "Kona tizim", days: "", count: 0, time: "6.00 min" },
    { period: "Kona tizim", days: "", count: 10, time: "17.00 sur" },
    { period: "Sabizlik", days: "", count: 0, time: "0.00 sur" },
    { period: "Sci-fi", days: "", count: 0, time: "2.00 sur" },
    { period: "Kona tizim", days: "", count: 1, time: "10.00 min" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-gray-900 mb-4">Tartibni avtolar ko'rsatildi</h3>

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-gray-600">Mensual</th>
            <th className="text-left py-3 px-4 text-gray-600">Qatlar</th>
            <th className="text-left py-3 px-4 text-gray-600">Kun</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-3 px-4 text-gray-900">{row.period}</td>
              <td className="py-3 px-4 text-gray-700">{row.count}</td>
              <td className="py-3 px-4 text-gray-700">{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

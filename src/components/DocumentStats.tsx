export function DocumentStats() {
  const stats = [
    { label: "Boshlangan sanasi", value: "12.00 min" },
    { label: "Hisobotsiz avtomallarlar", value: "5 ta" },
    { label: "Hisobotsizlar sanagir", value: "0 ta" },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="text-gray-600 mb-2">{stat.label}</div>
          <div className="text-gray-900">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}

export function StatsCard() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">Savastqa</h3>
        <div className="text-gray-900">0 ta sur</div>
      </div>

      <div className="flex items-start gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Topping
        </button>
        <p className="text-gray-600">
          Boshqaruv paneli bo'yicha oliy yoki sizlar va xidmatni ozgartiramiz.
        </p>
      </div>
    </div>
  );
}

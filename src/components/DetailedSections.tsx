import { CheckSquare } from "lucide-react";

export function DetailedSections() {
  const sections = [
    {
      title: "Arseny funksiyalar",
      icon: "🔷",
      items: [
        "2.1. Tovar qabullash",
        "Qo'lda qo'shilish (halol) → muddai → maqsada",
        "Fayl/barcode orqali",
        "QB Done amalini ko'rsatish",
        {
          subtitle: 'Maxsulotlar: "1 ga o\'q" qa)',
          items: ['Natix - "tabiiy", Sinflar o\'qish qaraydi'],
        },
      ],
    },
    {
      title: "Onep Bilan Boshqarish - Tabblar",
      icon: "🔷",
      items: [
        '3.1. Asosiy oyiqana umumiy "Savdolar" bo\'girmasi',
        "Hayllar bosinganli tahlil, Ishlar ko'ringan o'rindilar",
        "3.2. Buyurtalar ro'yxati",
        {
          subtitle: "Tovar qar o'limda:",
          items: [
            "Qatlamlar ko'rsatilish qa",
            "Yana tovar chay qaysi",
            "Lidlar qarchish qa'lar",
          ],
        },
        {
          subtitle: "Xotirari o'rgantadi:",
          items: [
            "Siz Ishchi mulohiza xondi SMP",
            "To'plaji Sinflar tahlil SBF",
          ],
        },
      ],
    },
    {
      title: "Savdo bo'limi",
      icon: "🔷",
      items: [
        "Savdor amallar tovar qa'zitaliq",
        "Tovar tovar va belgini",
        "Tovarni tarixdati komponentlar o'zititada",
        "Chek chiqarish qaytari ko'rsitadi",
        "Lidl ko'rsit po'liyamsi",
      ],
    },
    {
      title: "Tovarlar bo'limi",
      icon: "🔷",
      items: [
        "Ko'ryad",
        "Sanadi o'qish",
        "Onep bilan tovar o'rganatlar",
        "Barcode ko'rkitotib",
        "Tovarni chegirela o'xshatadi",
      ],
    },
    {
      title: "Tizim sozlamalari",
      icon: "🔷",
      items: [
        "8.1 TTT sozlash",
        "Tillar",
        "Kirim",
        "8.2 Qziqnar rajarri",
        "Qanchuyi o'plan (Bank maqta)",
        "Yerzaq o'qlari",
        "8.3. Foydalanuvchi rolari",
        "Adaini",
        "Yozini",
      ],
    },
    {
      title: "Texnik tabblar",
      icon: "🔷",
      items: [
        "9.1. Onep tomadir algoritmi",
        "Web Saveda API",
        "Offline rejim ba - Yeab API",
      ],
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
          <p className="text-gray-700 mb-6">
            Boshqaruv paneli taxminan shu korinishda. Taklif va dizayinga qarab
            ozgartiramiz.
          </p>

          <div className="space-y-8">
            {sections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="border-l-4 border-blue-500 pl-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                    <CheckSquare className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-gray-900">{section.title}</h3>
                </div>

                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700">
                      {typeof item === "string" ? (
                        <div className="flex items-start gap-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>{item}</span>
                        </div>
                      ) : (
                        <div className="ml-4 mt-2">
                          <div className="text-gray-600 mb-1">
                            {item.subtitle}
                          </div>
                          <ul className="ml-4 space-y-1">
                            {item.items?.map((subItem, subIndex) => (
                              <li
                                key={subIndex}
                                className="flex items-start gap-2"
                              >
                                <span className="text-gray-400">◦</span>
                                <span className="text-gray-600">{subItem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg border border-gray-300 p-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-gray-900 mb-2">Konflik sozlash:</h4>
              <ul className="space-y-1 ml-4">
                <li className="text-gray-700">• Konflik sozladi</li>
                <li className="text-gray-700">
                  • Ishchi avtomatik sozladi Programlar ba Sinflar Ishli
                  ko\'rsladi sozlashidan
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 mb-2">Bo\'limlar o\'rtich:</h4>
              <ul className="space-y-1 ml-4">
                <li className="text-gray-700">• Tovarlar ba chela\'</li>
                <li className="text-gray-700">• Ondarchi ba Sher</li>
                <li className="text-gray-700">• Omdarchi ba Sher</li>
                <li className="text-gray-700">• Programlar ba Sher</li>
                <li className="text-gray-700">• Ildiztashini ba tizim</li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 mb-2">Savdola:</h4>
              <ul className="space-y-1 ml-4">
                <li className="text-gray-700">• 12 dona chek cert</li>
                <li className="text-gray-700">• 1 est avtalar qoshdi va\'r</li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 mb-2">Oqarta tolovlarida:</h4>
              <ul className="space-y-1 ml-4">
                <li className="text-gray-700">
                  • Sayramqaqin bizneslik ishlayli ishlarini, Kom...
                </li>
                <li className="text-gray-700">
                  • "Chiq qima" Saveda SINDO chiqarin!
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 mt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                  <CheckSquare className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-gray-900">Vizuobellar</h4>
              </div>
              <div className="ml-9">
                <p className="text-gray-700 mb-2">4.1. Kunlik</p>
                <ul className="space-y-1 ml-4">
                  <li className="text-gray-700">• kunli osnda</li>
                  <li className="text-gray-700">• tahriri / kolte</li>
                  <li className="text-gray-700">• qarqida ishlar</li>
                  <li className="text-gray-700">
                    • kollighun tovarlar ro\'yxati
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import BranchCard from "@/components/BranchCart";


export default function BranchesPage() {
  const branches = [
    {
      id: 1,
      name: "Toshkent Markaz",
      manager: "Aliyev Bekzod",
      staff: 12,
      phone: "+998 90 123 45 67",
      location: "Amir Temur ko'chasi, 12",
      status: "active",
    },
    {
      id: 2,
      name: "Yunusobod Filial",
      manager: "Karimova Dilnoza",
      staff: 7,
      phone: "+998 90 765 43 21",
      location: "Yunusobod 4-mavze, 9",
      status: "active",
    },
    {
      id: 3,
      name: "Chilonzor Filial",
      manager: "Rasulov Diyor",
      staff: 9,
      phone: "+998 93 555 11 22",
      location: "Chilonzor 21-kvartal",
      status: "inactive",
    },
    {
      id: 4,
      name: "Sergeli Filial",
      manager: "Xo'jayev Jamshid",
      staff: 5,
      phone: "+998 99 111 22 33",
      location: "Sergeli 7A",
      status: "active",
    },
    {
      id: 5,
      name: "Olmazor Filial",
      manager: "Sodiqova Kamola",
      staff: 8,
      phone: "+998 95 220 44 55",
      location: "Olmazor tumani, 5-mavze",
      status: "active",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Filiallar</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <BranchCard key={branch.id} branch={branch} />
        ))}
      </div>
    </div>
  );
}

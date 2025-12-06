import { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  UserCircle,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";

interface Employee {
  id: number;
  name: string;
  position: string;
  phone: string;
  email: string;
  salary: string;
  startDate: string;
  status: "active" | "inactive";
}

export function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    phone: "",
    email: "",
    salary: "",
    status: "active" as "active" | "inactive",
  });
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "Alisher Karimov",
      position: "Ombor mudiri",
      phone: "+998 90 123 45 67",
      email: "alisher.k@daxomat.uz",
      salary: "5,000,000 UZS",
      startDate: "2023-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Nodira Sharipova",
      position: "Buxgalter",
      phone: "+998 91 234 56 78",
      email: "nodira.s@daxomat.uz",
      salary: "6,500,000 UZS",
      startDate: "2022-08-20",
      status: "active",
    },
    {
      id: 3,
      name: "Jamshid Rahimov",
      position: "Sotuvchi",
      phone: "+998 93 345 67 89",
      email: "jamshid.r@daxomat.uz",
      salary: "3,800,000 UZS",
      startDate: "2023-05-10",
      status: "active",
    },
    {
      id: 4,
      name: "Dilnoza Azimova",
      position: "Kassir",
      phone: "+998 94 456 78 90",
      email: "dilnoza.a@daxomat.uz",
      salary: "3,500,000 UZS",
      startDate: "2023-03-01",
      status: "active",
    },
    {
      id: 5,
      name: "Rustam Toshev",
      position: "Yetkazib beruvchi",
      phone: "+998 95 567 89 01",
      email: "rustam.t@daxomat.uz",
      salary: "4,200,000 UZS",
      startDate: "2023-06-12",
      status: "inactive",
    },
    {
      id: 6,
      name: "Malika Yusupova",
      position: "Marketing menejer",
      phone: "+998 97 678 90 12",
      email: "malika.y@daxomat.uz",
      salary: "5,500,000 UZS",
      startDate: "2022-11-05",
      status: "active",
    },
  ]);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteEmployee = (id: number) => {
    if (confirm("Xodimni o'chirmoqchimisiz?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      position: employee.position,
      phone: employee.phone,
      email: employee.email,
      salary: employee.salary,
      status: employee.status,
    });
    setShowModal(true);
  };

  const activeCount = employees.filter((e) => e.status === "active").length;
  const inactiveCount = employees.filter((e) => e.status === "inactive").length;

  const handleSave = () => {
    if (selectedEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp
        )
      );
    } else {
      setEmployees([...employees, { ...formData, id: employees.length + 1 }]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-gray-900 mb-2">Xodimlar boshqaruvi</h2>
            <p className="text-gray-600">
              Barcha xodimlarni ko'rish va boshqarish
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedEmployee(null);
              setFormData({
                name: "",
                position: "",
                phone: "",
                email: "",
                salary: "",
                status: "active",
              });
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Yangi xodim
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Jami xodimlar</p>
                <p className="text-gray-900">{employees.length} ta</p>
              </div>
              <UserCircle className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Faol xodimlar</p>
                <p className="text-gray-900">{activeCount} ta</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Nofaol xodimlar</p>
                <p className="text-gray-900">{inactiveCount} ta</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Xodim qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600">Xodim</th>
                  <th className="text-left py-3 px-4 text-gray-600">Lavozim</th>
                  <th className="text-left py-3 px-4 text-gray-600">Telefon</th>
                  <th className="text-left py-3 px-4 text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 text-gray-600">Maosh</th>
                  <th className="text-left py-3 px-4 text-gray-600">Holat</th>
                  <th className="text-left py-3 px-4 text-gray-600">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleEditEmployee(employee)}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <UserCircle className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="text-gray-900">{employee.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {employee.position}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {employee.phone}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {employee.email}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {employee.salary}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full ${
                          employee.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {employee.status === "active" ? "Faol" : "Nofaol"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditEmployee(employee);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEmployee(employee.id);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h3 className="text-gray-900 mb-6">
                {selectedEmployee
                  ? "Xodim ma'lumotlari"
                  : "Yangi xodim qo'shish"}
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Ism va familiya
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedEmployee?.name}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Lavozim</label>
                  <input
                    type="text"
                    defaultValue={selectedEmployee?.position}
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Telefon</label>
                  <input
                    type="tel"
                    defaultValue={selectedEmployee?.phone}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={selectedEmployee?.email}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Maosh</label>
                  <input
                    type="text"
                    defaultValue={selectedEmployee?.salary}
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Holat</label>
                  <select
                    defaultValue={selectedEmployee?.status}
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "active" | "inactive",
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Faol</option>
                    <option value="inactive">Nofaol</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Saqlash
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

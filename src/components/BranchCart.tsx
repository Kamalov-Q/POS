import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MapPin, Users, User, Circle } from "lucide-react";

interface BranchProps {
  id: number;
  name: string;
  manager: string;
  staff: number;
  phone: string;
  location: string;
  status: "active" | "inactive";
}

export default function BranchCard({ branch }: { branch: BranchProps }) {
  return (
    <Card className="shadow hover:shadow-lg transition-all">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{branch.name}</CardTitle>

        <span
          className={`flex items-center text-sm px-2 py-1 rounded-full ${
            branch.status === "active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          <Circle className="w-3 h-3 mr-1" />
          {branch.status === "active" ? "Faol" : "Faolmas"}
        </span>
      </CardHeader>

      <CardContent className="space-y-2 text-gray-700">
        <p className="flex items-center">
          <User className="w-4 h-4 mr-2" /> Menejer: {branch.manager}
        </p>
        <p className="flex items-center">
          <Users className="w-4 h-4 mr-2" /> Xodimlar: {branch.staff} ta
        </p>
        <p className="flex items-center">
          <Phone className="w-4 h-4 mr-2" /> {branch.phone}
        </p>
        <p className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" /> {branch.location}
        </p>

        <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Filial tafsilotlari
        </button>
      </CardContent>
    </Card>
  );
}

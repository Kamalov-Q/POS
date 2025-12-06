export default function ProfilePage() {
  const user = {
    name: "Quvomiddin Kamalov",
    username: "admin123",
    role: "Administrator",
    email: "admin@example.com",
  };

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Foydalanuvchi Profil</h1>

      <div className="p-4 border rounded-lg shadow">
        <p className="mb-2">
          <strong>Ism:</strong> {user.name}
        </p>
        <p className="mb-2">
          <strong>Login:</strong> {user.username}
        </p>
        <p className="mb-2">
          <strong>Rol:</strong> {user.role}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>

        <button className="mt-4 p-2 bg-green-600 text-white rounded hover:bg-green-700 w-full">
          Ma'lumotlarni o‘zgartirish
        </button>
      </div>
    </div>
  );
}

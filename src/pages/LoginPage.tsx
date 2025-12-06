import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function submit() {
    if (username.trim() && password.trim()) login();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input
          className="border p-2 rounded w-full mb-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full mb-4"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Log in
        </button>
      </div>
    </div>
  );
}

export default LoginPage;

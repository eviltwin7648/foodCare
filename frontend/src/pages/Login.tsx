"use client";
// pages/login.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password },);
      alert("Login successful");
      console.log(response.data);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("token", response.data.token);
      navigate('/')
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">E-Mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter Your Email"
              className="border border-gray-300 p-3 rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter Your Password"
              className="border border-gray-300 p-3 rounded-lg w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-[#FE724C] text-white py-3 rounded-full hover:bg-[#e6623d]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

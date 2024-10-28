"use client";
// pages/register.tsx
import { useState } from "react";
import axios from "axios";

export default function RegisterReceiver() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register/receiver", {
        name,
        email,
        password,
        role,
        number,
        address,
        pincode,
        city,
      });
      alert("Registration successful");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Register as Receiver</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Your Name"
              className="border border-gray-300 p-3 rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">E-Mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Your Email"
              className="border border-gray-300 p-3 rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Your Password"
              className="border border-gray-300 p-3 rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full bg-white"
            >
              <option value="">Select Your Role</option>
              <option value="NGO">NGO</option>
              <option value="INDIVIDUAL">Individual</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Phone Number</label>
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              type="text"
              placeholder="Enter Your Phone Number"
              className="border border-gray-300 p-3 rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Enter Your Address"
              className="border border-gray-300 p-3 rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">Pincode</label>
            <input
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              type="text"
              placeholder="Enter Your Pincode"
              className="border border-gray-300 p-3 rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">City</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="Enter Your City"
              className="border border-gray-300 p-3 rounded-lg w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-[#FE724C] text-white py-3 rounded-full hover:bg-[#e6623d]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

// components/RegisterModal.jsx
import React, { useState } from "react";
import axios from "axios";

const RegisterModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    MobileNumber:"",
    role: "customer",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user/register", formData);
      setMessage("✅ Registration successful!");
      setTimeout(() => {
        onClose(); // Close modal after short delay
      }, 1000);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Registration failed"));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
        >
          ×
        </button>
        <h2 className="text-xl font-bold text-center mb-4">Register</h2>
        {message && (
          <p
            className={`text-sm text-center mb-2 ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="MobileNumber"
            placeholder="Mobile Number"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <select
            name="role"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="customer">Customer</option>
            <option value="assistant">Assistant</option>
          </select>
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
            Register
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full p-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;

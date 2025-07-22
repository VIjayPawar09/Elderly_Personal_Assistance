// components/LoginModal.jsx
import React, { useState } from "react";
import { loginUser } from "../../api/index";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const LoginModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("role", data.user.role);
      const response = await axios.post("http://localhost:5000/user/login", form);
      onClose(); // close modal after login
      if (response.data.user.role === "customer") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <button className="text-white bg-blue-500 px-4 py-2 rounded w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

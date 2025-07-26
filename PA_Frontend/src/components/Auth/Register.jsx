import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    MobileNumber: "",
    role: "customer",
    profilePhoto: null,
  });
  const [photo, setPhoto] = useState(null); // ✅ new state for photo
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Append fields manually for better control
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("MobileNumber", formData.MobileNumber);
      data.append("role", formData.role);

      if (formData.role === "assistant" && photo) {
        data.append("photo", photo); // must match backend field name
      }

      // Debugging: check FormData values
      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      await axios.post("http://localhost:5000/user/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Registration successful!");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setMessage(
        "❌ " + (err.response?.data?.message || "Registration failed")
      );
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
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
              className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-2/4 -translate-y-1/2 text-gray-600 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <input
            type="text"
            name="MobileNumber"
            placeholder="Mobile Number"
            value={formData.MobileNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="customer">Customer</option>
            <option value="assistant">Assistant</option>
          </select>

          {/* ✅ Show this only when role is assistant */}
          {formData.role === "assistant" && (
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
          )}

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

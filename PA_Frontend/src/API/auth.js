// src/api/auth.js
import axios from "axios"; // uses the instance with baseURL

export const loginUser = async (formData) => {
  const response = await axios.post("/auth/login", formData);
  return response;
};

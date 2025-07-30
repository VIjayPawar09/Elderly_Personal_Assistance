import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import mongoose from 'mongoose';
import path from "path";
import http from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser"; // You missed this in HEAD

import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import assistantRoutes from './routes/assistant.js';
import User from './models/User.js';
import Assistant from './models/Assistant.js';
import Customer from './models/Customer.js';
import Message from './models/Message.js'; // For message persistence
import appointmentRoutes from './routes/appointmentRoutes.js'

const app = express();
const server = http.createServer(app);

// ✅ Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // or your frontend prod domain
    methods: ["GET", "POST"]
  }
});
app.use(cors({
  origin: 'http://localhost:5173', // React Vite dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

let onlineUsers = {};

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log("User joined:", userId);
  });

  socket.on("sendMessage", async ({ senderId, receiverId, content }) => {
    const message = new Message({ senderId, receiverId, content });
    await message.save();

    const receiverSocket = onlineUsers[receiverId];
    if (receiverSocket) {
      io.to(receiverSocket).emit("receiveMessage", {
        senderId,
        content,
        timestamp: new Date()
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        break;
      }
    }
  });
});

// // ✅ Middleware
// app.use(cors({
//   origin: 'https://personalassistance.netlify.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use('/user', authRoutes);
app.use('/admin', adminRoutes);
app.use('/api/assistants', assistantRoutes);
app.use("/api/appointments", appointmentRoutes);


// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ✅ Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

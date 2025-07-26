// server.js - Main Express application file
import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import mongoose from 'mongoose';
import path from "path";

import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import assistantRoutes from './routes/assistant.js';
import User from './models/User.js';
import Assistant from './models/Assistant.js';
import Customer from './models/Customer.js';

// Initialize Express app
const app = express();


// Configure middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// JWT secret
 // In production, use environment variable


app.use('/user',authRoutes)
app.use('/admin',adminRoutes)
app.use("/uploads", express.static("uploads"));
app.use('/api/assistants', assistantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

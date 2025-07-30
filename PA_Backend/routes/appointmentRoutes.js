import express from "express";
import { bookAppointment } from "../controllers/appointmentControlller.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/book", protect)
export default router;

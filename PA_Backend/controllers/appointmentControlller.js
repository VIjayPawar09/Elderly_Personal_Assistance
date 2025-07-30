import Appointment from "../models/Appointment.js";

export const bookAppointment = async (req, res) => {
  try {
    const { assistant, hours, time, service, charges, details } = req.body;
    const customerId = req.user._id; // from auth middleware

    const newAppointment = new Appointment({
      assistant,
      hours,
      time,
      service,
      charges,
      details,
      customer: customerId,
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Failed to book appointment" });
  }
};

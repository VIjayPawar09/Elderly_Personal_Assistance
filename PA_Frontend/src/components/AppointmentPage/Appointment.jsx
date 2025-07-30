import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AppointmentPage = () => {
  const location = useLocation();
  const selectedAssistant = location.state?.assistant || null;

  const [formData, setFormData] = useState({
    hours: "",
    time: "",
    service: "",
    customService: "",
    charges: "",
    details: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedService =
      formData.service === "Other" ? formData.customService : formData.service;

    const finalData = {
      ...formData,
      service: selectedService,
      assistant: selectedAssistant?.name || "Not assigned",
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/appointments/book",
        finalData
      );

      alert("✅ Appointment Booked Successfully!");
      navigate("/appointments");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to book appointment");
    }
  };
  const services = [
    "Medications",
    "Doctor Appointment",
    "Health Checkup",
    "Drinking",
    "Watch Movie",
    "Grocery",
    "Electricity Bill",
    "Mobile Bill",
    "Other",
  ];

  const chargesList = [
    { hours: 1, price: "₹100" },
    { hours: 2, price: "₹200" },
    { hours: 3, price: "₹300" },
    { hours: 4, price: "₹400" },
    { hours: 5, price: "₹500" },
    { hours: 8, price: "₹1000" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const makePayment = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       "https://pa-backend-wprc.onrender.com/api/payment/create-order",
  //       { amount: 500 }
  //     );

  //     const options = {
  //       key: "rzp_test_XLPxcvbv8wFLpO",
  //       amount: data.amount,
  //       currency: data.currency,
  //       name: "Personal Assistant App",
  //       description: "Appointment Payment",
  //       order_id: data.orderId,
  //       handler: function (response) {
  //         alert("✅ Payment Successful!");
  //         console.log("Payment:", response);
  //       },
  //       prefill: {
  //         name: "User Name",
  //         email: "user@example.com",
  //         contact: "9999999999",
  //       },
  //       theme: { color: "#3399cc" },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (error) {
  //     console.error("Payment Error:", error);
  //     alert("❌ Payment failed. Please try again.");
  //   }
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mt-14">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Book an Appointment
        </h2>

        {selectedAssistant && (
          <div className="mb-4 p-4 bg-indigo-100 rounded-md shadow-sm text-center">
            <h3 className="text-lg font-semibold text-indigo-700">
              Assigned Assistant
            </h3>
            <p className="text-gray-800">{selectedAssistant.name}</p>
            <p className="text-gray-600">📱 {selectedAssistant.mobile}</p>
            <img
              src={selectedAssistant.profilePic}
              alt={selectedAssistant.name}
              className="w-16 h-16 rounded-full mx-auto mt-2 border border-indigo-500"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Assigned Assistant (Read-only) */}
          <div>
            <label
              htmlFor="assistant"
              className="block text-gray-700 font-medium mb-1"
            >
              Assigned Assistant
            </label>
            <input
              type="text"
              id="assistant"
              name="assistant"
              value={selectedAssistant?.name || "Not Assigned"}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
            />
          </div>

          {/* Hours */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Number of Hours
            </label>
            <input
              type="number"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Preferred Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {/* Service */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select Service
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service, idx) => (
                <option key={idx} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Service */}
          {formData.service === "Other" && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Specify Your Service
              </label>
              <input
                type="text"
                name="customService"
                value={formData.customService}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your service..."
                required
              />
            </div>
          )}

          {/* Charges */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Charges
            </label>
            <select
              name="charges"
              value={formData.charges}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="" disabled>
                Select based on hours
              </option>
              {chargesList.map((charge, idx) => (
                <option key={idx} value={charge.hours}>
                  {charge.hours} Hour(s) - {charge.price}
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Address
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your address..."
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentPage;

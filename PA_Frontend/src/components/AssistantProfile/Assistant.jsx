import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AssistantProfile = () => {
  const [assistants, setAssistants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        const res = await axios.get("/api/assistants");
        console.log("API Response:", res.data); // DEBUG
        setAssistants(
          Array.isArray(res.data) ? res.data : res.data.assistants || []
        );
      } catch (err) {
        console.error("Failed to fetch assistants", err);
      }
    };

    fetchAssistants();
  }, []);

  const handleAssign = (assistant) => {
    navigate("/dashboard/book", { state: { assistant } });
  };

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white py-16 px-4">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-12">
        Meet Our Trusted Assistants
      </h1>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {assistants.map((assistant, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center"
          >
            <img
              src={assistant.profilePic}
              alt={assistant.name}
              className="w-28 h-28 object-cover rounded-full mx-auto border-4 border-indigo-500 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {assistant.name}
            </h2>
            <p className="text-gray-500">Age: {assistant.age}</p>
            <p className="text-gray-500">📱 {assistant.mobile}</p>

            <div className="mt-3 flex justify-center items-center">
              <span className="text-gray-600 mr-2">Rating:</span>
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={
                      i < Math.floor(assistant.rating) ? "gold" : "lightgray"
                    }
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M12 .587l3.668 7.453L24 9.576l-6 5.84 1.414 8.243L12 18.896l-7.414 4.763L6 15.416 0 9.576l8.332-1.536z" />
                  </svg>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleAssign(assistant)}
              className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm transition"
            >
              Assign Assistant
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssistantProfile;

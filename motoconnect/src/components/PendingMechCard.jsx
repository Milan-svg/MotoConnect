import React from "react";

export function PendingMechCard({ mechanic, onView }) {
  return (
    <div className="p-6 shadow-md rounded-xl bg-white hover:shadow-lg hover:scale-105 transition-transform duration-300">
      <h2 className="text-lg font-semibold text-black">{mechanic.name}</h2>
      <p className="text-sm text-gray-700">Location: {mechanic.location}</p>
      <p className="text-sm text-gray-700">
        Services: {mechanic.servicesOffered?.join(", ") || "Not specified"}
      </p>
      <button
        className="mt-4 px-3 py-1 bg-blue-600 text-white rounded-md shadow-lg"
        onClick={onView}
      >
        View Details
      </button>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export function MechanicCard({ mechanic }) {
  return (
    <Link to={`/mechanic/${mechanic.id}`}>
      <div className="p-6 shadow-md rounded-xl bg-white hover:shadow-lg hover:scale-105 transition-transform duration-300">
        <h2 className="text-lg font-semibold">{mechanic.name}</h2>
        <p className="text-sm text-gray-700">Location: {mechanic.location}</p>
        <p className="text-sm text-gray-700">
          Services: {mechanic.servicesOffered?.join(", ") || "Not specified"}
        </p>
        <p
          className={`text-sm ${
            mechanic.available ? "text-green-600" : "text-red-500"
          }`}
        >
          Status: {mechanic.available ? "Available" : "Not Available"}
        </p>
      </div>
    </Link>
  );
}

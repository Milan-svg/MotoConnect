import React from "react";

export function MechanicGallery() {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Workshop Images</h2>
      <div className="flex gap-4 pb-2 overflow-x-auto">
        <img
          className=" rounded-xl w-64 h-48 object-cover"
          src="https://placehold.co/400x300"
          alt="Garage Work"
        />
        <img
          className=" rounded-xl w-64 h-48 object-cover"
          src="https://placehold.co/400x300"
          alt="Garage Work"
        />
        <img
          className=" rounded-xl w-64 h-48 object-cover"
          src="https://placehold.co/400x300"
          alt="Garage Work"
        />
      </div>
    </div>
  );
}

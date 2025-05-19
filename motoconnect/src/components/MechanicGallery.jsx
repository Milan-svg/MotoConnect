import React from "react";

export function MechanicGallery() {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Workshop Images</h2>
      <div className="flex gap-4 pb-2 overflow-x-auto">
        <img
          className="rounded-xl w-80 h-56 object-cover"
          src="/stock1.jpg"
          alt="Garage Work"
        />
        <img
          className="rounded-xl w-80 h-56 object-cover"
          src="/stock2.jpg"
          alt="Garage Work"
        />
        <img
          className="rounded-xl w-80 h-56 object-cover"
          src="/stock4.jpg"
          alt="Garage Work"
        />
      </div>
    </div>
  );
}

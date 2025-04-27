import React from "react";

export function ReviewCard({ userName, review, ratingNum, date }) {
  return (
    <div className="bg-white text-black p-4 rounded-xl shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-white hover:to-gray-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">{userName}</h3>
        <p className="text-sm">
          {date?.toDate ? date.toDate().toLocaleDateString() : "Unknown Date"}
        </p>
      </div>
      <p className="text-md mb-3">{review}</p>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={index < ratingNum ? "text-yellow-400" : "text-gray-500"}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}

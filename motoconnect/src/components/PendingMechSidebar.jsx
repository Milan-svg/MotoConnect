import React from "react";
import { X } from "lucide-react";
function PendingMechSidebar({
  mechanic,
  onClose,
  onApprove,
  onDelete,
  isOpen,
}) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] max-w-full bg-gray-400 z-50 p-4 shadow-2xl overflow-y-auto border-l border-gray-300 rounded-l-2xl
        transition-transform duration-300 ease-in-out transform mt-2 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {!mechanic ? (
          <div className="text-center text-white mt-20">Loading...</div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4 gap-4">
              <h2 className="text-xl font-semibold">Mechanic Details</h2>
              <button className="text-white hover:text-black" onClick={onClose}>
                <X />
              </button>
            </div>
            <div className="flex flex-col gap-3 mt-44">
              <div>
                <h3 className="text-lg font-medium text-gray-700">Name</h3>
                <p className="text-black">{mechanic.name}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700">Location</h3>
                <p className="text-black">
                  {mechanic.location || "Location not provided"}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700">
                  Services Offered
                </h3>
                <p className="text-black">
                  {mechanic.servicesOffered?.join(", ") || "Not specified"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Contact</h3>
                <p className="text-black">
                  {mechanic.contact || "Not provided"}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                onClick={() => onApprove(mechanic)}
              >
                Approve
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this mechanic?"
                    )
                  ) {
                    onDelete(mechanic.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PendingMechSidebar;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addMechanic } from "../services/mechanicServices";
import { useForm } from "react-hook-form";

function RecommendMechanic() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user, isAuthReady } = useSelector((state) => state.auth);
  const [coords, setCoords] = useState({ lat: null, lng: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        toast.error("Failed to get location. Please enable location access.");
      }
    );
  }, []);

  const handleAddMechanic = async (data) => {
    if (!user?.id) {
      toast.error("You must be logged in to submit a mechanuc recommendation");
      return;
    }
    if (!coords.lat || !coords.lng) {
      toast.error("Location data not available yet");
      return;
    }
    const mechanicData = {
      ...data,
      lat: coords.lat,
      lng: coords.lng,
      servicesOffered: data.servicesOffered.split(", ").map((s) => s.trim()),
      submittedBy: {
        id: user.id,
        userName: user.userName || "anonymous",
      },
    };
    const isSuccess = await addMechanic(mechanicData);
    if (isSuccess) {
      toast.success("Mechanic recommendation submitted!");
      reset();
    }
  };
  if (!isAuthReady) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Checking your login status...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col justify-center items-center gap-4 bg-slate-100 text-black rounded-lg p-4 w-full max-w-7xl mx-4 ">
        <h2 className="text-2xl font-semibold  mb-4">Recommend a Mechanic</h2>
        <form
          onSubmit={handleSubmit(handleAddMechanic)}
          className="flex flex-col gap-2"
        >
          <div>
            <input
              type="text"
              placeholder="Mechanic Name"
              className="border p-2 rounded"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="text-red-500"> Name is Required</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Contact Number"
              {...register("contact", {
                required: true,
                pattern: /^[0-9+\s]+$/,
              })}
              className="w-full border p-2 rounded"
            />
            {errors.contact && (
              <p className="text-red-500">Invalid contact number</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Location (City/Area)"
              {...register("location", { required: true })}
              className="w-full border p-2 rounded"
            />
            {errors.location && (
              <p className="text-red-500">Location is required.</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Services (comma-separated)"
              {...register("servicesOffered", { required: true })}
              className="w-full border p-2 rounded"
            />
            {errors.servicesOffered && (
              <p className="text-red-500">Services are required.</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white px-2 py-1 mt-4 rounded-md shadow-md"
          >
            Submit Recommendation
          </button>
        </form>
      </div>
    </div>
  );
}

export default RecommendMechanic;

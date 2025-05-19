import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addMechanic } from "../services/mechanicServices";
import { useForm } from "react-hook-form";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
function RecommendMechanic() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user, isAuthReady } = useSelector((state) => state.auth);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const autoCompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    const place = autoCompleteRef.current.getPlace();
    if (!place.geometry || !place.geometry.location) {
      toast.error("Invalid ocation selected :/");
      return;
    }
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setCoords({ lat, lng });
  };

  const handleAddMechanic = async (data) => {
    if (!user?.id) {
      toast.error("You must be logged in to submit a mechanuc recommendation");
      return;
    }
    const contactFormatted = `+91 ${data.contact}`;
    const mechanicData = {
      ...data,
      contact: contactFormatted,
      ...coords,
      // lat: 28.6139,
      // lng: 77.209,
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
    // <div className="flex items-center justify-center min-h-screen px-4">
    <main className="relative h-screen w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/stock-image.jpg')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>
      <section className="relative z-10 flex flex-col items-center justify-center h-full text-white  px-4">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 md:p-10">
          <h2 className="text-3xl font-semibold mb-6 text-center text-black">
            Recommend a Mechanic
          </h2>
          <form
            onSubmit={handleSubmit(handleAddMechanic)}
            className="space-y-4 text-black"
          >
            <div>
              <label className="block font-medium mb-1">Mechanic Name</label>
              <input
                type="text"
                placeholder="Mechanic Name"
                {...register("name", { required: true })}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Contact Number</label>
              <input
                type="text"
                placeholder="Contact Number"
                inputMode="numeric"
                {...register("contact", {
                  required: true,
                  pattern: /^[0-9+\s]+$/,
                })}
                maxLength={10}
                minLength={10}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">
                  Invalid contact number
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">
                Location (City / Area)
              </label>
              <Autocomplete
                onLoad={(ref) => (autoCompleteRef.current = ref)}
                onPlaceChanged={handlePlaceSelect}
              >
                <input
                  type="text"
                  placeholder="E.g. Andheri West, Mumbai"
                  {...register("location", { required: true })}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </Autocomplete>
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  Location is required
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">
                Services Offered (comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. Engine Repair, Oil Change, AC Service"
                {...register("servicesOffered", { required: true })}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.servicesOffered && (
                <p className="text-red-500 text-sm mt-1">
                  At least one service is required
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded mt-4 hover:bg-gray-900 transition duration-300"
            >
              Submit Recommendation
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default RecommendMechanic;

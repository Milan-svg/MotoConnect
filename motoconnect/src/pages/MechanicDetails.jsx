import React, { useEffect, useState } from "react";
import { getAllMechanics } from "../services/mechanicServices";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { MechanicGallery } from "../components/MechanicGallery";
import { ReviewCard } from "../components/ReviewCard";
import { MechanicMap } from "../components/MechanicMap";
import { getMechanicRatings } from "../services/mechanicServices";
function MechanicDetails() {
  const [mechanic, setMechanic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ratings, setRatings] = useState([]);
  const { id } = useParams(); // get id from url

  useEffect(() => {
    const getMechanic = async () => {
      try {
        const list = await getAllMechanics();
        const mechanic = list.find((mechanic) => mechanic.id === id);
        setMechanic(mechanic);
      } catch (err) {
        console.log("Failed to fetch  mechanic");
        toast.error("Couldn't load mechanic details : (");
      } finally {
        setIsLoading(false);
      }
    };

    getMechanic();
  }, [id]);

  useEffect(() => {
    const getRatings = async () => {
      try {
        const fetchedRatings = await getMechanicRatings(id);
        setRatings(fetchedRatings);
      } catch (err) {
        console.log("error while fetching ratings", err.message);
      }
    };
    getRatings();
  }, [id]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold">Loading mechanic details...</p>
      </div>
    );
  if (!isLoading && !mechanic) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold">Mechanic not found!</p>
      </div>
    );
  }

  return (
    <div className=" p-6 min-h-screen text-white ">
      {/* info sectiom */}
      <div className="flex  flex-col md:flex-row items-start justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold  ">{mechanic.name}</h1>
          <p className="text-lg ">Location: {mechanic.location}</p>
          <p className="text-lg ">contact: {mechanic.contact}</p>
        </div>
        <div>
          <p className="text-md">Location: {mechanic.location}</p>
          <p
            className={`text-lg font-semibold ${
              mechanic.available ? "text-green-600" : "text-red-500"
            }`}
            x
          >
            {mechanic.available ? "Available" : "Not available"}
          </p>
        </div>
      </div>
      {/* Services Section */}
      <div className="mb-10">
        <h2 className="mb-4 text-lg">Services Offered:</h2>
        <div className="flex gap-4 overflow-x-auto">
          {mechanic.servicesOffered?.map((service, index) => (
            <span key={index} className="bg-green-700 px-3 py-1 rounded-md">
              {service}
            </span>
          )) || <p>No services listed</p>}
        </div>
      </div>

      {/* Product image section  */}
      <MechanicGallery />

      {/* Reviews Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {ratings.length !== 0 ? (
            ratings.map((rating) => (
              <ReviewCard
                key={rating.id}
                userName={rating.userName}
                review={rating.review}
                date={rating.timestamp}
                ratingNum={rating.rating}
              />
            ))
          ) : (
            <p>Could'nt find ratings for this mechanic : /</p>
          )}
        </div>
      </div>
      {/* Map Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Location on Map</h2>
        <div className="rounded-lg overflow-hidden">
          {/* Map here, static image foor now */}
          <MechanicMap
            lat={mechanic.lat || 28.6139}
            lng={mechanic.lng || 77.209}
            name={mechanic.name}
          />
        </div>
      </div>
    </div>
  );
}

export default MechanicDetails;

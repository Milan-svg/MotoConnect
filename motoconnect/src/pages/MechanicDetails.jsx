import React, { useEffect, useState } from "react";
import {
  addMechanicRating,
  getAllMechanics,
} from "../services/mechanicServices";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { MechanicGallery } from "../components/MechanicGallery";
import { ReviewCard } from "../components/ReviewCard";
import { MechanicMap } from "../components/MechanicMap";
import { getMechanicRatings } from "../services/mechanicServices";
import { listenToAuthChanges } from "../firebase/authHelpers";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../redux/authSlice";
function MechanicDetails() {
  const [mechanic, setMechanic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ratings, setRatings] = useState([]);
  const { id } = useParams(); // get id from url

  // for adding reviews
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!mechanic || !user || !user.id || !user.userName) {
      toast.error("User or Mechanic details not loaded yet!");
      return;
    }
    if (rating !== undefined && review.trim()) {
      try {
        await addMechanicRating(
          mechanic.id,
          user.id,
          user.userName,
          rating,
          review
        );
        toast.success("Review added successfully");

        //clear the fields
        setRating(0);
        setReview("");
        // re-fetch the ratings
        const fetchedRatings = await getMechanicRatings(id);
        setRatings(fetchedRatings);
      } catch (err) {
        console.log("error while adding rating", err.message);
        toast.error("couldn't add the review :/");
      }
    } else {
      toast.error("please provide a rating and a review!");
    }
  };
  //checking for current user via redux state
  const user = useSelector((state) => state.auth.user);

  // fetching the said mechanic
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

  //fetching all reviews. code says ratings, but its a list of review objects
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
            <p>Couldn't find ratings for this mechanic : /</p>
          )}
        </div>
        {user && !ratings.find((rating) => rating.id === user.id) ? (
          <div className=" flex flex-col bg-white text-black p-6 rounded-xl shadow-md mt-8 w-full">
            <h3 className=" text-xl font-semibold mb-4 ">Write a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <input
                type="text"
                placeholder="write a review!"
                className="rounded-lg "
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    onClick={() => setRating(index + 1)}
                    className={`cursor-pointer text-2xl ${
                      index < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button
                type="submit"
                className="bg-gray-700 text-white py-1 px-2 rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <h2>you have already reviewed this Mechanic!</h2>
        )}
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

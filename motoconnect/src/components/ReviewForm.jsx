import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listenToAuthChanges } from "../firebase/authHelpers";
import { useForm } from "react-hook-form";

export function ReviewForm() {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  return (
    <div>
      <form action="">
        <input type="text" placeholder="" />
      </form>
    </div>
  );
}

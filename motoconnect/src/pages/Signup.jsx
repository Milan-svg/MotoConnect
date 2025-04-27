import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listenToAuthChanges, signupUser } from "../firebase/authHelpers";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../redux/authSlice";
import AuthForm from "../components/AuthForm";
import { toast } from "react-hot-toast";
function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = listenToAuthChanges((user) => {
      if (!user) {
        dispatch(clearUser());
      } else {
        dispatch(setUser(user));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRegisterSubmit = async (email, password) => {
    try {
      const createdUser = await signupUser(email, password);
      console.log("User created:", createdUser.user);
      dispatch(setUser(createdUser.user));
      toast.success("Sign up was successfull");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300">
      <div className=" card w-full max-w-md shadow-2xl bg-base-100 p-5 ">
        <h2 className="text-center text-2xl font-bold mb-5">Sign Up</h2>
        <AuthForm
          buttonText="SignUp"
          handleSubmitAction={handleRegisterSubmit}
        />
        <p className="mt-2">
          Already have a Motoconnect account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

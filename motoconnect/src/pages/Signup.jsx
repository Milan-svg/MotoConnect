import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listenToAuthChanges, signupUser } from "../firebase/authHelpers";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../redux/authSlice";
import AuthForm from "../components/AuthForm";
import { toast } from "react-hot-toast";
import { createUserDoc } from "../services/mechanicServices";
import { sendEmailVerification } from "firebase/auth";
function Signup() {
  const navigate = useNavigate();

  const handleRegisterSubmit = async (email, password) => {
    try {
      const createdUser = await signupUser(email, password);
      //console.log("User created:", createdUser.user);
      await sendEmailVerification(createdUser.user);
      toast.success("Check your email to verify your account");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  //flex items-center justify-center bg-base-300

  return (
    <main className="h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/stock-image.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>
      <section className="flex h-full relative z-10 items-center justify-center  mx-2">
        <div className="card w-full max-w-md shadow-2xl bg-base-100 p-5 ">
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
      </section>
    </main>
  );
}

export default Signup;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listenToAuthChanges, signupUser } from "../firebase/authHelpers";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../redux/authSlice";
import AuthForm from "../components/AuthForm";
import { toast } from "react-hot-toast";
import { createUserDoc } from "../services/mechanicServices";
function Signup() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleRegisterSubmit = async (email, password) => {
    try {
      const createdUser = await signupUser(email, password);
      //console.log("User created:", createdUser.user);
      await createUserDoc(createdUser.user);
      //createUserDoc me we pass user(from firebaseauth) & create user doc with id,email,role&username. dont need to dispatch anything to redux here cause were doing that in app.jsx. checking for user using listentoauthchanges, if auth detecs a user we dispatch to redux. in there if theres a doc avail, createuserdoc returns that and if there isnt, it makes one, and includes the standard id,email,role&username fields. thatswhy we use it in signup as user is being created so a doc needs to be made.
      // 2 things being done here-> user doc create, and signupUser call, which triggers listentoauthchanges in the app.jsx, leading to successfull population of redux user.
      toast.success("Sign up was successfull");
      navigate("/");
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

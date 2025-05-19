import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listenToAuthChanges, loginUser } from "../firebase/authHelpers";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../redux/authSlice";
import AuthForm from "../components/AuthForm";
import toast from "react-hot-toast";
function Login() {
  const navigate = useNavigate();

  const handleLoginSubmit = async (email, password) => {
    //email password come from authform.
    try {
      const userDetails = await loginUser(email, password); // helper firebase login func. sends data to firebase., logs u in on the server., returns user details which well pass on to redux memory.
      //console.log("User logged in:", userDetails.user);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      console.log("error while login:", err.message);
      toast.error(err.message);
    }
  };

  return (
    // main container, full height screen, flexbox to center every child items

    <main className=" relative h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/stock-image.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>
      {/* center card */}
      <section className="flex h-full relative z-10 items-center justify-center  mx-2">
        <div className=" card w-full max-w-md shadow-2xl bg-base-100 p-5 ">
          <h2 className="text-center text-2xl font-bold mb-5">LogIn</h2>
          {/* form */}
          <AuthForm buttonText="Login" handleSubmitAction={handleLoginSubmit} />

          {/* RegiaterLink */}
          <p className="mt-2">
            Dont have an account?{" "}
            <Link to="/register" className="text-blue-400">
              Register
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, logoutUser } from "../firebase/authHelpers";
import AuthForm from "../components/AuthForm";
import toast from "react-hot-toast";
import { auth } from "../firebase/firebase";
function Login() {
  const navigate = useNavigate();

  const handleLoginSubmit = async (email, password) => {
    //email password come from authform.
    try {
      await loginUser(email, password);
      await auth.currentUser.reload();
      const verified = auth.currentUser.emailVerified;
      if (!verified) {
        toast.error("Please verify your email");
        await logoutUser();
        return;
      }
      // helper firebase login func. sends data to firebase., before it logs u in on the server,
      //force reload, so whenevr login button is pressed, it checks if user has verified their creds, if not,log them out, if yes, redirect to"/", redux population of data will be handled in app.jsx.
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
          <h2 className="text-center text-2xl font-bold mb-5">Login</h2>
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

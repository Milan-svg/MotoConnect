import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listenToAuthChanges, loginUser } from "../firebase/authHelpers";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../redux/authSlice";
import AuthForm from "../components/AuthForm";
import toast from "react-hot-toast";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // run listentoauthchanges on startup, firebase func that checks if a user is logged in, and runs the callback func we pass.
  useEffect(() => {
    const unsubscribe = listenToAuthChanges((user) => {
      // dont have to fetch user on startup from anywhere, firebase handles that.
      if (!user) {
        dispatch(clearUser());
      } else {
        dispatch(setUser(user));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLoginSubmit = async (email, password) => {
    //email password come from authform.
    try {
      const userDetails = await loginUser(email, password); // loginUser is helper for firebase login func. sends data to firebase., logs u in on the server., returns user details which well pass on to redux memory.
      console.log("User logged in:", userDetails.user);
      dispatch(setUser(userDetails.user));
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      console.log("error while login:", err.message);
      toast.error(err.message);
    }
  };

  return (
    // main container, full height screen, flexbox to center every child items
    <div className="min-h-screen flex items-center justify-center bg-base-300">
      {/* center card */}
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
    </div>
  );
}

export default Login;

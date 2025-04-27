import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
function ProtectedRoute({ children }) {
  const { user, isAuthReady } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthReady && !user) {
      toast.error("Login to access this page");
    }
  }, [isAuthReady, user]);
  // well see if user exists in redux state, if no, redirect to login,if yes, render the children
  //since redux and firebase auth keeps in sync all the time due to us using useeffect+onAuthChange method from firebase, redux se user check krna is safe and preferred.

  if (!isAuthReady) {
    //redux auth status isnt ready, still checking with firebase at this point
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  if (!user) {
    //not logged in
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
export function AdminRoute({ children }) {
  const { user, isAuthReady } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthReady && !user) {
      toast.error("Login to access this page");
    }
  }, [isAuthReady, user]);
  if (!isAuthReady) {
    //redux auth status isnt ready, still checking with firebase at this point
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  //console.log(user.role);
  if (user.role !== "admin") {
    return <Navigate to="/not-authorized" />;
  }
  return children;
}

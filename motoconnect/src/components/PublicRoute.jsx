import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export function PublicRoute({ children }) {
  const { user, isAuthReady } = useSelector((state) => state.auth);

  if (!isAuthReady) {
    //redux auth status isnt ready, still checking with firebase at this point
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  if (user) {
    // logged in
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

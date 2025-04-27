import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../firebase/authHelpers";
import { clearUser } from "../redux/authSlice";
import toast from "react-hot-toast";
function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(clearUser());
      toast.success("Logout successfull");
    } catch (err) {
      console.log("error while logging out:", err.message);
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          MotoConnect
        </Link>
      </div>

      <div className="flex-none hidden md:flex">
        <ul className="menu px-1 menu-horizontal">
          <li>
            <Link to="/mechanicslist">Find Mechanics</Link>
          </li>
          <li>
            <Link to="/meetups">Meetups</Link>
          </li>
        </ul>
      </div>

      <div className="flex-none">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden md:inline">
              Hello,{user.displayName || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error btn-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-sm">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

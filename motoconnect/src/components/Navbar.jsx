import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../firebase/authHelpers";
import { clearUser } from "../redux/authSlice";
import toast from "react-hot-toast";
import { ChevronLeft, Menu } from "lucide-react";
function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(clearUser());
      toast.success("Logout successfull");
    } catch (err) {
      console.log("error while logging out:", err.message);
    }
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="flex-1 flex items-center gap-2">
        <button
          onClick={handleBack}
          className="btn btn-ghost btn-circle text-xl"
        >
          <ChevronLeft />
        </button>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          MotoConnect
        </Link>
      </div>
      {/* desktopnav */}
      <div className="flex-none hidden md:flex">
        <ul className="menu px-1 menu-horizontal">
          <li>
            <Link to="/mechanicslist">
              <h1 className="text-lg">Find Mechanics</h1>
            </Link>
          </li>
          <li>
            <Link to="/recommend">
              <h1 className="text-lg">Add a Mechanic</h1>
            </Link>
          </li>
        </ul>
      </div>
      {user ? (
        <div className="hidden md:flex items-center gap-3">
          <span className="hidden md:inline text-lg">
            Hello,{user.displayName || user.email}
          </span>
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-error btn-md"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="hidden md:flex gap-2">
          <Link to="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
          <Link to="/register" className="btn btn-outline btn-sm">
            Register
          </Link>
        </div>
      )}

      {/* Mobile Menu */}
      <div className="dropdown dropdown-end md:hidden">
        <label className="btn btn-ghost btn-circle" tabIndex={0}>
          <Menu />
        </label>
        <ul
          className="menu menu-sm dropdown-content mt-3 z-[999] p-2 shadow bg-base-100 rounded-box w-52 max-w-xs"
          tabIndex={0}
        >
          <li>
            <Link
              to="/mechanicslist"
              className="btn btn-ghost justify-start w-full "
            >
              Find Mechanics
            </Link>
          </li>
          <li>
            <Link
              to="/recommend"
              className="btn btn-ghost justify-start w-full"
            >
              Add a Mechanic
            </Link>
          </li>
          {/* divide div */}
          <li>
            <div className="border-t my-2 border-gray-200" />
          </li>
          {/* mobie menu */}
          {user ? (
            <>
              <li>
                <span className="px-4 py-2 font-semibold block text-center truncate">
                  {user.displayName || user.email}
                </span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-sm w-full mt-1"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="mb-2">
                <Link to="/login" className="btn btn-primary btn-sm w-full">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn bg-gray-700 btn-sm w-full">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

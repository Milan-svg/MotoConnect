import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import MechanicsList from "./pages/MechanicsList";
import MechanicDetails from "./pages/MechanicDetails";
import RecommendMechanic from "./pages/RecommendMechanic";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listenToAuthChanges } from "./firebase/authHelpers";
import { clearUser, setUser } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = listenToAuthChanges((user) => {
      if (user) {
        dispatch(
          setUser({
            id: user.uid,
            userName: user.displayName || user.email || "Anonymous",
            email: user.email,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, []);

  const isAuthReady = useSelector((state) => state.auth.isAuthReady);

  if (!isAuthReady) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl">Loading authentication status...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/mechanicslist" element={<MechanicsList />} />
        <Route path="/mechanic/:id" element={<MechanicDetails />} />
        <Route
          path="/recommend"
          element={
            <ProtectedRoute>
              <RecommendMechanic />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

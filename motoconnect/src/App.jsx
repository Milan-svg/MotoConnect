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
import AdminDashboard from "./pages/AdminDashboard";
import { createUserDoc } from "./services/mechanicServices";
import { AdminRoute } from "./components/AdminRoute";
import { NotAuthorized } from "./components/NotAuthorized";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = listenToAuthChanges(async (user) => {
      if (user) {
        const userDoc = await createUserDoc(user);
        dispatch(setUser(userDoc));
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
          path="/not-authorized"
          element={
            <ProtectedRoute>
              <NotAuthorized />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommend"
          element={
            <ProtectedRoute>
              <RecommendMechanic />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

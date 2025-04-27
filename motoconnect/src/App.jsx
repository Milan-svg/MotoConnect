import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import MechanicsList from "./pages/MechanicsList";
import MechanicDetails from "./pages/MechanicDetails";
import Meetups from "./pages/Meetups";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
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
          path="/meetups"
          element={
            <ProtectedRoute>
              <Meetups />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

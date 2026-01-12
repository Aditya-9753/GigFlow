import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

import Gigs from "./pages/Gigs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GigDetails from "./pages/GigDetails";
import PostGig from "./pages/PostGig";   // ✅ FIX

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Gigs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gig/:id" element={<GigDetails />} />
          <Route path="/post-gig" element={<PostGig />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

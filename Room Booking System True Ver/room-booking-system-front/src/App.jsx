import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./auth/ProtectedRoute";
import RoleRoute from "./auth/RoleRoute";
import User from "./pages/User";
import BookRoom from "./rooms/BookRoom.jsx"
import Promotions from "./pages/Promotions.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected */}
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rooms/:roomNo/book"
          element={
            <ProtectedRoute>
              <BookRoom/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <RoleRoute allowedRoles={["admin", "staff"]}>
              <Users />
            </RoleRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
          }
        />
        <Route
          path="/promotions"
          element={
            <RoleRoute allowedRoles={["admin", "staff"]}>
              <Promotions />
            </RoleRoute>
          }
         />
      </Routes>
    </>
  );
}

export default App;
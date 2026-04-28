import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Bookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const url =
      user.role === "admin" || user.role === "staff"
        ? "http://localhost:3000/bookings"
        : `http://localhost:3000/bookings?userId=${user.id}`;

    fetch(url, { credentials: "include" })
      .then((res) => res.json())
      .then(setBookings);
  }, [user]);

  return (
    <div>
      <h1>Bookings</h1>

      {bookings.map((b) => (
        <div key={b.id}>
          Room: {b.room}
          <br />
          Date: {b.date}
        </div>
      ))}
    </div>
  );
}
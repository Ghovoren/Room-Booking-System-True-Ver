import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Rooms() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/rooms", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setRooms);
  }, []);

  return (
    <div>
      <h1>Rooms</h1>

      {rooms.map((r) => (
        <div key={r.id}>
          <p>{r.name}</p>

          {user.role === "staff" || user.role === "admin" ? (
            <button>Edit Room</button>
          ) : null}
        </div>
      ))}
    </div>
  );
}
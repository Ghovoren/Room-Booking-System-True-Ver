import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import RoomCard from "../components/RoomCard"

export default function Rooms() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (!user) return
    const url =
      user.role === "admin" || user.role === "staff"
        ? "http://localhost:3000/rooms"
        : `http://localhost:3000/rooms/filter`

    fetch(url, {credentials: "include"})
      .then((res) => {
        if(!res.ok){
          throw new Error('Request Failed')
        }
        return res.json()
      })
      .then((data) => {
        setRooms(data.result || [])
      })
      .catch((error) => {
        console.error(error)
        setRooms([])
      })
  }, [user]);

  return (
    <div>
      <h1>Rooms</h1>

      {rooms.map((r) => (
        <RoomCard room = {r} user = {user}/>
      ))}
      {user.role ==='staff' || user.role === 'admin' ? (
          <button style={style.button}>Create New Room</button>
      ) : null}
    </div>
  );
}

const style = {
  button: {
    width: "100%",
    height: "40px",
    margin: "5px"
  }
}
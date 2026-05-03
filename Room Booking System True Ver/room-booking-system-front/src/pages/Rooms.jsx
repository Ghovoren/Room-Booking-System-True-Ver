import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import RoomCard from "../rooms/RoomCard.jsx"
import { apiFetch } from "../auth/ApiFetch.jsx"
import RoomCardForm from "../rooms/CreateRoom.jsx";

export default function Rooms() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([])
  const [showForm, setShowForm] = useState(false)

  const handleAddRoom = (newRoom) => {
    setRooms(prev => [...prev, newRoom])
    setShowForm(false)
  }


  useEffect(() => {
    if (!user) return
    const url =
      user.role === "admin" || user.role === "staff"
        ? "http://localhost:3000/rooms"
        : `http://localhost:3000/rooms/filter`

    apiFetch(url, {credentials: "include"})
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
        alert(`Error: ${error.message}`)
        setRooms([])
      })
  }, [user]);

  return (
    <div>
      <h1>Rooms</h1>

      {rooms.map((r) => (
        <RoomCard key={r.room_no} room = {r} user = {user} setRooms={setRooms}/>
      ))}
      {user?.role ==='staff' || user?.role === 'admin' ? (
        <>
          {showForm && <RoomCardForm onCreate={handleAddRoom}/>}
          <button onClick={() => setShowForm(prev => !prev)}>
            Create New Room
          </button>
        </>
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
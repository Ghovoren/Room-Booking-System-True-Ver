import { useState, useEffect } from "react";
import RoomCardBase from "./RoomCardBase.jsx";
import {roomCardStyle} from "./RoomCard.jsx"

export default function StaffRoomCard({ room , setRooms}) {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState(null);

    useEffect(() => {
        if (room) {
            setForm({
                name: room.name,
                capacity: room.capacity,
                price: room,
            });
        }
    }, [room]);

    async function handleSubmit(e){
        e.preventDefault()

        const updatedRoom = {
            ...room,
            name: form.name,
            capacity: Number(form.capacity),
            price: Number(form.price),
        }
        const res = await fetch(`http://localhost:3000/rooms/${room.room_no}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({ name: updatedRoom.name, capacity: updatedRoom.capacity, price: updatedRoom.price  })
        })
        
        if (!res.ok){
            throw new Error('Request Failed')
        }
        setRooms(prev =>
            prev.map(r =>
                r.room_no === room.room_no
                    ? { ...r, ...updatedRoom }
                    : r
            )
        );
        setIsEditing(false);
        

    }

    return (
        <div style={roomCardStyle.card}>
            <div style={roomCardStyle.leftColumn}>
                {isEditing ? (
                    <>
                        <form
                            id="roomForm"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "75%",
                            }}
                            onSubmit={handleSubmit}
                        >
                            <label>Name:</label>
                            <input defaultValue={form?.name} style={roomCardStyle.nameInput} />

                            <label>Capacity:</label>
                            <input defaultValue={form?.capacity} />

                            <label>Price:</label>
                            <input defaultValue={form?.price} />
                        </form>

                        <button style={roomCardStyle.flushButton} type="submit" form="roomForm">
                            Confirm
                        </button>

                        <button style={roomCardStyle.button} onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <RoomCardBase room={room} />

                        <button
                            style={roomCardStyle.flushButton}
                            type={"button"}
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Room
                        </button>
                    </>
                )}
            </div>

            <div style={roomCardStyle.rightColumn}>
                <img
                    src="../../public/meeting-room-design-6_xsvlec.jpg"
                    alt="Room"
                    style={roomCardStyle.image}
                />

                <button style={roomCardStyle.button}>Change Photo</button>
            </div>
        </div>
    );
}
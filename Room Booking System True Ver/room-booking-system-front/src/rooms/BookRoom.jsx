import { useState } from "react";
import { style } from "./style";
import { useAuth } from "../auth/AuthContext";
import { useParams } from "react-router-dom";
import { apiFetch } from "../auth/ApiFetch";
import { useNavigate } from "react-router-dom";

export default function BookRoom() {
    const { user } = useAuth()
    const { roomNo } = useParams()
    const [date, setDate] = useState("");
    const [start, setStart] = useState("08:00");
    const [end, setEnd] = useState("10:00");
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();

        if (start >= end) {
            alert("End time must be after start time");
            return;
        }

        const booking = {
            startDate : `${date}T${start}`,
            endDate : `${date}T${end}`,
            roomNo : roomNo
        }; 
        const res = await apiFetch('http://localhost:3000/bookings/',
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(booking)
            }
        )
        if (!res.ok){
            alert('Invalid Request')
            throw new Error('Request Failed')
        }
        navigate("/bookings")
        
    }

    return (
        <div style={style.container}>
            <h1>Book Room</h1>

            <form onSubmit={handleSubmit} style={style.card}>

                <label>Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <label>Start Time</label>
                <input
                    type="time"
                    value={start}
                    min="08:00"
                    max="20:00"
                    step="1800" // 30 mins
                    onChange={(e) => setStart(e.target.value)}
                    required
                />

                <label>End Time</label>
                <input
                    type="time"
                    value={end}
                    min="08:00"
                    max="20:00"
                    step="1800"
                    onChange={(e) => setEnd(e.target.value)}
                    required
                />

                <button type="submit">
                    Confirm Booking
                </button>
            </form>

            <p>
                Selected: {date} | {start} → {end}
            </p>
        </div>
    );
}
import { useState, useEffect } from "react";
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
    const [promoId, setPromoId] = useState('')
    const [promotions, setPromotions] = useState([])

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const res = await apiFetch(`http://localhost:3000/rooms/${roomNo}/promotions`, {
                    method: "GET",
                    credentials: "include"
                })
                if (!res.ok) {
                    throw new Error('Request Failed')
                }
                const data = await res.json()
                setPromotions(data.result || [])
                // Handle the response if needed
            } catch (error) {
                console.error(error)
                alert(`Error: ${error.message}`)
                setPromotions([])
            }
        }
        fetchPromotions()
    }, [roomNo])

    async function handleSubmit(e) {
        e.preventDefault();

        if (start >= end) {
            alert("End time must be after start time");
            return;
        }

        const booking = {
            startDate : `${date}T${start}`,
            endDate : `${date}T${end}`,
            roomNo : roomNo,
            promoId: promoId
        }; 
        console.log(booking)
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
                <label> Promotion </label>
                <select
                    value={promoId}
                    onChange={(e) => setPromoId(e.target.value)}
                >   
                    <option value=''>None</option>
                    {promotions.map((promo) => (
                        <option key={promo.id} value={promo.id}>
                            {promo.name} ({promo.discount}% off)
                        </option>
                    ))}
                </select>
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
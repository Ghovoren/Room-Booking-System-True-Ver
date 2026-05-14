import { useState, useEffect } from "react"
import RoomCardBase from "./RoomCardBase.jsx"
import PromotionCard from "./PromotionCard.jsx"
import {style} from "./style.jsx"
import { apiFetch } from "../auth/ApiFetch.jsx"

export default function StaffRoomCard({ room, setRooms }) {
    const [isEditing, setIsEditing] = useState(false)
    const [form, setForm] = useState({
        name: room.name,
        capacity: room.capacity,
        price: room.price/100,
    })
    const [promotions, setPromotions] = useState([])
    const [availability, setAvailability] = useState(room.operational)
    
    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const res = await apiFetch(`http://localhost:3000/rooms/${room.room_no}/promotions`, {
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
    }, [room.room_no])

    async function handleSubmit(e) {
        e.preventDefault()

        let updatedRoom = {
            ...room,
            name: form.name,
            capacity: Number(form.capacity),
            price: Number(form.price),
        }

        const res = await apiFetch(
            `http://localhost:3000/rooms/${room.room_no}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(updatedRoom),
            }
        )
        
        if (!res.ok) throw new Error("Request failed")
        updatedRoom.price = Number(form.price*100)
        setRooms(prev =>
            prev.map(r =>
                r.room_no === room.room_no ? updatedRoom : r
            )
        )

        setIsEditing(false)
    }
    async function updateAvailability(e){
        e.preventDefault()
        const nextValue = !availability
        setAvailability(nextValue)
        try {
            const res = await apiFetch(`http://localhost:3000/rooms/${room.room_no}/availability`,{
                method : "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({operational : nextValue})
            })
        }
        catch(error){
            console.error(error)
            setAvailability(prev => !prev)
            throw new Error('Request Failed')
        }
    }
    async function handleAddPromotion(e){
        e.preventDefault()
        const promoName = prompt("Enter Promotion Name:")
        if (!promoName) {
            alert("Promotion name is required.")
            return
        }
        try {
            const res = await apiFetch(`http://localhost:3000/rooms/${room.room_no}/promotions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name: promoName })
            })
            if (!res.ok) {
                throw new Error('Request Failed')
            }
            const data = await res.json()
            setPromotions(prev => [...prev, data.result])
        }
        catch(error){
            console.error(error)
            throw new Error('Request Failed')
        }
    }
    async function handleDelete(e){
        e.preventDefault()

        try{
            const res = await apiFetch(`http://localhost:3000/rooms/${room.room_no}`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            )
            if (!res.ok){
                throw new Error('Request Failed')
            }
            setRooms(prev => prev.filter(r => r.room_no !== room.room_no))
        }
        catch(error){
            console.error(error)
            throw new Error('Request Failed')
        }
    }

    return (
        <div style={style.card}>
            <div style={style.leftColumn}>
                {isEditing ? (
                    <>
                        <form onSubmit={handleSubmit} style={style.leftColumn}>
                            <label>Name</label>
                            <input
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />

                            <label>Capacity</label>
                            <input
                                value={form.capacity}
                                onChange={(e) =>
                                    setForm({ ...form, capacity: e.target.value })
                                }
                            />

                            <label>Price</label>
                            <div>$
                            <input
                                value={form.price}
                                onChange={(e) =>
                                    setForm({ ...form, price: e.target.value })
                                }
                            />
                            </div>
                            <div>
                                <button type="submit">Confirm</button>
                                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <RoomCardBase key={room.room_no} room={room} />

                        <button onClick={updateAvailability} style={style.button}>
                            {availability ? "Available" : "Not Available"}
                        </button>
                        <button onClick={handleAddPromotion} style={style.button}>
                            Add Promotion
                        </button>
                        <button onClick={() => setIsEditing(true)} style={style.button}>
                            Edit Room
                        </button>
                        <button onClick={handleDelete} style={style.button}>
                            Remove Room
                        </button>
                    </>
                )}
                <div style={{marginTop:'20px'}}>
                    <h3>Promotions:</h3>
                    {promotions.length > 0 ? (
                        promotions.map(promo => (
                            <PromotionCard key={promo.id} promotion={promo} room={room} setPromotions={setPromotions} />
                        ))
                    ) : (
                        <p>No promotions available.</p>
                    )}
                </div>
            </div>

            <div style={style.rightColumn}>
                <img src="/meeting-room-design-6_xsvlec.jpg" style={style.image}/>
                <button style={style.button}>Change Photo</button>
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { apiFetch } from "../auth/ApiFetch.jsx"

export default function BookingsCard({booking, onCancel}){
    const { user } = useAuth()

    async function cancelBooking(id) {
        const url = `http://localhost:3000/bookings/${user.publicId}/${id}`
        
        

        try{
            const res = await apiFetch(url, {
                method: "DELETE",
                credentials: "include"
            })
            if (!res.ok) {
                throw new Error('Request Failed')
            }
            onCancel(id)
        }
        catch(error){
            console.error(error)
        }
    }

    return(
        <div key={booking.id}>
            { (user.role === 'staff' || user.role === 'admin') && (
                <>
                    <p>Student No: {booking.user_id}</p>
                </>
            )}
            <p>Room: {booking.room_no}</p>
            <p>Date: {formatDate(booking.start_date)} - {getTime(booking.end_date)}</p>
            <button onClick={() => cancelBooking(booking.id)}>Cancel Booking</button>
        </div>
    )
}

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-SG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date(date))

const getTime = (time) =>
    new Intl.DateTimeFormat("en-SG", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).format(new Date(time))
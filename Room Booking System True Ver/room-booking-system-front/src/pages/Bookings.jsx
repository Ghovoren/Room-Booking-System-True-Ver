import { useEffect, useState } from "react"
import { useAuth } from "../auth/AuthContext"
import BookingsCard from "../components/BookingsCard"

export default function Bookings() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const url =
      user.role === "admin" || user.role === "staff"
        ? "http://localhost:3000/bookings"
        : `http://localhost:3000/bookings/${user.publicId}`
    fetch(url, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error('Request Failed')
        return res.json()
      })
      .then((data) => {
        if (data){
          setBookings(data.result || [])
        }
      })
      .catch((error) => {
        console.error(error)  
        setBookings([])
      })
  }, [user])

  return (
    <div>
      <h1>Bookings</h1>

      {bookings.map((b) => (
        <BookingsCard booking = {b}/>
      ))}
    </div>
  )
}
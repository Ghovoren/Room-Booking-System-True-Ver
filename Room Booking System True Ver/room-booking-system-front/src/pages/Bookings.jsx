import { useEffect, useState } from "react"
import { useAuth } from "../auth/AuthContext"
import BookingsCard from "../components/BookingsCard.jsx"
import { Link } from "react-router-dom"
import { apiFetch } from "../auth/ApiFetch.jsx"

export default function Bookings() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [balance, setBalance] = useState(null)

  function handleCancel(id) {
            setBookings(prev => prev.filter(b => b.id !== id))
        }

  useEffect(() => {
    const url =
      user.role === "admin" || user.role === "staff"
        ? "http://localhost:3000/bookings"
        : `http://localhost:3000/bookings/${user.publicId}`
    apiFetch(url, { credentials: "include" })
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
        alert(`Error: ${error.message}`)  
        setBookings([])
      })
    apiFetch(`http://localhost:3000/users/${user.publicId}`, {credentials: "include"})
    .then((res) => {
      if(!res.ok) throw new Error('Request Failed')
      return res.json()
    })
    .then((data) => {
      if (data){
        setBalance(data.result.balance)
      }
    })
    .catch((error) => {
      console.error(error)
      setBalance(null)
    })
  }, [user])
  
  return (
    <div>
      <h1>Bookings</h1>
      {user.role ==='student' && (<>
        <p>Balance : ${(balance / 100).toFixed(2)}</p>
        <Link to="/rooms">Create a New Booking</Link>
      </>)}
      {bookings.map((b) => (
        <BookingsCard key = {b.id} booking = {b} onCancel={handleCancel}/>
      ))}
    </div>
  )
}
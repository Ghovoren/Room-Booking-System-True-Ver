export default function BookingsCard({booking}){
    return(
        <div key={booking.id}>
            <p>Room: {booking.room_no}</p>
            <p>Date: {formatDate(booking.start_date)} - {getTime(booking.end_date)}</p>
            <button>Cancel Booking</button>
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
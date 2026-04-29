

export default function RoomCard({room, user}){
    return(
        <div key={room.room_no}>
            <h2>{room.name}</h2>
            <p>Capacity: {room.capacity}</p>
            <p>
                Price:{" "}
                {new Intl.NumberFormat("en-SG", {
                    style: "currency",
                    currency: "SGD",
                }).format(room.price / 100)}
            </p>

            {user.role === "staff" || user.role === "admin" ? (
            <button>Edit Room</button>
            ) : null}

            {user.role === "student" ? (
            <button>Book Room</button>
            ) : null}
        </div>
    )
}
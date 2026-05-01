
export default function RoomCardBase({ room }) {
    return (
        <div>
            <h2>{room.name}</h2>
            <p>Capacity: {room.capacity}</p>
            <p>
                Price:{" "}
                {new Intl.NumberFormat("en-SG", {
                    style: "currency",
                    currency: "SGD",
                }).format(room.price / 100)}
            </p>
        </div>
    )
}
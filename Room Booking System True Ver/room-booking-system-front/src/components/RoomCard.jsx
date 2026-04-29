import { useState, useEffect } from "react"

export default function RoomCard({room, user}){
    const [isEditing,setIsEditing] = useState(false)
    const [form, setForm] = useState(null)

    useEffect(() => {
        if (room) {
            setForm({
            name: room.name,
            capacity: room.capacity,
            price: (room.price / 100).toFixed(2)
            });
        }
    }, [room]);

    return(
        <div key={room.room_no} style={style.card}>
            
            <div style={style.leftColumn}>
                {isEditing ? (
                    <>
                        <form id="roomForm" style={{display:"flex",flexDirection:"column", alignItems:"space-between", width:"75%"}}>
                            <label htmlFor="name">Name:</label>
                            <input defaultValue={form.name} style={style.nameInput}></input>
                            <label htmlFor="name">Capacity:</label>
                            <div>{"\u00A0\u00A0"}<input defaultValue={form.capacity} style={{width:"20%"}}></input></div>
                            <label htmlFor="name">Price:</label>
                            <div>$<input defaultValue={form.price} style={{width:"20%"}}></input></div>
                        </form>
                        <button style={style.flushButton} type="submit" form="roomForm">Confirm</button>
                        <button style={style.button} onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <>
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
                            <button style={style.flushButton} onClick={() => setIsEditing(true)}>Edit Room</button>
                        ) : null}
                    </>
                )}
                
                

                {user.role === "student" ? (
                    <button style={style.flushButton}>Book Room</button>
                ) : null}
            </div>
            <div style={style.rightColumn}>
                <img src="../../public/meeting-room-design-6_xsvlec.jpg" alt="Room Image" style={style.image}/>
                <button style={style.button}>Change Photo</button>
            </div>
        </div>
    )
}

const style = {
    card : {
        border: "2px solid",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridAutoFlow: "row",
        padding: "10px 10px 15px 10px"
    },
    nameInput: {
        fontSize: "1.5em",
        fontWeight: "bold"
    },
    flushButton:{
        width: "75%",
        height: "10%",
        marginTop: "auto"
    },
    button: {
        width: "75%",
        height: "10%"
    },
    image: {
        height: "auto",
        width: "75%"
    },
    leftColumn:{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    rightColumn:{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end"
    }
}
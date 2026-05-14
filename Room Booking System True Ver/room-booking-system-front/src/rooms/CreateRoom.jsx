import { useState } from "react";
import RoomCardBase from "./RoomCardBase.jsx";
import {style} from "./style.jsx"
import { apiFetch } from "../auth/ApiFetch.jsx";

export default function RoomCardForm({ onCreate, onCancel }) {
    const [form, setForm] = useState({
        name: "",
        capacity: "",
        price: "",
    })

    async function handleSubmit(e) {
        e.preventDefault();

        const room = {
            name: form.name,
            capacity: Number(form.capacity),
            price: Number(form.price),
        };

        const res = await apiFetch(
            `http://localhost:3000/rooms/`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(room),
            }
        );

        if (!res.ok) throw new Error("Request failed");

        const createdRoom = await res.json()

        onCreate(createdRoom.result)
    }

    return (
        <div style={style.card}>
            <div style={style.leftColumn}>
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
                            <button type="submit">Create Room</button>
                            <button type="button" onClick={onCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </>
            </div>

            <div style={style.rightColumn}>
                <img alt="Photo" style={style.image}/>
                <button>Add Photo</button>
            </div>
        </div>
    );
}
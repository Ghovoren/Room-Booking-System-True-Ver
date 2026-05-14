import { useState } from "react"

export default function PromotionsCard({ promotion, onEdit, onDelete }) {

    const [isEditing, setIsEditing] = useState(false)
    const [form, setForm] = useState({
        id: promotion.id,
        name: promotion.name,
        discount: promotion.discount
    })
    const handleEdit = () => {
        onEdit(promotion.id, form)
        setIsEditing(false)
    }
    const handleDelete = () => {
        onDelete(promotion.id)
    }
    return (
        <div key={promotion.id}>
            {isEditing ? (
                <div style={style.card}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <label>Discount</label>
                    <input
                        type="number"
                        value={form.discount}
                        onChange={(e) => setForm({ ...form, discount: parseFloat(e.target.value) })}
                    />
                    <button style={style.button} onClick={handleEdit}>Confirm</button>
                    <button style={style.button} onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div style={style.card}>
                    <p>{promotion.id}</p>
                    <p>{promotion.name}</p>
                    <p>Discount: {promotion.discount}%</p>
                    <button style={style.button} onClick={() => setIsEditing(true)}>
                        Edit Promotion
                    </button>
                    <button style={style.button} onClick={handleDelete}>
                        Delete Promotion
                    </button>
                </div>
            )}
            
        </div>
    )
}

export const style = {
    card: {
        border: "2px solid",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
        gridAutoFlow: "column",
        width: "100%",
        justifyItems: "center",
        alignItems: "center"
    },
    button: {
        width: "60%",
        height: "90%"
    }
}
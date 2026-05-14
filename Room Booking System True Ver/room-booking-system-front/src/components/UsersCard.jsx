import { apiFetch } from "../auth/ApiFetch"

export default function UsersCard({user, onDelete}){

    const handleDelete = () => {
        onDelete(user.account_id)
    }
    return(
        <div key={user.account_id} style={style.card}>
            <p>ID: {user.account_id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone || "N/A"}</p>
            <p>Role: {user.role}</p>
            <button style={style.button} onClick={handleDelete} >Delete Account</button>
        </div>
    )
}
export const style = {
    card: {
        border: "2px solid",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr",
        gridAutoFlow: "column",
        width: "100%"
    },
    button: {
        width: "30%",
        height: "90%"
    }
}
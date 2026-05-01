import RoomCardBase from "./RoomCardBase.jsx";
import {style} from "./style.jsx"
import { Link } from "react-router-dom";

export default function StudentRoomCard({ room }) {
    return (
        <div style={style.card}>
            <div style={style.leftColumn}>
                <RoomCardBase room={room} />

                <Link to={`/rooms/${room.room_no}/book`} style={style.linkButton}>
                    Book Room
                </Link>
            </div>

            <div style={style.rightColumn}>
                <img
                    src="/meeting-room-design-6_xsvlec.jpg"
                    alt="Room"
                    style={style.image}
                />
            </div>
        </div>
    );
}
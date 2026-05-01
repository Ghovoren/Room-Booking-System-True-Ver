import { roomCardStyle } from "./RoomCard.jsx"
import RoomCardBase from "./RoomCardBase";

export default function StudentRoomCard({ room }) {
    return (
        <div style={roomCardStyle.card}>
            <div style={roomCardStyle.leftColumn}>
                <RoomCardBase room={room} />

                <button style={roomCardStyle.flushButton}>
                    Book Room
                </button>
            </div>

            <div style={roomCardStyle.rightColumn}>
                <img
                    src="../../public/meeting-room-design-6_xsvlec.jpg"
                    alt="Room"
                    style={roomCardStyle.image}
                />
            </div>
        </div>
    );
}
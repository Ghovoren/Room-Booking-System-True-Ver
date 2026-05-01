import StudentRoomCard from "./StudentRoomCard";
import StaffRoomCard from "./StaffRoomCard";

export default function RoomCard({ room, user, setRooms }) {
    if (!room || !user) return null;

    if (user.role === "student") {
        return <StudentRoomCard room={room} />;
    }

    if (user.role === "staff" || user.role === "admin") {
        return <StaffRoomCard room={room} setRooms={setRooms} />;
    }

    return null;
}
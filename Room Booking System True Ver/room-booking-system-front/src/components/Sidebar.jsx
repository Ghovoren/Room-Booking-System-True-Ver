import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside style={styles.sidebar}>
      <h3 style={styles.title}>Menu</h3>

      <Link to="/" style={styles.link}>Home</Link>

      <Link to="/rooms" style={styles.link}>Rooms</Link>

      {user && (
        <Link to="/bookings" style={styles.link}>Bookings</Link>
      )}

      {(user?.role === "admin" || user?.role === "staff") && (
        <Link to="/users" style={styles.link}>Users</Link>
      )}

      {user && (
        <Link to={`/user/${user.id}`} style={styles.link}>
          My Profile
        </Link>
      )}
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    background: "#111",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  title: {
    marginBottom: "10px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "8px",
    borderRadius: "6px",
  },
};
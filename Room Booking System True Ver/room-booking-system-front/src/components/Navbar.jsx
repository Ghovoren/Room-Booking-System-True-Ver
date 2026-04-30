import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, setUser } = useAuth();

  async function handleLogout() {
      await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>MyApp</Link>

        {/* 🟢 PUBLIC LINKS */}
        {!user && (
          <>
            <Link to="/" style={styles.link}>Home</Link>
          </>
        )}

        {/* 🔵 AUTH LINKS */}
        {user && (
          <>
            <Link to="/rooms" style={styles.link}>Rooms</Link>
            <Link to="/bookings" style={styles.link}>Bookings</Link>

            {(user.role === "admin" || user.role === "staff") && (
              <Link to="/users" style={styles.link}>Users</Link>
            )}
          </>
        )}
      </div>

      <div style={styles.right}>
        {/* 🟢 NOT LOGGED IN */}
        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <>
            <Link to={`/user/${user.id}`} style={styles.link}>
              {user.name}
            </Link>

            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "#111",
    color: "white",
    alignItems: "center",
  },
  left: { display: "flex", gap: "12px", alignItems: "center" },
  right: { display: "flex", gap: "12px", alignItems: "center" },
  logo: { color: "white", textDecoration: "none", fontWeight: "bold" },
  link: { color: "white", textDecoration: "none" },
  button: { padding: "6px 10px", cursor: "pointer" },
};
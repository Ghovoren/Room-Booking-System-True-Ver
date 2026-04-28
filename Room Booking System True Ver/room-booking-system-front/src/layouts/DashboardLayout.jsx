import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  return (
    <div style={styles.wrapper}>
      <Navbar />

      <div style={styles.body}>
        <Sidebar />

        <main style={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  body: {
    display: "flex",
    flex: 1,
  },
  content: {
    flex: 1,
    padding: "20px",
    background: "#f5f5f5",
  },
};
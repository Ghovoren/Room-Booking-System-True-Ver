import { useAuth } from "../auth/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      {user ? <p>Welcome {user.role.charAt(0).toUpperCase() + user.role.slice(1)}{"\u00A0"}{user.name}</p> : <p>You are not logged in</p>}
    </div>
  );
}
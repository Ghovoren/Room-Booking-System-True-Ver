import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setUser);
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
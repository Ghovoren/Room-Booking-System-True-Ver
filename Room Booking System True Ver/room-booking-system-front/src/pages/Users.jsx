import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      {users.map((u) => (
        <div key={u.id}>
          {u.name} - {u.email}
        </div>
      ))}
    </div>
  );
}
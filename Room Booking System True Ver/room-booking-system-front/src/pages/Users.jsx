import { useEffect, useState } from "react";
import UsersCard from "../components/UsersCard";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users", {
      credentials: "include"
    })
    .then((res) => {
      if(!res.ok){
        throw new Error('Request Failed')
      }  
      return res.json()
    })
    .then((data) => {
      setUsers(data.result || [])
    })
    .catch((error) => {
      console.error(error)
      setUsers([])
    })
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      {users.map((u) => (
        <UsersCard user={u}/>
      ))}
    </div>
  );
}
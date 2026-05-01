import { useEffect, useState } from "react";
import UsersCard from "../components/UsersCard";
import { apiFetch } from "../auth/ApiFetch.jsx"

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async() => {
      try{
        const res = await apiFetch("http://localhost:3000/users", {
          credentials: "include"
        })
        if(!res.ok){
          throw new Error('Request Failed')
        }  
        const data = await res.json()
        setUsers(data.result || [])
      }
      catch(error) {
          console.error(error)
          setUsers([])
      }
    }
    fetchUsers()
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      {users.map((u) => (
        <UsersCard key={u.account_id}user={u}/>
      ))}
    </div>
  );
}
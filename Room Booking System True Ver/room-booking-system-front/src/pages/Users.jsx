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
          alert(`Error: ${error.message}`)
          setUsers([])
      }
    }
    fetchUsers()
  }, []);


  const handleDelete = async (id) => {
        try{
            const res = await apiFetch(`http://localhost:3000/users/${id}`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            )
            if (!res.ok){
                throw new Error('Request Failed')
            }   
            setUsers(prev => prev.filter(user => user.account_id !== id));
        }
        catch(error){
            alert(`Error: ${error.message}`)
            throw new Error('Error Request Failed')
            
        } 
    }

  return (
    <div>
      <h1>All Users</h1>
      {users.map((user) => (
        <UsersCard key={user.account_id} user={user} onDelete={handleDelete}/>
      ))}
    </div>
  );
}
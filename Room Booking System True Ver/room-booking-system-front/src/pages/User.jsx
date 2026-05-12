import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../auth/ApiFetch.jsx"

export default function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [showTopUp, setShowTopUp] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [input, setInput] = useState('')
  const [balance, setBalance] = useState(null)

  const depositBalance = async () => {
    if(!input){
      throw new Error('Invalid Input')
    }
    const res = await apiFetch(`http://localhost:3000/users/${id}/balance/deposit`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      credentials:"include",
      body: JSON.stringify({depositAmount: input})
    })

    if (!res.ok){
      throw new Error('Request Failed')
    }
    updateBalance()

  }

  const withdrawBalance = async () => {
    if(!input){
      throw new Error('Invalid Input')
    }
    const res = await apiFetch(`http://localhost:3000/users/${id}/balance/withdraw`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      credentials:"include",
      body: JSON.stringify({withdrawAmount: input})
    })

    if (!res.ok){
      throw new Error('Request Failed')
    }
    updateBalance()
    

  }

  const updateBalance = async () => {
    const res = await apiFetch(`http://localhost:3000/users/${id}`,{credentials:"include"})
    const data = await res.json()
    console.log(data)
    setBalance(data.result.balance)
  }

  useEffect(() => {
    apiFetch(`http://localhost:3000/users/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.result)
        setBalance(data.result.balance)
      });
  }, [id]);

  useEffect(() => {
    
  }, [balance])

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone || "N/A"}</p>
      <p>Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
      <p>Balance: ${(balance / 100).toFixed(2)}</p>
      <button onClick={() => (setShowTopUp(true),setShowWithdraw(false))}>Top Up Balance</button>
      <button onClick={() => (setShowTopUp(false),setShowWithdraw(true))}>Withdraw Balance</button>
      {showTopUp && (
        <div>
          <h3>Enter Top Up Amount:</h3>
          $<input value={input} onChange={(e)=>setInput(e.target.value)}/>
          <button onClick={() => (depositBalance(), setShowTopUp(false))}>Top Up</button>
          <button onClick={() => setShowTopUp(false)}>Cancel</button>
        </div>
      )}
      {showWithdraw && (
        <div>
          <h3>Enter Withdraw Amount:</h3>
          $<input value={input} onChange={(e)=>setInput(e.target.value)}/>
          <button onClick={() => (withdrawBalance(), setShowWithdraw(false))}>Withdraw</button>
          <button onClick={() => setShowWithdraw(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
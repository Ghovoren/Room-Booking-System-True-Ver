import { useEffect, useState } from "react";
import PromotionsCard from "../components/PromotionsCard.jsx";
import { apiFetch } from "../auth/ApiFetch.jsx"
import { style } from "../components/PromotionsCard.jsx";

export default function Promotions() {
  const [promotions, setPromotions] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchPromotions = async() => {
      try{
        const res = await apiFetch("http://localhost:3000/promotions", {
          credentials: "include"
        })
        if(!res.ok){
          throw new Error('Request Failed')
        }  
        const data = await res.json()
        setPromotions(data.result || [])
      }
      catch(error) {
          console.error(error)
          alert(`Error: ${error.message}`)
          setPromotions([])
      }
    }
    fetchPromotions()
  }, []);

  const [form, setForm] = useState({
      name: "",
      discount: 0
  });

  const handleSubmit = async (e) => {
      e.preventDefault()
      try{
          console.log(form)
          const res = await apiFetch("http://localhost:3000/promotions", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(form)
          })
          if (!res.ok) {
              throw new Error('Request Failed')
          }
          const data = await res.json()
          setPromotions(prev => [...prev, data.result])
          setForm({
              name: "",
              discount: 0,
              role: "student"
          })
          setIsAdding(false)
      }
      catch(error) {
          console.error(error)
          alert(`Error: ${error.message}`)
      }
  }

  const handleDelete = async (id) => {
        try{
            const res = await apiFetch(`http://localhost:3000/promotions/${id}`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            )
            if (!res.ok){
                throw new Error('Request Failed')
            }   
            setPromotions(prev => prev.filter(promotion => promotion.id !== id));
        }
        catch(error){
            alert(`Error: ${error.message}`)
            throw new Error('Error Request Failed')
            
        }
    }
    const handleEdit = async (id, updatedPromotion) => {
        try{
            const res = await apiFetch(`http://localhost:3000/promotions/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(updatedPromotion)
                }
            )
            if (!res.ok){
                throw new Error('Request Failed')
            }
            setPromotions(prev => prev.map(p => p.id === id ? updatedPromotion : p))
        }
        catch(error){
            alert(`Error: ${error.message}`)
            throw new Error('Error Request Failed')
        }
    }

  return (
    <div>
      <h1>All Promotions</h1>
      {promotions.map((promotion) => (
        <PromotionsCard key={promotion.id} promotion={promotion} onDelete={handleDelete} onEdit={handleEdit} />
      ))}
      {isAdding ? (
        <>
          <form onSubmit={handleSubmit} style={style.card}>
            <div>
              <label>Promotion Name</label>
              <input
                  value={form.name}
                  onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                  }
              />
            </div>
            <div>
              <label>Discount</label>
              <input
                  value={form.discount}
                  onChange={(e) =>
                      setForm({ ...form, discount: e.target.value })
                  }
              />
            </div>
            <div><button type="submit">Confirm</button></div>
            <div>
                <button type="button" onClick={() => setIsAdding(false)}>Cancel</button>
            </div>
          </form>
        </>
      ) : (
        <>
            <button onClick={() => setIsAdding(true)} style={style.button}>
                Create New Promotion
            </button>
        </>
      )}
    </div>
  )
}
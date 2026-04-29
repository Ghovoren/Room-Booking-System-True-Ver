import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

async function getCurrentUser() {
  const res = await fetch("http://localhost:3000/auth/me", {
    credentials: "include",
  })

  if (!res.ok) return null
  return res.json()
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
  const handleLogoutEvent = () => {
    setUser(null)
  }

  window.addEventListener("auth:logout", handleLogoutEvent)

  return () => {
    window.removeEventListener("auth:logout", handleLogoutEvent)
  }
}, [])

  const logout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    })
    
    setUser(null)
  }
  

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
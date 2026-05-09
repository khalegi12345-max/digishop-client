import { createContext, useState, useContext, useEffect } from 'react'

type AuthContextType = {
  isLoggedIn: boolean
  user: string | null
  name: string | null
  error: string | null
  loading: boolean
  login: (email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setIsLoggedIn(true)
        setUser(payload.email)

        fetch('https://digishop-server.onrender.com/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => res.json())
          .then(data => setName(data.name))
      } catch {
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      if (email === '' || password === '') {
        setError('ایمیل و پسورد رو پر کن!')
        return
      }

      const response = await fetch('https://digishop-server.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message)
        return
      }

      localStorage.setItem('token', data.token)
      setIsLoggedIn(true)
      setUser(data.user.email)
      setName(data.user.name)
      setError(null)

    } catch (err) {
      setError('خطای سرور!')
    }
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setName(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, name, error, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export { AuthProvider }
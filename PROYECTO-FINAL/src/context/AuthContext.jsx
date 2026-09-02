import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('cineexplorer_token'))
  const [username, setUsername] = useState(() => localStorage.getItem('cineexplorer_username'))

  const login = (newToken, newUsername) => {
    localStorage.setItem('cineexplorer_token', newToken)
    localStorage.setItem('cineexplorer_username', newUsername)
    setToken(newToken)
    setUsername(newUsername)
  }

  const logout = () => {
    localStorage.removeItem('cineexplorer_token')
    localStorage.removeItem('cineexplorer_username')
    setToken(null)
    setUsername(null)
  }

  const value = {
    token,
    username,
    isAuthenticated: Boolean(token),
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}

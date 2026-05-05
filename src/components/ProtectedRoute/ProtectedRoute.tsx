import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

export default ProtectedRoute
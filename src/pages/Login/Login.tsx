import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    login(email, password)
  }

  useEffect(() => {
    if (isLoggedIn) navigate('/shop')
  }, [isLoggedIn])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">🛍️ دیجی‌شاپ</h1>
          <p className="text-gray-500">به حساب خود وارد شوید</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">ایمیل</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">پسورد</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors mt-2"
            >
              ورود
            </button>

            <p className="text-center text-sm text-gray-500">
              حساب نداری؟{' '}
              <span
                onClick={() => navigate('/register')}
                className="text-blue-700 cursor-pointer font-medium"
              >
                ثبت نام کن
              </span>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
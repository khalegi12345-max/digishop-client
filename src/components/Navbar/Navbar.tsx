import { useState } from 'react'
import { ShoppingCart, User, Search, X, LogOut, Settings } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import CartModal from '../CartModal/cartModal'

type NavbarProps = {
  search?: string
  setSearch?: (value: string) => void
}

function Navbar({ search = '', setSearch }: NavbarProps) {
  const { cart } = useCart()
  const { isLoggedIn, user, logout } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-40">
        
        {/* لوگو */}
        <h1 
          onClick={() => navigate('/shop')}
          className="text-xl font-bold text-blue-700 cursor-pointer"
        >🛍️ دیجی‌شاپ
        </h1>

        {/* سرچ بار */}
        {setSearch && (
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2 w-80">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی محصول..."
              className="bg-transparent text-sm outline-none w-full"
            />
          </div>
        )}

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* دکمه سبد خرید دایره‌ای */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-colors"
              >
                <ShoppingCart size={18} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* دکمه پروفایل */}
              <button
                onClick={() => setIsProfileOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <User size={18} className="text-gray-700" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-blue-700 font-medium px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors"
              >
                ورود
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded-xl transition-colors"
              >
                ثبت نام</button>
            </>
          )}
        </div>
      </nav>

      {/* منوی پروفایل از سمت راست */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="flex-1 bg-black bg-opacity-30"
            onClick={() => setIsProfileOpen(false)}
          />
          <div className="bg-white w-72 h-full shadow-xl flex flex-col p-6">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-gray-900">پروفایل</h2>
              <button onClick={() => setIsProfileOpen(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center">
                <User size={24} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">کاربر</p>
                <p className="text-sm text-gray-500">{user}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <button
                onClick={() => { navigate('/profile'); setIsProfileOpen(false) }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700"
              >
                <Settings size={18} />
                تنظیمات پروفایل
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-red-500 mt-auto"
            >
              <LogOut size={18} />
              خروج از حساب
            </button>

          </div>
        </div>
      )}

      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </>
  )
}

export default Navbar
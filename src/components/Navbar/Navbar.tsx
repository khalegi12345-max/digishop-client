import { useState } from 'react'
import { ShoppingCart, User, Search } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import CartModal from '../CartModal/cartModal'
import ProfileDrawer from '../ProfileDrawer/ProfileDrawer'

type NavbarProps = {
  search?: string
  setSearch?: (value: string) => void
}

function Navbar({ search = '', setSearch }: NavbarProps) {
  const { cart } = useCart()
  const { isLoggedIn } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-40">
        
        <h1 
          onClick={() => navigate('/shop')}
          className="text-xl font-bold text-blue-700 cursor-pointer"
        >
          🛍️ دیجی‌شاپ
        </h1>

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
                ثبت نام
              </button>
            </>
          )}
        </div>
      </nav>

      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
      {isProfileOpen && <ProfileDrawer onClose={() => setIsProfileOpen(false)} />}
    </>
  )
}

export default Navbar
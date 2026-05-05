import { useState } from 'react'
import { ShoppingCart, User, Search } from 'lucide-react'
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
  const { isLoggedIn } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-40">
        
        <h1 
          onClick={() => navigate('/')}
          className="text-xl font-bold text-blue-700 cursor-pointer"
        >
          🛍️ دیجی‌شاپ
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-blue-700 font-medium px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors"
          >
            محصولات
          </button>

          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate('/profile')}
                className="text-gray-600 hover:text-blue-700 font-medium px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <User size={18} />
                پروفایل
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className="relative bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                سبد خرید
                {cart.length > 0 && (
                  <span className="bg-white text-blue-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
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

      {isOpen && <CartModal onClose={() => setIsOpen(false)} />}
    </>
  )
}

export default Navbar
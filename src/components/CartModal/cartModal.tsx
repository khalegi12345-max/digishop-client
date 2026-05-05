import { useCart } from '../../context/CartContext'
import { X, Trash2, ShoppingBag } from 'lucide-react'

type CartModalProps = {
  onClose: () => void
}

function CartModal({ onClose }: CartModalProps) {
  const { cart, removeFromCart } = useCart()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
        
        {/* هدر */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-blue-700" />
            <h2 className="text-lg font-bold text-gray-900">سبد خرید</h2>
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-lg">
              {cart.length} محصول
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* لیست */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-3">
              <ShoppingBag size={40} className="text-gray-200" />
              <p className="text-gray-400 text-sm">سبد خرید خالیه!</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {cart.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {item.title}
                    </p>
                    <p className="text-blue-700 font-bold text-sm mt-1">
                      ${item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-red-50 transition-colors flex-shrink-0"
                  >
                    <Trash2 size={16} className="text-red-400" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* فوتر */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500 text-sm">جمع کل</p>
              <p className="text-xl font-bold text-gray-900">
                ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
              </p>
            </div>
            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors">
              ادامه خرید
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default CartModal
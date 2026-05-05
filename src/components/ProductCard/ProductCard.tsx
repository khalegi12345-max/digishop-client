import type { Product } from '../../types/Product'
import { useCart } from '../../context/CartContext'

type ProductCardProps = {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
      
      <div className="bg-gray-50 p-6 flex items-center justify-center h-52">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain mix-blend-multiply"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-2">
          {product.category}
        </span>
        
        <h2 className="text-sm font-semibold text-gray-800 mb-3 line-clamp-2 flex-1">
          {product.title}
        </h2>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-200"
          >
            افزودن
          </button>
        </div>
      </div>

    </div>
  )
}

export default ProductCard
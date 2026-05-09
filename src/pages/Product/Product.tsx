import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import type { Product as ProductType } from '../../types/Product'
import Navbar from '../../components/Navbar/Navbar'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'

function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState<ProductType | null>(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`https://digishop-server.onrender.com/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">در حال بارگذاری...</p>
      </div>
    </div>
  )

  if (!product) return null

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-8 py-10">
        
        <button
          onClick={() => navigate('/shop')}
          className="text-blue-700 mb-6 flex items-center gap-2 hover:underline"
        >
          ← برگشت به محصولات
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex gap-10">
          
          <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center w-64 h-64 flex-shrink-0">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col flex-1">
            <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-2">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {product.description}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                افزودن به سبد
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Product
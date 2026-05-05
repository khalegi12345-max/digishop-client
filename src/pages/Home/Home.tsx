import { useState, useEffect } from 'react'
import type { Product } from '../../types/Product'
import Navbar from '../../components/Navbar/Navbar'
import ProductCard from '../../components/ProductCard/ProductCard'

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">محصولات</h1>
        <p className="text-gray-500 mb-8">بهترین محصولات دیجیتال</p>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400 text-lg">در حال بارگذاری...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
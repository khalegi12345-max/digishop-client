import { createContext, useState, useContext, useEffect } from 'react'
import type { Product } from '../types/Product'

type CartContextType = {
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([])

  const getToken = () => localStorage.getItem('token')

  // گرفتن سبد خرید از سرور
  const fetchCart = async () => {
    const token = getToken()
    if (!token) return

    try {
      const res = await fetch('http://localhost:5000/api/cart', {
        headers: { Authorization:` Bearer ${token} `}
      })
      const data = await res.json()
      if (data.items) {
        setCart(data.items.map((item: any) => ({
          id: item.productId,
          title: item.title,
          price: item.price,
          image: item.image,
          description: '',
          category: ''
        })))
      }
    } catch (err) {
      console.log('خطا:', err)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  // اضافه کردن به سبد
  const addToCart = async (product: Product) => {
    const token = getToken()
    if (!token) return

    try {
      const res = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:` Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image
        })
      })
      const data = await res.json()
      if (data.items) {
        setCart(data.items.map((item: any) => ({
          id: item.productId,
          title: item.title,
          price: item.price,
          image: item.image,
          description: '',
          category: ''
        })))
      }
    } catch (err) {
      console.log('خطا:', err)
    }
  }

  // حذف از سبد
  const removeFromCart = async (id: number) => {
    const token = getToken()
    if (!token) return

    try {
      const res = await fetch(`http://localhost:5000/api/cart/remove/${id}`, {
        method: 'DELETE',
        headers: { Authorization:` Bearer ${token} `}
      })
      const data = await res.json()
      if (data.items) {
        setCart(data.items.map((item: any) => ({
          id: item.productId,
          title: item.title,
          price: item.price,
          image: item.image,
          description: '',
          category: ''
        })))
      }
    } catch (err) {
      console.log('خطا:', err)
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

export { CartProvider }
import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      <nav className="px-8 py-5 flex justify-between items-center border-b border-gray-100">
        <h1 className="text-xl font-bold text-blue-700">🛍️ دیجی‌شاپ</h1>
        <div className="flex gap-3">
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
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
        <span className="text-6xl mb-6">🛍️</span>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          خرید آنلاین
          <span className="text-blue-700"> آسان‌تر</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-md mb-8">
          بهترین محصولات دیجیتال رو با قیمت مناسب پیدا کن
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-colors"
        >
          شروع خرید
        </button>
      </div>

    </div>
  )
}

export default Landing
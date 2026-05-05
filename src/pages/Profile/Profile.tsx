import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import { User, Mail, Settings, Headphones, LogOut } from 'lucide-react'

function Profile() {
  const { user, name, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      
      <div className="max-w-lg mx-auto mt-10 px-4">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center mb-4">
          <div className="w-20 h-20 bg-blue-700 rounded-full flex items-center justify-center mb-4">
            <User size={36} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">{name || 'کاربر'}</h1>
          <p className="text-gray-500 text-sm mt-1">{user}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          
          <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <Mail size={18} className="text-blue-700" />
            </div>
            <div>
              <p className="text-xs text-gray-400">ایمیل</p>
              <p className="text-sm font-medium text-gray-800">{user}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <Settings size={18} className="text-blue-700" />
            </div>
            <div>
              <p className="text-xs text-gray-400">تنظیمات</p>
              <p className="text-sm font-medium text-gray-800">زبان: فارسی</p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <Headphones size={18} className="text-blue-700" />
            </div>
            <div>
              <p className="text-xs text-gray-400">پشتیبانی</p>
              <p className="text-sm font-medium text-gray-800">support@digishop.com</p>
            </div>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-white border border-red-100 hover:bg-red-50 text-red-500 font-semibold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          خروج از حساب
        </button>

      </div>
    </div>
  )
}

export default Profile
import { useState } from "react";
import {
  X,
  User,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Mail,
  ShoppingBag,
  Lock,
  Edit3,
  Headphones,
  Info,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type ProfileDrawerProps = {
  onClose: () => void;
};

type Section = "main" | "edit" | "appearance" | "support";

function ProfileDrawer({ onClose }: ProfileDrawerProps) {
  const { user, name, logout } = useAuth();
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>("main");
  const [darkMode, setDarkMode] = useState(false);
  const [newName, setNewName] = useState(name || "");
  const [newPassword, setNewPassword] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="flex-1 bg-black bg-opacity-30" onClick={onClose} />

      <div className="bg-white w-80 h-full shadow-xl flex flex-col">
        {/* هدر */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          {section !== "main" ? (
            <button
              onClick={() => setSection("main")}
              className="text-blue-700 text-sm font-medium"
            >
              ← برگشت
            </button>
          ) : (
            <h2 className="font-bold text-gray-900">پروفایل</h2>
          )}
          <button onClick={onClose}>
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        {/* بخش اصلی */}
        {section === "main" && (
          <div className="flex flex-col flex-1 overflow-y-auto">
            {/* اطلاعات کاربر */}
            <div className="flex items-center gap-3 px-6 py-5 bg-blue-50">
              <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center">
                <User size={28} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">{name || "کاربر"}</p>
                <p className="text-sm text-gray-500">{user}</p>
              </div>
            </div>
            [5.05.2026 16:09] Raes baes:{" "}
            <div className="flex flex-col px-4 py-4 gap-1">
              {/* سفارشات */}
              <button className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                    <ShoppingBag size={18} className="text-blue-700" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    سفارشات من
                  </span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </button>

              {/* ویرایش پروفایل */}
              <button
                onClick={() => setSection("edit")}
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center">
                    <Edit3 size={18} className="text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    ویرایش پروفایل
                  </span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </button>

              {/* ظاهر */}
              <button
                onClick={() => setSection("appearance")}
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-yellow-50 rounded-xl flex items-center justify-center">
                    <Sun size={18} className="text-yellow-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    ظاهر و تنظیمات
                  </span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </button>

              {/* پشتیبانی */}
              <button
                onClick={() => setSection("support")}
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
                    <Headphones size={18} className="text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    پشتیبانی
                  </span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            </div>
            {/* خروج */}
            <div className="px-4 mt-auto pb-6">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-100 hover:bg-red-50 transition-colors text-red-500 font-medium"
              >
                <LogOut size={18} />
                خروج از حساب
              </button>
            </div>
          </div>
        )}
        [5.05.2026 16:10] Raes baes:{" "}
        {section === "appearance" && (
          <div className="flex flex-col flex-1 px-6 py-4 gap-4">
            <h3 className="font-bold text-gray-900 mb-2">ظاهر و تنظیمات</h3>

            <div className="flex items-center justify-between px-4 py-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon size={20} className="text-blue-700" />
                ) : (
                  <Sun size={20} className="text-yellow-500" />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {darkMode ? "حالت شب" : "حالت روز"}
                </span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-colors ${darkMode ? "bg-blue-700" : "bg-gray-300"}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${darkMode ? "translate-x-6" : "translate-x-0"}`}
                />
              </button>
            </div>
          </div>
        )}
        {/* پشتیبانی */}
        {section === "support" && (
          <div className="flex flex-col flex-1 px-6 py-4 gap-4">
            <h3 className="font-bold text-gray-900 mb-2">پشتیبانی</h3>

            <div className="flex items-center gap-3 px-4 py-4 bg-gray-50 rounded-xl">
              <Mail size={20} className="text-blue-700" />
              <div>
                <p className="text-xs text-gray-400">ایمیل پشتیبانی</p>
                <p className="text-sm font-medium text-gray-700">
                  support@digishop.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-4 bg-gray-50 rounded-xl">
              <Info size={20} className="text-blue-700" />
              <div>
                <p className="text-xs text-gray-400">درباره ما</p>
                <p className="text-sm font-medium text-gray-700">
                  دیجی‌شاپ نسخه ۱.۰
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDrawer;

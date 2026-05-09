import { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import type { Product } from "../../types/Product";

function Admin() {
  // const { isLoggedIn } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("https://digishop-server.onrender.com/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const handleAdd = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("https://digishop-server.onrender.com/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });
    if (res.ok) {
      setShowForm(false);
      setForm({ title: "", price: "", description: "", category: "", image: "", stock: "" });
      fetchProducts();
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    await fetch(`https://digishop-server.onrender.com/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">پنل ادمین</h1>
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
            + محصول جدید
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="font-bold text-gray-900 mb-4">محصول جدید</h2>
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="اسم محصول" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="border border-gray-200 rounded-xl px-4 py-3 text-sm" />
              <input placeholder="قیمت" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="border border-gray-200 rounded-xl px-4 py-3 text-sm" />
              <input placeholder="دسته‌بندی" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border border-gray-200 rounded-xl px-4 py-3 text-sm" />
              <input placeholder="موجودی" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="border border-gray-200 rounded-xl px-4 py-3 text-sm" />
              <input placeholder="لینک عکس" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="border border-gray-200 rounded-xl px-4 py-3 text-sm col-span-2" />
              <textarea placeholder="توضیحات" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border border-gray-200 rounded-xl px-4 py-3 text-sm col-span-2" />
            </div>
            <button onClick={handleAdd} className="mt-4 bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
              اضافه کن
            </button>
          </div>
        )}




        {loading ? (
          <p className="text-gray-400">در حال بارگذاری...</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">محصول</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">قیمت</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">دسته‌بندی</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">موجودی</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any) => (
                  <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} className="w-10 h-10 object-contain" />
                        <span className="text-sm font-medium text-gray-800">{product.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">${product.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.stock}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDelete(product._id)} className="text-red-500 text-sm hover:underline">
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
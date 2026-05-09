import { useState, useEffect } from "react";
import type { Product } from "../../types/Product";
import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/ProductCard/ProductCard";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("همه");

  const categories = [
    "همه",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  useEffect(() => {
    fetch("https://digishop-server.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory = category === "همه" || product.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar search={search} setSearch={setSearch} />

      <div className="max-w-6xl mx-auto px-8 pt-28 pb-6">
        {/* هدر صفحه */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">محصولات</h1>
          <p className="text-gray-400 text-sm">
            بهترین محصولات دیجیتال رو پیدا کن
          </p>
        </div>

        {/* فیلتر دسته‌بندی */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                category === cat
                  ? "bg-blue-700 text-white shadow-md shadow-blue-200"
                  : "bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-700 border border-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* تعداد محصولات */}
        <p className="text-gray-400 text-sm mb-6">
          {filteredProducts.length} محصول پیدا شد
        </p>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400 text-lg">در حال بارگذاری...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

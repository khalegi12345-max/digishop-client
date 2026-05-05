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
    fetch("https://fakestoreapi.com/products")
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
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar search={search} setSearch={setSearch} />
      <div className="max-w-6xl mx-auto px-8 py-4 flex gap-3 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              category === cat
                ? "bg-blue-700 text-white"
                : "bg-white text-gray-600 hover:bg-blue-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="max-w-6xl mx-auto px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400 text-lg">در حال بارگذاری...</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-500 text-sm mb-4">
              {filteredProducts.length} محصول پیدا شد
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

// import { useState } from 'react';
// import { Search } from 'lucide-react';
// import { motion } from 'framer-motion';
// import ProductCard from '@/components/ProductCard';
// import { products, categories } from '@/data/products';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// const Collections = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredProducts = products.filter((product) => {
//     const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
//     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="container mx-auto px-4 py-8">
//         <motion.h1
//           className="text-4xl font-serif font-bold text-foreground mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           Our Collections
//         </motion.h1>

//         <motion.div
//           className="mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           <div className="relative mb-6">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//             <Input
//               type="text"
//               placeholder="Search jewelry..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>

//           <div className="flex flex-wrap gap-3">
//             {categories.map((category, index) => (
//               <motion.div
//                 key={category}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
//               >
//                 <Button
//                   variant={selectedCategory === category ? 'default' : 'outline'}
//                   onClick={() => setSelectedCategory(category)}
//                   className={`relative overflow-hidden transition-all duration-300 ${
//                     selectedCategory === category
//                       ? 'shadow-lg scale-105'
//                       : 'hover:scale-105 hover:shadow-md'
//                   }`}
//                 >
//                   <span className="relative z-10">{category}</span>
//                   {selectedCategory === category && (
//                     <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary animate-pulse" />
//                   )}
//                 </Button>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product, index) => (
//               <motion.div
//                 key={product.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-50px" }}
//                 transition={{ duration: 0.5, delay: index * 0.05 }}
//               >
//                 <ProductCard product={product} />
//               </motion.div>
//             ))
//           ) : (
//             <motion.div
//               className="col-span-full text-center py-12"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <p className="text-lg text-muted-foreground">
//                 No products found matching your criteria.
//               </p>
//             </motion.div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Collections;
import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Product } from "@/context/CartContext";

const Collections = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // State for the "debounced" search term (updates only after user stops typing)
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  // 1. Fetch Categories on Mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/categories/");
        if (response.ok) {
          const data = await response.json();
          // Backend returns array like ['Rings', 'Necklaces'], "All" is usually manually handled
          // If backend already sends "All", remove the manual addition
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // 2. Debounce Logic: Update 'debouncedSearch' 500ms after user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // 3. Fetch Products when Category or Search changes
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Build the query string based on backend filters
        const params = new URLSearchParams();

        if (selectedCategory !== "All") {
          params.append("category", selectedCategory);
        }

        if (debouncedSearch) {
          params.append("search", debouncedSearch);
        }

        const response = await fetch(
          `http://127.0.0.1:8000/api/products/?${params.toString()}`
        );

        if (response.ok) {
          const data = await response.json();
          // Ensure IDs are strings to match frontend interface
          const formattedData = data.map((item: any) => ({
            ...item,
            id: String(item.id),
          }));
          setProducts(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, debouncedSearch]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl font-serif font-bold text-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Collections
        </motion.h1>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search jewelry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories Buttons */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
              >
                <Button
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className={`relative overflow-hidden transition-all duration-300 ${
                    selectedCategory === category
                      ? "shadow-lg scale-105"
                      : "hover:scale-105 hover:shadow-md"
                  }`}
                >
                  <span className="relative z-10">{category}</span>
                  {selectedCategory === category && (
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary animate-pulse" />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg text-muted-foreground">
                  No products found matching your criteria.
                </p>
              </motion.div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Collections;

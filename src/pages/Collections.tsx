// import { useState, useEffect } from "react";
// import { Search, Loader2 } from "lucide-react";
// import { motion } from "framer-motion";
// import ProductCard from "@/components/ProductCard";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Product } from "@/context/CartContext";

// const Collections = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<string[]>(["All"]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   // State for the "debounced" search term (updates only after user stops typing)
//   const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

//   // 1. Fetch Categories on Mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         //const response = await fetch("http://127.0.0.1:8000/api/categories/");
//         const response = await fetch(
//           `${import.meta.env.VITE_API_BASE_URL}/api/categories/`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           // Backend returns array like ['Rings', 'Necklaces'], "All" is usually manually handled
//           // If backend already sends "All", remove the manual addition
//           setCategories(data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // 2. Debounce Logic: Update 'debouncedSearch' 500ms after user stops typing
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedSearch(searchQuery);
//     }, 500);
//     return () => clearTimeout(handler);
//   }, [searchQuery]);

//   // 3. Fetch Products when Category or Search changes
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       try {
//         // Build the query string based on backend filters
//         const params = new URLSearchParams();

//         if (selectedCategory !== "All") {
//           params.append("category", selectedCategory);
//         }

//         if (debouncedSearch) {
//           params.append("search", debouncedSearch);
//         }

//         // const response = await fetch(
//         //   `http://127.0.0.1:8000/api/products/?${params.toString()}`
//         // );
//         const response = await fetch(
//           `${
//             import.meta.env.VITE_API_BASE_URL
//           }/api/products/?${params.toString()}`
//         );

//         if (response.ok) {
//           const data = await response.json();
//           // Ensure IDs are strings to match frontend interface
//           const formattedData = data.map((item: any) => ({
//             ...item,
//             id: String(item.id),
//           }));
//           setProducts(formattedData);
//         }
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [selectedCategory, debouncedSearch]);

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

//           {/* Categories Buttons */}
//           <div className="flex flex-wrap gap-3">
//             {categories.map((category, index) => (
//               <motion.div
//                 key={category}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
//               >
//                 <Button
//                   variant={
//                     selectedCategory === category ? "default" : "outline"
//                   }
//                   onClick={() => setSelectedCategory(category)}
//                   className={`relative overflow-hidden transition-all duration-300 ${
//                     selectedCategory === category
//                       ? "shadow-lg scale-105"
//                       : "hover:scale-105 hover:shadow-md"
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

//         {/* Products Grid */}
//         {/* ... inside Collections.tsx return ... */}

//         {/* Products Grid */}
//         {isLoading ? (
//           <div className="flex justify-center items-center py-20">
//             <Loader2 className="h-10 w-10 animate-spin text-primary" />
//           </div>
//         ) : (
//           // Updated Grid: grid-cols-2 for mobile, reduced gap for mobile
//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
//             {products.length > 0 ? (
//               products.map((product, index) => (
//                 <motion.div
//                   key={product.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: "-50px" }}
//                   transition={{ duration: 0.5, delay: index * 0.05 }}
//                 >
//                   <ProductCard product={product} />
//                 </motion.div>
//               ))
//             ) : (
//               <motion.div
//                 className="col-span-full text-center py-12"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <p className="text-lg text-muted-foreground">
//                   No products found matching your criteria.
//                 </p>
//               </motion.div>
//             )}
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Collections;
import { useState, useEffect } from "react";
import { Search, Loader2, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Product } from "@/context/CartContext";

const Collections = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [bestsellerProducts, setBestsellerProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // State for the "debounced" search term
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Separate states for featured sections
  const [bestsellerLoading, setBestsellerLoading] = useState(false);
  const [trendingLoading, setTrendingLoading] = useState(false);

  // 1. Fetch Categories on Mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/categories/`
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(["All", ...data]); // Ensure "All" is first
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        // Fallback categories
        setCategories(["All", "Rings", "Necklaces", "Earrings", "Bracelets"]);
      }
    };
    fetchCategories();
  }, []);

  // 2. Debounce Logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // 3. Fetch ALL Products (main filterable section)
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== "All") {
          params.append("category", selectedCategory);
        }
        if (debouncedSearch) {
          params.append("search", debouncedSearch);
        }

        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/products/?${params.toString()}`
        );

        if (response.ok) {
          const data = await response.json();
          const formattedData = data.map((item: any) => ({
            ...item,
            id: String(item.id),
          }));
          setAllProducts(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, debouncedSearch]);

  // 4. Fetch Bestseller Products (isBestseller=true ONLY)
  useEffect(() => {
    const fetchBestsellers = async () => {
      setBestsellerLoading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/products/?is_bestseller=true`
        );
        if (response.ok) {
          const data = await response.json();
          const formattedData = data.map((item: any) => ({
            ...item,
            id: String(item.id),
          }));
          setBestsellerProducts(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch bestsellers:", error);
      } finally {
        setBestsellerLoading(false);
      }
    };
    fetchBestsellers();
  }, []);

  // 5. Fetch Trending Products (isTrending=true ONLY)
  useEffect(() => {
    const fetchTrending = async () => {
      setTrendingLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/?is_trending=true`
        );
        if (response.ok) {
          const data = await response.json();
          const formattedData = data.map((item: any) => ({
            ...item,
            id: String(item.id),
          }));
          setTrendingProducts(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch trending:", error);
      } finally {
        setTrendingLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Main Title */}
        <motion.h1
          className="text-4xl font-serif font-bold text-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Collections
        </motion.h1>

        {/* 🏆 BESTSELLERS SECTION - Only shows isBestseller=true products */}
        {bestsellerProducts.length > 0 && !bestsellerLoading && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
              <div className="p-3 bg-amber-500 rounded-2xl shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-bold text-foreground">
                  🏆 Bestsellers
                </h2>
                <p className="text-xl text-muted-foreground font-medium">
                  Customer favorites you can't miss
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {bestsellerProducts.slice(0, 10).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 📈 TRENDING SECTION - Only shows isTrending=true products */}
        {trendingProducts.length > 0 && !trendingLoading && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
              <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-bold text-foreground">
                  📈 Trending Now
                </h2>
                <p className="text-xl text-muted-foreground font-medium">
                  What's hot in jewelry right now
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {trendingProducts.slice(0, 10).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Search & Category Filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search rings, necklaces, earrings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              >
                <Button
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "shadow-lg shadow-primary/25 scale-[1.02] bg-gradient-to-r from-primary to-primary/80"
                      : "hover:scale-[1.02] hover:shadow-md hover:bg-accent hover:text-foreground border-border"
                  }`}
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg text-muted-foreground">
                Loading collections...
              </p>
            </div>
          ) : allProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
              {allProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="col-span-full flex flex-col items-center justify-center py-24 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Search className="h-16 w-16 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                No products found
              </h3>
              <p className="text-lg text-muted-foreground max-w-md">
                Try adjusting your search or category filters above.
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Collections;

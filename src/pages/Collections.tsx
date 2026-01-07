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
import { Search, Loader2, Award, TrendingUp } from "lucide-react"; // Added new icons
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

  // NEW: Bestseller and Trending filter states
  const [isBestsellerFilter, setIsBestsellerFilter] = useState(false);
  const [isTrendingFilter, setIsTrendingFilter] = useState(false);

  // 1. Fetch Categories on Mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/categories/`
        );
        if (response.ok) {
          const data = await response.json();
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

  // 3. Fetch Products when ANY filter changes
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Build the query string based on ALL filters
        const params = new URLSearchParams();

        if (selectedCategory !== "All") {
          params.append("category", selectedCategory);
        }

        if (debouncedSearch) {
          params.append("search", debouncedSearch);
        }

        // NEW: Bestseller and Trending filters
        if (isBestsellerFilter) {
          params.append("is_bestseller", "true");
        }
        if (isTrendingFilter) {
          params.append("is_trending", "true");
        }

        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/products/?${params.toString()}`
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
  }, [selectedCategory, debouncedSearch, isBestsellerFilter, isTrendingFilter]); // Added new dependencies

  // NEW: Filter button styling helper
  const getFilterButtonVariant = (filterType: string) => {
    if (filterType === "bestseller" && isBestsellerFilter) return "default";
    if (filterType === "trending" && isTrendingFilter) return "default";
    return "outline";
  };

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
          <div className="flex flex-wrap gap-3 mb-6">
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

          {/* NEW: Bestseller & Trending Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Button
                variant={getFilterButtonVariant("bestseller")}
                onClick={() => setIsBestsellerFilter(!isBestsellerFilter)}
                className={`relative overflow-hidden transition-all duration-300 flex items-center gap-2 group ${
                  isBestsellerFilter
                    ? "shadow-lg scale-105 bg-amber-500 hover:bg-amber-600"
                    : "hover:scale-105 hover:shadow-md border-amber-200 hover:border-amber-300 hover:bg-amber-50"
                }`}
              >
                <Award
                  className={`h-4 w-4 ${
                    isBestsellerFilter ? "fill-current" : ""
                  }`}
                />
                <span className="relative z-10 font-medium">Bestseller</span>
                {isBestsellerFilter && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 animate-pulse"
                    layoutId="bestseller-glow"
                  />
                )}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              <Button
                variant={getFilterButtonVariant("trending")}
                onClick={() => setIsTrendingFilter(!isTrendingFilter)}
                className={`relative overflow-hidden transition-all duration-300 flex items-center gap-2 group ${
                  isTrendingFilter
                    ? "shadow-lg scale-105 bg-emerald-500 hover:bg-emerald-600"
                    : "hover:scale-105 hover:shadow-md border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                }`}
              >
                <TrendingUp
                  className={`h-4 w-4 ${
                    isTrendingFilter ? "fill-current" : ""
                  }`}
                />
                <span className="relative z-10 font-medium">Trending</span>
                {isTrendingFilter && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 animate-pulse"
                    layoutId="trending-glow"
                  />
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
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

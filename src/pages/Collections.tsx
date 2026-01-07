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
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Debounced search state
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // NEW: Bestseller and Trending filter states (toggle buttons)
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
          setCategories(["All", ...data]);
        } else {
          setCategories(["Rings", "Necklaces", "Earrings", "Bracelets"]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
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

  // 3. Fetch Products when ANY filter changes
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();

        if (selectedCategory !== "All") {
          params.append("category", selectedCategory);
        }

        if (debouncedSearch.trim()) {
          params.append("search", debouncedSearch);
        }

        // NEW: Bestseller filter - only products where is_bestseller=true
        if (isBestsellerFilter) {
          params.append("is_bestseller", "true");
        }

        // NEW: Trending filter - only products where is_trending=true
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
  }, [selectedCategory, debouncedSearch, isBestsellerFilter, isTrendingFilter]);

  // Filter button variant helper
  const getFilterButtonVariant = (filterType: string) => {
    if (filterType === "bestseller" && isBestsellerFilter) return "default";
    if (filterType === "trending" && isTrendingFilter) return "default";
    return "outline";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <motion.h1
          className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Collections
        </motion.h1>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search rings, necklaces, earrings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 h-12 text-lg shadow-sm"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.15 + index * 0.04 }}
              >
                <Button
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="lg"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-primary to-primary/90 scale-105"
                      : "hover:scale-105 hover:bg-accent hover:shadow-primary/20"
                  }`}
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* NEW: Bestseller & Trending Filter Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {/* Bestseller Filter Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Button
                variant={getFilterButtonVariant("bestseller")}
                onClick={() => setIsBestsellerFilter(!isBestsellerFilter)}
                className={`relative overflow-hidden group flex items-center gap-2 px-6 py-3 font-semibold shadow-lg transition-all duration-300 ${
                  isBestsellerFilter
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 scale-105 shadow-amber-500/25 hover:shadow-amber-500/40"
                    : "border-amber-200 hover:border-amber-300 hover:bg-amber-50 hover:shadow-amber-200/50"
                }`}
              >
                <Award
                  className={`h-5 w-5 transition-all ${
                    isBestsellerFilter ? "fill-current shadow-lg" : ""
                  }`}
                />
                <span className="relative z-10">Bestsellers</span>
                {isBestsellerFilter && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 animate-pulse opacity-75"
                    layoutId="bestseller-glow"
                  />
                )}
              </Button>
            </motion.div>

            {/* Trending Filter Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.35 }}
            >
              <Button
                variant={getFilterButtonVariant("trending")}
                onClick={() => setIsTrendingFilter(!isTrendingFilter)}
                className={`relative overflow-hidden group flex items-center gap-2 px-6 py-3 font-semibold shadow-lg transition-all duration-300 ${
                  isTrendingFilter
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 scale-105 shadow-emerald-500/25 hover:shadow-emerald-500/40"
                    : "border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-emerald-200/50"
                }`}
              >
                <TrendingUp
                  className={`h-5 w-5 transition-all ${
                    isTrendingFilter ? "fill-current shadow-lg" : ""
                  }`}
                />
                <span className="relative z-10">Trending</span>
                {isTrendingFilter && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 animate-pulse opacity-75"
                    layoutId="trending-glow"
                  />
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <motion.div
            className="flex flex-col items-center justify-center py-32 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Loader2 className="h-16 w-16 animate-spin text-primary drop-shadow-lg" />
            <p className="text-2xl font-medium text-muted-foreground">
              Loading collections...
            </p>
          </motion.div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="col-span-full flex flex-col items-center justify-center py-32 text-center space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-28 h-28 bg-muted rounded-3xl flex items-center justify-center">
              <Search className="h-16 w-16 text-muted-foreground opacity-40" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-foreground">
              No products found
            </h3>
            <p className="text-xl text-muted-foreground max-w-md">
              Try adjusting your filters or search for something else.
            </p>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Collections;

// import { Link } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";
// import BannerCarousel from "@/components/BannerCarousel";
// import ProductCard from "@/components/ProductCard";
// import { products } from "@/data/products";
// import { Button } from "@/components/ui/button";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const Home = () => {
//   const featuredProducts = products.slice(0, 4);

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main>
//         <section className="container mx-auto px-4 py-8">
//           <BannerCarousel />
//         </section>

//         <section className="container mx-auto px-4 py-16">
//           <motion.div
//             className="text-center mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
//               Featured Collection
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Discover our handpicked selection of exquisite 18K gold jewelry,
//               crafted with precision and adorned with the finest gemstones.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {featuredProducts.map((product, index) => (
//               <motion.div
//                 key={product.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//               >
//                 <ProductCard product={product} />
//               </motion.div>
//             ))}
//           </div>

//           <motion.div
//             className="text-center"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             <Link to="/collections">
//               <Button size="lg" className="group">
//                 Explore All Collections
//                 <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </Link>
//           </motion.div>
//         </section>

//         <section className="bg-accent py-16">
//           <div className="container mx-auto px-4 text-center">
//             <motion.h2
//               className="text-3xl font-serif font-bold text-accent-foreground mb-4"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               Why Choose Finetaara Jewelry?
//             </motion.h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
//               {[
//                 {
//                   icon: "✨",
//                   title: "Premium Quality",
//                   desc: "Only the finest 18K gold and certified gemstones",
//                 },
//                 {
//                   icon: "🎨",
//                   title: "Timeless Design",
//                   desc: "Elegant pieces that never go out of style",
//                 },
//                 {
//                   icon: "💎",
//                   title: "Expert Craftsmanship",
//                   desc: "Meticulously crafted by skilled artisans",
//                 },
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   className="p-6"
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: index * 0.15 }}
//                 >
//                   <div className="text-4xl mb-4">{item.icon}</div>
//                   <h3 className="text-xl font-semibold mb-2 text-accent-foreground">
//                     {item.title}
//                   </h3>
//                   <p className="text-accent-foreground/80">{item.desc}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Home;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import BannerCarousel from "@/components/BannerCarousel";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Product } from "@/context/CartContext"; // Ensure this import exists

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Fetch from the specific "featured" endpoint
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/featured/`
        );

        if (response.ok) {
          const data = await response.json();
          // Map the data to ensure IDs are strings (Django sends numbers)
          const formattedData = data.map((item: any) => ({
            ...item,
            id: String(item.id),
          }));
          setFeaturedProducts(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="container mx-auto px-4 py-8">
          <BannerCarousel />
        </section>

        <section className="container mx-auto px-4 py-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              Featured Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of exquisite 18K gold jewelry,
              crafted with precision and adorned with the finest gemstones.
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            /* Product Grid - Updated for 2 columns on mobile */
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6 mb-8">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center text-muted-foreground py-12">
                  <p>No featured products available at the moment.</p>
                </div>
              )}
            </div>
          )}

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/collections">
              <Button size="lg" className="group">
                Explore All Collections
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </section>

        <section className="bg-accent py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl font-serif font-bold text-accent-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Why Choose Finetaraa Jewelry?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: "✨",
                  title: "Premium Quality",
                  desc: "Only the finest 18K gold and qualified gemstones",
                },
                {
                  icon: "🎨",
                  title: "Timeless Design",
                  desc: "Elegant pieces that never go out of style",
                },
                {
                  icon: "💎",
                  title: "Expert Craftsmanship",
                  desc: "Meticulously crafted by skilled artisans",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-accent-foreground">
                    {item.title}
                  </h3>
                  <p className="text-accent-foreground/80">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

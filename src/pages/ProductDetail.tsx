// import { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useCart, Product } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import {
//   ShoppingCart,
//   ArrowLeft,
//   ZoomIn,
//   Share2,
//   Truck,
//   ShieldCheck,
//   RefreshCcw,
//   ChevronDown,
// } from "lucide-react";
// import { toast } from "sonner";

// // ASSUMED IMPORTS - Please update paths if your components are named differently
// import Navbar from "@/components/Header";
// import Footer from "@/components/Footer";

// const ProductDetailPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Image State
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [isZoomed, setIsZoomed] = useState(false);

//   // UI State
//   const [activeTab, setActiveTab] = useState<string>("description");

//   const imageContainerRef = useRef<HTMLDivElement>(null);
//   const imageRef = useRef<HTMLImageElement>(null);

//   const { addToCart } = useCart();

//   // Clean image URLs from markdown format
//   const cleanImageUrl = (url: string): string => {
//     if (typeof url === "string") {
//       return url.replace(/\[.*?\]\(.*?\)/g, "").trim() || url;
//     }
//     return url;
//   };

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         if (!id) return;
//         const baseUrl = import.meta.env.VITE_API_BASE_URL;
//         const res = await fetch(`${baseUrl}/api/products/${id}/`);
//         if (!res.ok) throw new Error("Product not found");
//         const data = await res.json();

//         const cleanedData = {
//           ...data,
//           id: String(data.id), // <--- ADD THIS: Force ID to be a string
//           images: data.images?.map((img: string) => cleanImageUrl(img)) || [],
//         };

//         setProduct(cleanedData);
//         setSelectedImageIndex(0);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//         toast.error("Failed to load product details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   // Enhanced Pinch Zoom Logic
//   useEffect(() => {
//     const container = imageContainerRef.current;
//     const img = imageRef.current;

//     if (!container || !img) return;

//     let scale = 1;
//     let startDist = 0;

//     const handleTouchStart = (e: TouchEvent) => {
//       if (e.touches.length === 2) {
//         e.preventDefault();
//         startDist = Math.hypot(
//           e.touches[0].pageX - e.touches[1].pageX,
//           e.touches[0].pageY - e.touches[1].pageY
//         );
//       }
//     };

//     const handleTouchMove = (e: TouchEvent) => {
//       if (e.touches.length === 2) {
//         e.preventDefault();
//         const dist = Math.hypot(
//           e.touches[0].pageX - e.touches[1].pageX,
//           e.touches[0].pageY - e.touches[1].pageY
//         );
//         const newScale = Math.min(Math.max(1, (dist / startDist) * scale), 3);

//         img.style.transform = `scale(${newScale})`;
//         img.style.transition = "none";

//         if (e.type === "touchend") scale = newScale;
//       }
//     };

//     const handleTouchEnd = () => {
//       img.style.transition = "transform 0.3s ease-out";
//       if (img.style.transform.includes("scale(1)")) {
//         scale = 1;
//       }
//     };

//     container.addEventListener("touchstart", handleTouchStart, {
//       passive: false,
//     });
//     container.addEventListener("touchmove", handleTouchMove, {
//       passive: false,
//     });
//     container.addEventListener("touchend", handleTouchEnd);

//     return () => {
//       container.removeEventListener("touchstart", handleTouchStart);
//       container.removeEventListener("touchmove", handleTouchMove);
//       container.removeEventListener("touchend", handleTouchEnd);
//     };
//   }, [selectedImageIndex, product]);

//   const toggleZoom = () => setIsZoomed(!isZoomed);

//   const handleAddToCart = () => {
//     if (product && (product.inStock ?? true)) {
//       addToCart(product);
//       toast.success(`${product.name} added to cart!`);
//     }
//   };

//   const handleShare = async () => {
//     if (navigator.share && product) {
//       try {
//         await navigator.share({
//           title: product.name,
//           text: `Check out ${product.name}`,
//           url: window.location.href,
//         });
//       } catch (err) {
//         console.log("Error sharing", err);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       toast.success("Link copied to clipboard!");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col min-h-screen bg-background">
//         <Navbar />
//         <div className="flex-grow flex items-center justify-center">
//           <div className="flex flex-col items-center gap-4">
//             <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
//             <p className="text-muted-foreground animate-pulse">
//               Loading details...
//             </p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex flex-col min-h-screen bg-background">
//         <Navbar />
//         <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
//           <div className="bg-muted p-6 rounded-full mb-4">
//             <ShoppingCart className="w-12 h-12 text-muted-foreground" />
//           </div>
//           <h2 className="text-2xl font-bold text-foreground mb-2">
//             Product Not Found
//           </h2>
//           <p className="text-muted-foreground mb-6 max-w-md">
//             We couldn't find the product you're looking for. It might have been
//             removed or is temporarily unavailable.
//           </p>
//           <Button onClick={() => navigate("/shop")}>Return to Shop</Button>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const displayRating = Number(product.rating ?? 4.5);
//   const fullStars = Math.floor(displayRating);
//   const isInStock = product.inStock ?? true;
//   const currentImage = product.images?.[selectedImageIndex]
//     ? cleanImageUrl(product.images[selectedImageIndex])
//     : null;

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50/50">
//       <Navbar />

//       {/* Main Content */}
//       <main className="flex-grow pt-4 pb-20 md:pb-12 animate-fade-in">
//         {/* Breadcrumb & Mobile Header */}
//         <div className="sticky top-[60px] md:top-20 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b md:border-none md:static px-4 py-3 md:py-6">
//           <div className="max-w-7xl mx-auto flex items-center justify-between">
//             <button
//               onClick={() => navigate(-1)}
//               className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
//             >
//               <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
//                 <ArrowLeft className="w-4 h-4" />
//               </div>
//               <span className="hidden md:inline">Back to Collection</span>
//             </button>

//             <button
//               onClick={handleShare}
//               className="md:hidden p-2 text-muted-foreground hover:bg-gray-100 rounded-full"
//             >
//               <Share2 className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-12 gap-8 xl:gap-12">
//             {/* --- Left Column: Images (7 cols) --- */}
//             <div className="lg:col-span-7 space-y-6">
//               {/* Main Image Stage */}
//               <div
//                 ref={imageContainerRef}
//                 className={`relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-[600px] flex items-center justify-center touch-manipulation cursor-zoom-in group ${
//                   isZoomed
//                     ? "z-[60] fixed inset-0 bg-black/95 rounded-none h-screen w-screen border-none"
//                     : ""
//                 }`}
//                 onClick={toggleZoom}
//               >
//                 {currentImage ? (
//                   <img
//                     ref={imageRef}
//                     src={currentImage}
//                     alt={product.name}
//                     className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
//                       isZoomed
//                         ? "w-full h-full p-0"
//                         : "p-4 group-hover:scale-105"
//                     }`}
//                     style={{ transform: isZoomed ? "scale(1.5)" : "scale(1)" }}
//                   />
//                 ) : (
//                   <div className="text-gray-300 flex flex-col items-center">
//                     <ZoomIn className="w-16 h-16 mb-2 opacity-50" />
//                     <span className="text-sm font-medium">
//                       No Image Available
//                     </span>
//                   </div>
//                 )}

//                 {!isZoomed && (
//                   <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-foreground px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-gray-200 pointer-events-none flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <ZoomIn className="w-3 h-3" />
//                     Hover to Zoom
//                   </div>
//                 )}

//                 {isZoomed && (
//                   <button
//                     className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 p-3 rounded-full backdrop-blur-md transition-all"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleZoom();
//                     }}
//                   >
//                     <span className="sr-only">Close Zoom</span>
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 )}
//               </div>

//               {/* Thumbnail Gallery */}
//               {product.images && product.images.length > 1 && (
//                 <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
//                   {product.images.map((img, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => setSelectedImageIndex(idx)}
//                       className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
//                         selectedImageIndex === idx
//                           ? "border-primary ring-2 ring-primary/20 scale-95 opacity-100"
//                           : "border-transparent bg-white hover:border-gray-200 opacity-70 hover:opacity-100"
//                       }`}
//                     >
//                       <img
//                         src={cleanImageUrl(img)}
//                         alt={`View ${idx + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {/* Features Grid (Fills empty space below images on large screens) */}
//               <div className="hidden lg:grid grid-cols-3 gap-4 pt-8 border-t">
//                 <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
//                   <Truck className="w-8 h-8 text-primary mb-3" />
//                   <h4 className="font-semibold text-sm mb-1">Fast Delivery</h4>
//                   <p className="text-xs text-muted-foreground">
//                     Across all regions
//                   </p>
//                 </div>
//                 <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
//                   <ShieldCheck className="w-8 h-8 text-primary mb-3" />
//                   <h4 className="font-semibold text-sm mb-1">Secure Payment</h4>
//                   <p className="text-xs text-muted-foreground">
//                     100% Protected
//                   </p>
//                 </div>
//                 {/* <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
//                   <RefreshCcw className="w-8 h-8 text-primary mb-3" />
//                   <h4 className="font-semibold text-sm mb-1">Easy Returns</h4>
//                   <p className="text-xs text-muted-foreground">30-Day Policy</p>
//                 </div> */}
//               </div>
//             </div>

//             {/* --- Right Column: Details (5 cols) --- */}
//             <div className="lg:col-span-5 relative">
//               {/* Sticky Container */}
//               <div className="sticky top-24 space-y-8">
//                 {/* Product Header */}
//                 <div>
//                   <div className="flex justify-between items-start mb-2">
//                     <h1 className="text-3xl font-bold text-gray-900 leading-tight">
//                       {product.name}
//                     </h1>
//                     <button
//                       onClick={handleShare}
//                       className="hidden md:flex p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-full transition-colors"
//                     >
//                       <Share2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                   <p className="text-lg text-primary font-medium mb-4">
//                     {product.category}
//                   </p>

//                   {/* Rating */}
//                   <div className="flex items-center gap-2">
//                     <div className="flex text-yellow-400">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <svg
//                           key={star}
//                           className={`w-5 h-5 ${
//                             star <= fullStars
//                               ? "fill-current"
//                               : "text-gray-200 fill-current"
//                           }`}
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       ))}
//                     </div>
//                     <span className="text-sm text-muted-foreground">
//                       ({product.ratingCount ?? 45} reviews)
//                     </span>
//                   </div>
//                 </div>

//                 {/* Pricing Card */}
//                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
//                   <div className="mb-6">
//                     {product.discountPrice ? (
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-3">
//                           <span className="text-4xl font-bold text-gray-900">
//                             ₹{Number(product.discountPrice).toLocaleString()}
//                           </span>
//                           <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-sm font-bold">
//                             -{product.discountPercent}%
//                           </span>
//                         </div>
//                         <p className="text-gray-400 line-through font-medium">
//                           MRP: ₹{Number(product.price).toLocaleString()}
//                         </p>
//                       </div>
//                     ) : (
//                       <span className="text-4xl font-bold text-gray-900">
//                         ₹{Number(product.price).toLocaleString()}
//                       </span>
//                     )}
//                     <p className="text-xs text-muted-foreground mt-2">
//                       Inclusive of all taxes
//                     </p>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="space-y-3">
//                     <Button
//                       onClick={handleAddToCart}
//                       disabled={!isInStock}
//                       size="lg"
//                       className="w-full h-12 text-lg shadow-lg hover:shadow-primary/25 transition-all"
//                     >
//                       <ShoppingCart className="w-5 h-5 mr-2" />
//                       {isInStock ? "Add to Cart" : "Out of Stock"}
//                     </Button>
//                     <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-3">
//                       <div
//                         className={`w-2 h-2 rounded-full ${
//                           isInStock ? "bg-green-500" : "bg-red-500"
//                         }`}
//                       />
//                       {isInStock
//                         ? "In stock, ready to ship"
//                         : "Currently unavailable"}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Collapsible Info Sections (To fill space) */}
//                 <div className="space-y-2">
//                   <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
//                     <button
//                       onClick={() =>
//                         setActiveTab(
//                           activeTab === "description" ? "" : "description"
//                         )
//                       }
//                       className="w-full px-5 py-4 flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 transition-colors"
//                     >
//                       <span className="font-semibold text-gray-900">
//                         Description
//                       </span>
//                       <ChevronDown
//                         className={`w-4 h-4 transition-transform ${
//                           activeTab === "description" ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>
//                     {activeTab === "description" && (
//                       <div className="px-5 py-4 prose prose-sm max-w-none text-gray-600 border-t border-gray-100 animate-fade-in">
//                         {stripHtml(product.description)}
//                       </div>
//                     )}
//                   </div>

//                   {/*  */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />

//       {/* Mobile Sticky Add to Cart (Only visible on small screens) */}
//       <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:hidden z-40 safe-area-bottom">
//         <div className="flex gap-4">
//           <div className="flex-1">
//             <p className="text-xs text-muted-foreground">Total Price</p>
//             <p className="text-lg font-bold text-foreground">
//               ₹{Number(product.discountPrice || product.price).toLocaleString()}
//             </p>
//           </div>
//           <Button
//             onClick={handleAddToCart}
//             disabled={!isInStock}
//             className="flex-[2] h-12 text-base font-semibold shadow-md"
//           >
//             {isInStock ? "Add to Cart" : "No Stock"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // HTML Strip Helper
// const stripHtml = (html: string) => {
//   if (!html) return "";
//   const tmp = document.createElement("DIV");
//   tmp.innerHTML = html;
//   return tmp.textContent || tmp.innerText || "";
// };

// export default ProductDetailPage;
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart, Product } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  ArrowLeft,
  ZoomIn,
  Share2,
  Truck,
  ShieldCheck,
  // RefreshCcw,
  ChevronDown,
  TrendingUp,
  Award,
} from "lucide-react";
import { toast } from "sonner";

// ASSUMED IMPORTS
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Image State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // UI State
  const [activeTab, setActiveTab] = useState<string>("description");

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { addToCart } = useCart();

  // Clean image URLs from markdown format
  const cleanImageUrl = (url: string): string => {
    if (typeof url === "string") {
      return url.replace(/\[.*?\]\(.*?\)/g, "").trim() || url;
    }
    return url;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${baseUrl}/api/products/${id}/`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();

        const cleanedData = {
          ...data,
          id: String(data.id),
          images: data.images?.map((img: string) => cleanImageUrl(img)) || [],
        };

        setProduct(cleanedData);
        setSelectedImageIndex(0);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Enhanced Pinch Zoom Logic
  useEffect(() => {
    const container = imageContainerRef.current;
    const img = imageRef.current;

    if (!container || !img) return;

    let scale = 1;
    let startDist = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        startDist = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dist = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        const newScale = Math.min(Math.max(1, (dist / startDist) * scale), 3);

        img.style.transform = `scale(${newScale})`;
        img.style.transition = "none";

        if (e.type === "touchend") scale = newScale;
      }
    };

    const handleTouchEnd = () => {
      img.style.transition = "transform 0.3s ease-out";
      if (img.style.transform.includes("scale(1)")) {
        scale = 1;
      }
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [selectedImageIndex, product]);

  const toggleZoom = () => setIsZoomed(!isZoomed);

  const handleAddToCart = () => {
    if (product && (product.inStock ?? true)) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="text-muted-foreground animate-pulse">
              Loading details...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-muted p-6 rounded-full mb-4">
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Product Not Found
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            We couldn't find the product you're looking for. It might have been
            removed or is temporarily unavailable.
          </p>
          <Button onClick={() => navigate("/shop")}>Return to Shop</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const displayRating = Number(product.rating ?? 4.5);
  const fullStars = Math.floor(displayRating);
  const isInStock = product.inStock ?? true;
  const currentImage = product.images?.[selectedImageIndex]
    ? cleanImageUrl(product.images[selectedImageIndex])
    : null;

  return (
    // Changed bg-gray-50/50 to bg-background
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-4 pb-20 md:pb-12 animate-fade-in">
        {/* Breadcrumb & Mobile Header */}
        <div className="sticky top-[60px] md:top-20 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border md:border-none md:static px-4 py-3 md:py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {/* Changed bg-gray-100 to bg-muted */}
              <div className="p-1.5 rounded-full bg-muted group-hover:bg-accent transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="hidden md:inline">Back to Collection</span>
            </button>

            <button
              onClick={handleShare}
              className="md:hidden p-2 text-muted-foreground hover:bg-accent rounded-full"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 xl:gap-12">
            {/* --- Left Column: Images (7 cols) --- */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main Image Stage - Changed bg-white/border-gray-100 to bg-card/border-border */}
              <div
                ref={imageContainerRef}
                className={`relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-[600px] flex items-center justify-center touch-manipulation cursor-zoom-in group ${
                  isZoomed
                    ? "z-[60] fixed inset-0 bg-background rounded-none h-screen w-screen border-none"
                    : ""
                }`}
                onClick={toggleZoom}
              >
                {currentImage ? (
                  <img
                    ref={imageRef}
                    src={currentImage}
                    alt={product.name}
                    className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
                      isZoomed
                        ? "w-full h-full p-0"
                        : "p-4 group-hover:scale-105"
                    }`}
                    style={{ transform: isZoomed ? "scale(1.5)" : "scale(1)" }}
                  />
                ) : (
                  <div className="text-muted-foreground flex flex-col items-center">
                    <ZoomIn className="w-16 h-16 mb-2 opacity-50" />
                    <span className="text-sm font-medium">
                      No Image Available
                    </span>
                  </div>
                )}

                {!isZoomed && (
                  <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur text-foreground px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-border pointer-events-none flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3 h-3" />
                    Hover to Zoom
                  </div>
                )}

                {isZoomed && (
                  <button
                    className="absolute top-6 right-6 text-foreground/80 hover:text-foreground bg-background/10 p-3 rounded-full backdrop-blur-md transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleZoom();
                    }}
                  >
                    <span className="sr-only">Close Zoom</span>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      // Changed bg-white to bg-card, border colors adapted
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        selectedImageIndex === idx
                          ? "border-primary ring-2 ring-primary/20 scale-95 opacity-100"
                          : "border-transparent bg-card hover:border-border opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={cleanImageUrl(img)}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Features Grid - Changed bg-white to bg-card, border-gray-100 to border-border */}
              <div className="hidden lg:grid grid-cols-3 gap-4 pt-8 border-t border-border">
                <div className="flex flex-col items-center text-center p-4 bg-card rounded-xl shadow-sm border border-border">
                  <Truck className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold text-sm mb-1 text-foreground">
                    Fast Delivery
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Across all regions
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-card rounded-xl shadow-sm border border-border">
                  <ShieldCheck className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold text-sm mb-1 text-foreground">
                    Secure Payment
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    100% Protected
                  </p>
                </div>
              </div>
            </div>

            {/* --- Right Column: Details (5 cols) --- */}
            <div className="lg:col-span-5 relative">
              {/* Sticky Container */}
              <div className="sticky top-24 space-y-8">
                {/* Product Header */}
                <div>
                  {/* <div className="flex justify-between items-start mb-2">
                    <h1 className="text-3xl font-bold text-foreground leading-tight">
                      {product.name}
                    </h1>
                    <button
                      onClick={handleShare}
                      className="hidden md:flex p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-lg text-primary font-medium mb-4">
                    {product.category}
                  </p> */}
                  <div className="flex justify-between items-start mb-2">
                    <h1 className="text-3xl font-bold text-foreground leading-tight">
                      {product.name}
                    </h1>
                    <button
                      onClick={handleShare}
                      className="hidden md:flex p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                  {product.isBestseller || product.isTrending ? (
                    <div className="flex items-center gap-2 mb-4">
                      {product.isBestseller && (
                        <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 rounded-full text-sm font-semibold border border-amber-200 dark:border-amber-700">
                          <Award className="w-4 h-4" />
                          Bestseller
                        </div>
                      )}
                      {product.isTrending && (
                        <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-semibold border border-emerald-200 dark:border-emerald-700">
                          <TrendingUp className="w-4 h-4" />
                          Trending
                        </div>
                      )}
                    </div>
                  ) : null}

                  <p className="text-lg text-primary font-medium mb-4">
                    {product.category}
                  </p>
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${
                            star <= fullStars
                              ? "fill-current"
                              : "text-muted fill-current" // Changed empty star color
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.ratingCount ?? 45} reviews)
                    </span>
                  </div>
                </div>

                {/* Pricing Card - Changed bg-white to bg-card, border-gray-100 to border-border */}
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                  <div className="mb-6">
                    {product.discountPrice ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl font-bold text-foreground">
                            ₹{Number(product.discountPrice).toLocaleString()}
                          </span>
                          <span className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 px-2 py-0.5 rounded text-sm font-bold">
                            -{product.discountPercent}%
                          </span>
                        </div>
                        <p className="text-muted-foreground line-through font-medium">
                          MRP: ₹{Number(product.price).toLocaleString()}
                        </p>
                      </div>
                    ) : (
                      <span className="text-4xl font-bold text-foreground">
                        ₹{Number(product.price).toLocaleString()}
                      </span>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Inclusive of all taxes
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleAddToCart}
                      disabled={!isInStock}
                      size="lg"
                      className="w-full h-12 text-lg shadow-lg hover:shadow-primary/25 transition-all"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      {isInStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isInStock ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      {isInStock
                        ? "In stock, ready to ship"
                        : "Currently unavailable"}
                    </div>
                  </div>
                </div>

                {/* Collapsible Info Sections */}
                <div className="space-y-2">
                  {/* Changed border-gray-200 to border-border, bg-white to bg-card */}
                  <div className="border border-border rounded-lg overflow-hidden bg-card">
                    <button
                      onClick={() =>
                        setActiveTab(
                          activeTab === "description" ? "" : "description"
                        )
                      }
                      // Changed hover:bg-gray-50 to hover:bg-accent
                      className="w-full px-5 py-4 flex justify-between items-center bg-card hover:bg-accent transition-colors"
                    >
                      <span className="font-semibold text-foreground">
                        Description
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform text-foreground ${
                          activeTab === "description" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeTab === "description" && (
                      // Changed text-gray-600 to text-muted-foreground
                      <div className="px-5 py-4 prose prose-sm max-w-none text-muted-foreground border-t border-border animate-fade-in">
                        {stripHtml(product.description)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile Sticky Add to Cart */}
      {/* Changed bg-white to bg-background, border-gray-200 to border-border */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border md:hidden z-40 safe-area-bottom">
        <div className="flex gap-4">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Total Price</p>
            <p className="text-lg font-bold text-foreground">
              ₹{Number(product.discountPrice || product.price).toLocaleString()}
            </p>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={!isInStock}
            className="flex-[2] h-12 text-base font-semibold shadow-md"
          >
            {isInStock ? "Add to Cart" : "No Stock"}
          </Button>
        </div>
      </div>
    </div>
  );
};

// HTML Strip Helper
const stripHtml = (html: string) => {
  if (!html) return "";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export default ProductDetailPage;

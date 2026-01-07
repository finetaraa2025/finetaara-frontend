// import { useState, useEffect } from "react";
// import { Plus, Minus, ShoppingCart, Star } from "lucide-react"; // Import Star
// import { Product, useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// interface ProductCardProps {
//   product: Product;
// }

// const stripHtml = (html: string) => {
//   if (!html) return "";
//   const tmp = document.createElement("DIV");
//   tmp.innerHTML = html;
//   return tmp.textContent || tmp.innerText || "";
// };

// const ProductCard = ({ product }: ProductCardProps) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const { addToCart, cart, updateQuantity } = useCart();
//   const navigate = useNavigate();

//   const cartItem = cart.find((item) => item.id === product.id);
//   const hasImages = product.images && product.images.length > 0;

//   // Use values from product or default to 0
//   const rating = product.rating || 0;
//   const reviewCount = product.ratingCount || 0;

//   useEffect(() => {
//     if (!hasImages || !product.images) return;
//     const timer = setInterval(() => {
//       setCurrentImageIndex((prev) => (prev + 1) % product.images!.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, [hasImages, product.images?.length]);

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     for (let i = 0; i < quantity; i++) {
//       addToCart(product);
//     }
//     toast.success(`${product.name} added to cart!`);
//     setQuantity(1);
//   };

//   const handleIncrement = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setQuantity((prev) => prev + 1);
//   };

//   const handleDecrement = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//   };

//   const handleCartQuantityChange = (
//     newQuantity: number,
//     e: React.MouseEvent
//   ) => {
//     e.stopPropagation();
//     if (cartItem) updateQuantity(product.id, newQuantity);
//   };

//   const handleCardClick = () => {
//     navigate(`/products/${product.id}`);
//   };

//   // Helper to render dynamic stars
//   const renderStars = (rating: number) => {
//     return (
//       <div className="flex">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`w-3 h-3 sm:w-4 sm:h-4 ${
//               star <= Math.round(rating)
//                 ? "fill-yellow-500 text-yellow-500"
//                 : "text-gray-300 fill-gray-100"
//             }`}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
//       {/* ... (Image Section remains unchanged) ... */}
//       <div
//         className="relative h-48 sm:h-80 overflow-hidden bg-gray-100 cursor-pointer shrink-0"
//         onClick={handleCardClick}
//       >
//         {hasImages ? (
//           product.images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={product.name}
//               className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
//                 index === currentImageIndex ? "opacity-100" : "opacity-0"
//               }`}
//             />
//           ))
//         ) : (
//           <div className="absolute inset-0 flex items-center justify-center text-gray-400">
//             No Image
//           </div>
//         )}

//         {product.discountPercent && (
//           <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg z-10">
//             {product.discountPercent}% OFF
//           </div>
//         )}

//         {!product.inStock && (
//           <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
//             <span className="text-lg sm:text-2xl font-bold text-white">
//               Out of Stock
//             </span>
//           </div>
//         )}

//         {hasImages && (
//           <div className="absolute bottom-2 right-2 flex gap-1 z-10">
//             {product.images.map((_, index) => (
//               <div
//                 key={index}
//                 className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
//                   index === currentImageIndex ? "bg-primary" : "bg-muted"
//                 }`}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <CardContent className="p-3 sm:p-4 cursor-pointer flex-grow">
//         <h3 className="font-serif text-base sm:text-xl font-semibold mb-1 sm:mb-2 line-clamp-1">
//           {product.name}
//         </h3>
//         <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
//           {product.category}
//         </p>

//         {/* DYNAMIC RATING SECTION */}
//         <div className="flex items-center gap-1 mb-2 sm:mb-3">
//           {renderStars(rating)}
//           <span className="text-xs text-gray-500 font-medium ml-1">
//             ({reviewCount})
//           </span>
//         </div>

//         <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
//           {product.discountPrice ? (
//             <>
//               <p className="text-base sm:text-lg font-bold text-primary">
//                 ₹{Number(product.discountPrice).toLocaleString()}
//               </p>
//               <p className="text-xs sm:text-sm text-muted-foreground line-through">
//                 ₹{Number(product.price).toLocaleString()}
//               </p>
//             </>
//           ) : (
//             <p className="text-base sm:text-lg font-bold text-primary">
//               ₹{Number(product.price).toLocaleString()}
//             </p>
//           )}
//         </div>

//         <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 hidden sm:block">
//           {stripHtml(product.description || "")}
//         </p>
//       </CardContent>

//       {/* Footer remains unchanged */}
//       <CardFooter className="p-3 sm:p-4 pt-0 mt-auto">
//         {!product.inStock ? (
//           <Button
//             disabled
//             className="w-full bg-gray-300 h-8 sm:h-10 text-xs sm:text-sm"
//           >
//             Out of Stock
//           </Button>
//         ) : !cartItem ? (
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
//             <div className="flex items-center justify-center border border-gray-300 rounded-md h-8 sm:h-10 w-full sm:w-auto">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handleDecrement}
//                 className="h-full px-2"
//               >
//                 <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
//               </Button>
//               <span className="px-2 sm:px-3 font-medium text-sm">
//                 {quantity}
//               </span>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handleIncrement}
//                 className="h-full px-2"
//               >
//                 <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
//               </Button>
//             </div>

//             <Button
//               onClick={handleAddToCart}
//               className="flex-1 h-8 sm:h-10 text-xs sm:text-sm"
//             >
//               <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-2" /> Add
//             </Button>
//           </div>
//         ) : (
//           <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
//             <div className="flex items-center justify-center border border-gray-300 rounded-md w-full sm:w-auto h-8 sm:h-10">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={(e) =>
//                   handleCartQuantityChange(cartItem.quantity - 1, e)
//                 }
//                 className="h-full px-2"
//               >
//                 <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
//               </Button>
//               <span className="px-3 font-medium text-sm">
//                 {cartItem.quantity}
//               </span>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={(e) =>
//                   handleCartQuantityChange(cartItem.quantity + 1, e)
//                 }
//                 className="h-full px-2"
//               >
//                 <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
//               </Button>
//             </div>
//             <span className="text-xs sm:text-sm text-primary font-medium whitespace-nowrap">
//               In Cart
//             </span>
//           </div>
//         )}
//       </CardFooter>
//     </Card>
//   );
// };

// export default ProductCard;

import { useState, useEffect } from "react";
import {
  Plus,
  Minus,
  ShoppingCart,
  Star,
  TrendingUp,
  Award,
} from "lucide-react"; // Added new icons
import { Product, useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const stripHtml = (html: string) => {
  if (!html) return "";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const cartItem = cart.find((item) => item.id === product.id);
  const hasImages = product.images && product.images.length > 0;
  const rating = product.rating || 0;
  const reviewCount = product.ratingCount || 0;

  useEffect(() => {
    if (!hasImages || !product.images) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images!.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [hasImages, product.images?.length]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${product.name} added to cart!`);
    setQuantity(1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleCartQuantityChange = (
    newQuantity: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (cartItem) updateQuantity(product.id, newQuantity);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 sm:w-4 sm:h-4 ${
              star <= Math.round(rating)
                ? "fill-yellow-500 text-yellow-500"
                : "text-gray-300 fill-gray-100"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col relative">
      {/* Badges Container */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-2 z-20">
        {product.discountPercent && (
          <div className="bg-red-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
            {product.discountPercent}% OFF
          </div>
        )}

        {product.isBestseller && (
          <div className="bg-amber-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center gap-1">
            <Award className="w-3 h-3 sm:w-4 sm:h-4" />
            Bestseller
          </div>
        )}

        {product.isTrending && (
          <div className="bg-emerald-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center gap-1">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            Trending
          </div>
        )}
      </div>

      {/* Image Section */}
      <div
        className="relative h-48 sm:h-80 overflow-hidden bg-gray-100 cursor-pointer shrink-0 pt-12 sm:pt-16"
        onClick={handleCardClick}
      >
        {hasImages ? (
          product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <span className="text-lg sm:text-2xl font-bold text-white">
              Out of Stock
            </span>
          </div>
        )}

        {hasImages && (
          <div className="absolute bottom-2 right-2 flex gap-1 z-10">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-3 sm:p-4 cursor-pointer flex-grow">
        <h3 className="font-serif text-base sm:text-xl font-semibold mb-1 sm:mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
          {product.category}
        </p>

        <div className="flex items-center gap-1 mb-2 sm:mb-3">
          {renderStars(rating)}
          <span className="text-xs text-gray-500 font-medium ml-1">
            ({reviewCount})
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
          {product.discountPrice ? (
            <>
              <p className="text-base sm:text-lg font-bold text-primary">
                ₹{Number(product.discountPrice).toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground line-through">
                ₹{Number(product.price).toLocaleString()}
              </p>
            </>
          ) : (
            <p className="text-base sm:text-lg font-bold text-primary">
              ₹{Number(product.price).toLocaleString()}
            </p>
          )}
        </div>

        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 hidden sm:block">
          {stripHtml(product.description || "")}
        </p>
      </CardContent>

      {/* Footer - unchanged */}
      <CardFooter className="p-3 sm:p-4 pt-0 mt-auto">
        {!product.inStock ? (
          <Button
            disabled
            className="w-full bg-gray-300 h-8 sm:h-10 text-xs sm:text-sm"
          >
            Out of Stock
          </Button>
        ) : !cartItem ? (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
            <div className="flex items-center justify-center border border-gray-300 rounded-md h-8 sm:h-10 w-full sm:w-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDecrement}
                className="h-full px-2"
              >
                <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <span className="px-2 sm:px-3 font-medium text-sm">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleIncrement}
                className="h-full px-2"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>

            <Button
              onClick={handleAddToCart}
              className="flex-1 h-8 sm:h-10 text-xs sm:text-sm"
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-2" /> Add
            </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
            <div className="flex items-center justify-center border border-gray-300 rounded-md w-full sm:w-auto h-8 sm:h-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) =>
                  handleCartQuantityChange(cartItem.quantity - 1, e)
                }
                className="h-full px-2"
              >
                <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <span className="px-3 font-medium text-sm">
                {cartItem.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) =>
                  handleCartQuantityChange(cartItem.quantity + 1, e)
                }
                className="h-full px-2"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
            <span className="text-xs sm:text-sm text-primary font-medium whitespace-nowrap">
              In Cart
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

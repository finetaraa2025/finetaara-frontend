// import { useState, useEffect } from "react";
// import { Plus, Minus, ShoppingCart } from "lucide-react";
// import { Product, useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// interface ProductCardProps {
//   product: Product;
// }

// // Helper to remove HTML tags from backend description
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

//   const cartItem = cart.find((item) => item.id === product.id);
//   const StarSolid = require("@heroicons/react/24/solid/StarIcon") as any;
//   const StarOutline = require("@heroicons/react/24/outline/StarIcon") as any;
//   // Safety check: ensure images array exists and has length
//   const hasImages = product.images && product.images.length > 0;

//   useEffect(() => {
//     if (!hasImages) return;

//     const timer = setInterval(() => {
//       setCurrentImageIndex(
//         (prevIndex) => (prevIndex + 1) % product.images.length
//       );
//     }, 3000);
//     return () => clearInterval(timer);
//   }, [product.images?.length, hasImages]);

//   const handleAddToCart = () => {
//     for (let i = 0; i < quantity; i++) {
//       addToCart(product);
//     }
//     toast.success(`${product.name} added to cart!`);
//     setQuantity(1);
//   };

//   const handleIncrement = () => setQuantity((prev) => prev + 1);
//   const handleDecrement = () =>
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   const handleCartQuantityChange = (newQuantity: number) => {
//     if (cartItem) {
//       updateQuantity(product.id, newQuantity);
//     }
//   };

//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     navigate(`/products/${product.id}`);
//   };

//   const displayRating = product.rating ?? 0;
//   const fullStars = Math.floor(displayRating);
//   const hasHalf = displayRating - fullStars >= 0.5;
//   const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
//   return (
//     <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
//       <div
//         className="relative h-80 overflow-hidden bg-gray-100 cursor-pointer"
//         onClick={handleCardClick}
//       >
//         {hasImages ? (
//           product.images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`${product.name} - View ${index + 1}`}
//               className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
//                 index === currentImageIndex ? "opacity-100" : "opacity-0"
//               }`}
//             />
//           ))
//         ) : (
//           <div className="absolute inset-0 flex items-center justify-center text-gray-400">
//             No Image Available
//           </div>
//         )}

//         {product.discountPercent && (
//           <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10">
//             {product.discountPercent}% OFF
//           </div>
//         )}
//         {!product.inStock && (
//           <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-20">
//             <span className="text-2xl font-bold text-muted-foreground">
//               Out of Stock
//             </span>
//           </div>
//         )}

//         {hasImages && (
//           <div className="absolute bottom-2 right-2 flex gap-1 z-10">
//             {product.images.map((_, index) => (
//               <div
//                 key={index}
//                 className={`w-2 h-2 rounded-full transition-all ${
//                   index === currentImageIndex ? "bg-primary" : "bg-muted"
//                 }`}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       <CardContent className="p-4 cursor-pointer" onClick={handleCardClick}>
//         <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">
//           {product.name}
//         </h3>
//         <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
//         <div className="flex items-center gap-1 mb-2">
//           {/* stars */}
//           <div className="flex items-center">
//             {Array.from({ length: fullStars }).map((_, i) => (
//               <StarSolid
//                 key={`full-${i}`}
//                 className="w-4 h-4 text-yellow-400"
//               />
//             ))}
//             {hasHalf && (
//               <StarSolid className="w-4 h-4 text-yellow-400 opacity-60" />
//             )}
//             {Array.from({ length: emptyStars }).map((_, i) => (
//               <StarOutline
//                 key={`empty-${i}`}
//                 className="w-4 h-4 text-gray-300"
//               />
//             ))}
//           </div>

//           {/* numeric rating + count */}
//           <span className="ml-1 text-xs font-medium text-foreground">
//             {displayRating.toFixed(1)} ({product.ratingCount ?? 0})
//           </span>
//         </div>

//         <div className="flex items-center gap-2 mb-2">
//           {product.discountPrice ? (
//             <>
//               <p className="text-lg font-bold text-primary">
//                 ₹{product.discountPrice.toLocaleString()}
//               </p>
//               <p className="text-sm text-muted-foreground line-through">
//                 ₹{product.price.toLocaleString()}
//               </p>
//             </>
//           ) : (
//             <p className="text-lg font-bold text-primary">
//               ₹{product.price.toLocaleString()}
//             </p>
//           )}
//         </div>
//         {/* Updated Description Rendering: Strips HTML tags */}
//         <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
//           {stripHtml(product.description)}
//         </p>
//       </CardContent>

//       <CardFooter className="p-4 pt-0 flex flex-col gap-2">
//         {!product.inStock ? (
//           <Button disabled className="w-full">
//             Out of Stock
//           </Button>
//         ) : (
//           <>
//             {!cartItem && (
//               <div className="flex items-center gap-2 w-full">
//                 <div className="flex items-center border border-border rounded-md">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={handleDecrement}
//                     className="h-8 w-8"
//                   >
//                     <Minus className="h-4 w-4" />
//                   </Button>
//                   <span className="px-3 py-1 font-medium">{quantity}</span>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={handleIncrement}
//                     className="h-8 w-8"
//                   >
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                 </div>
//                 <Button onClick={handleAddToCart} className="flex-1">
//                   <ShoppingCart className="h-4 w-4 mr-2" />
//                   Add to Cart
//                 </Button>
//               </div>
//             )}

//             {cartItem && (
//               <div className="flex items-center gap-2 w-full">
//                 <div className="flex items-center border border-border rounded-md">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() =>
//                       handleCartQuantityChange(cartItem.quantity - 1)
//                     }
//                     className="h-8 w-8"
//                   >
//                     <Minus className="h-4 w-4" />
//                   </Button>
//                   <span className="px-3 py-1 font-medium">
//                     {cartItem.quantity}
//                   </span>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() =>
//                       handleCartQuantityChange(cartItem.quantity + 1)
//                     }
//                     className="h-8 w-8"
//                   >
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                 </div>
//                 <span className="text-sm text-primary font-medium">
//                   In Cart
//                 </span>
//               </div>
//             )}
//           </>
//         )}
//       </CardFooter>
//     </Card>
//   );
// };

// export default ProductCard;
import { useState, useEffect } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
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

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div
        className="relative h-80 overflow-hidden bg-gray-100 cursor-pointer"
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

        {product.discountPercent && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10">
            {product.discountPercent}% OFF
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <span className="text-2xl font-bold text-white">Out of Stock</span>
          </div>
        )}

        {hasImages && (
          <div className="absolute bottom-2 right-2 flex gap-1 z-10">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-4 cursor-pointer" onClick={handleCardClick}>
        <h3 className="font-serif text-xl font-semibold mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>

        {/* Simple text rating */}
        <div className="flex items-center gap-2 mb-3 text-xs text-yellow-500 font-semibold">
          ★★★★☆ (127)
        </div>

        <div className="flex items-center gap-2 mb-3">
          {product.discountPrice ? (
            <>
              <p className="text-lg font-bold text-primary">
                ₹{Number(product.discountPrice).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground line-through">
                ₹{Number(product.price).toLocaleString()}
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-primary">
              ₹{Number(product.price).toLocaleString()}
            </p>
          )}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {stripHtml(product.description)}
        </p>
      </CardContent>

      {/* Footer - buttons stop propagation */}
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        {!product.inStock ? (
          <Button disabled className="w-full bg-gray-300">
            Out of Stock
          </Button>
        ) : !cartItem ? (
          <div className="flex items-center gap-2 w-full">
            <div className="flex items-center border border-gray-300 rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDecrement}
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-3 py-1 font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleIncrement}
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAddToCart} className="flex-1">
              <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 w-full">
            <div className="flex items-center border border-gray-300 rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) =>
                  handleCartQuantityChange(cartItem.quantity - 1, e)
                }
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-3 py-1 font-medium">{cartItem.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) =>
                  handleCartQuantityChange(cartItem.quantity + 1, e)
                }
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-primary font-medium">In Cart</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

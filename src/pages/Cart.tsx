// import { Link } from "react-router-dom";
// import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { toast } from "sonner";
// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";

// const Cart = () => {
//   const {
//     cart,
//     removeFromCart,
//     updateQuantity,
//     totalPrice,
//     promoCode,
//     setPromoCode,
//     discount,
//   } = useCart();

//   const handleApplyPromo = () => {
//     const validCodes = ["LUXE10", "GOLD20", "DIAMOND25"];
//     if (validCodes.includes(promoCode.toUpperCase())) {
//       toast.success("Promo code applied successfully!");
//     } else if (promoCode) {
//       toast.error("Invalid promo code");
//     }
//   };

//   const discountedTotal = totalPrice - (totalPrice * discount) / 100;

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <main className="container mx-auto px-4 py-16 text-center">
//           <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
//           <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
//             Your Cart is Empty
//           </h1>
//           <p className="text-muted-foreground mb-8">
//             Discover our beautiful collection and add some items to your cart.
//           </p>
//           <Link to="/collections">
//             <Button size="lg">Explore Collections</Button>
//           </Link>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-serif font-bold text-foreground mb-8">
//           Shopping Cart
//         </h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             {cart.map((item) => (
//               <Card key={item.id} className="mb-4">
//                 <CardContent className="p-4">
//                   <div className="flex gap-4">
//                     <img
//                       src={item.images[0]}
//                       alt={item.name}
//                       className="w-24 h-24 object-cover rounded-md"
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-serif text-lg font-semibold mb-1">
//                         {item.name}
//                       </h3>
//                       <p className="text-sm text-muted-foreground mb-2">
//                         {item.category}
//                       </p>
//                       <p className="text-primary font-bold">
//                         ₹{item.price.toLocaleString()}
//                       </p>
//                     </div>
//                     <div className="flex flex-col items-end justify-between">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => removeFromCart(item.id)}
//                       >
//                         <Trash2 className="h-5 w-5 text-destructive" />
//                       </Button>
//                       <div className="flex items-center border border-border rounded-md">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() =>
//                             updateQuantity(item.id, item.quantity - 1)
//                           }
//                           className="h-8 w-8"
//                         >
//                           <Minus className="h-4 w-4" />
//                         </Button>
//                         <span className="px-3 py-1 font-medium">
//                           {item.quantity}
//                         </span>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() =>
//                             updateQuantity(item.id, item.quantity + 1)
//                           }
//                           className="h-8 w-8"
//                         >
//                           <Plus className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           <div>
//             <Card className="sticky top-24">
//               <CardContent className="p-6">
//                 <h2 className="text-2xl font-serif font-bold mb-6">
//                   Order Summary
//                 </h2>

//                 <div className="space-y-4 mb-6">
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Subtotal</span>
//                     <span className="font-semibold">
//                       ₹{totalPrice.toLocaleString()}
//                     </span>
//                   </div>
//                   {discount > 0 && (
//                     <div className="flex justify-between text-primary">
//                       <span>Discount ({discount}%)</span>
//                       <span>
//                         -₹{((totalPrice * discount) / 100).toLocaleString()}
//                       </span>
//                     </div>
//                   )}
//                   <div className="border-t border-border pt-4 flex justify-between text-lg font-bold">
//                     <span>Total</span>
//                     <span className="text-primary">
//                       ₹{discountedTotal.toLocaleString()}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mb-6">
//                   <label className="block text-sm font-medium mb-2">
//                     Promo Code
//                   </label>
//                   <div className="flex gap-2">
//                     <Input
//                       type="text"
//                       placeholder="Enter code"
//                       value={promoCode}
//                       onChange={(e) => setPromoCode(e.target.value)}
//                     />
//                     <Button onClick={handleApplyPromo} variant="outline">
//                       Apply
//                     </Button>
//                   </div>
//                   <p className="text-xs text-muted-foreground mt-2">
//                     Try: LUXE10, GOLD20, or DIAMOND25
//                   </p>
//                 </div>

//                 <Link to="/checkout">
//                   <Button className="w-full" size="lg">
//                     Proceed to Checkout
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Cart;
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useState } from "react";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    promoCode,
    setPromoCode,
    discount,
    setDiscount, // Ensure this is exposed from your CartContext
  } = useCart();

  const [isValidating, setIsValidating] = useState(false);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    setIsValidating(true);

    try {
      const response = await fetch(
        "https://api.finetaraa.com/api/promocodes/validate/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: promoCode }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Backend returns: { code: "LUXE10", discount: 10, message: "..." }
        setDiscount(data.discount);
        toast.success(`Promo code applied! You got ${data.discount}% off.`);
      } else {
        // Backend returns: { error: "Invalid promo code" }
        setDiscount(0); // Reset discount if invalid
        toast.error(data.error || "Invalid promo code");
      }
    } catch (error) {
      console.error("Promo validation error:", error);
      toast.error("Failed to validate promo code. Please try again.");
      setDiscount(0);
    } finally {
      setIsValidating(false);
    }
  };

  // Calculate discount amount
  const discountAmount = (totalPrice * discount) / 100;
  const discountedTotal = totalPrice - discountAmount;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Discover our beautiful collection and add some items to your cart.
          </p>
          <Link to="/collections">
            <Button size="lg">Explore Collections</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={
                        item.images && item.images.length > 0
                          ? item.images[0]
                          : ""
                      }
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md bg-gray-100"
                    />
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-semibold mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.category}
                      </p>
                      <p className="text-primary font-bold">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </Button>
                      <div className="flex items-center border border-border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3 py-1 font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary Section */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-2xl font-serif font-bold mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-primary animate-in fade-in slide-in-from-right-4">
                      <span>Discount ({discount}%)</span>
                      <span>
                        -₹
                        {discountAmount.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-border pt-4 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      ₹
                      {discountedTotal.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) =>
                        setPromoCode(e.target.value.toUpperCase())
                      }
                      disabled={isValidating}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                    />
                    <Button
                      onClick={handleApplyPromo}
                      variant="outline"
                      disabled={isValidating || !promoCode}
                    >
                      {isValidating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Apply"
                      )}
                    </Button>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;

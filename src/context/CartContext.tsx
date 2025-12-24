// import React, { createContext, useContext, useState, useEffect } from "react";

// export interface Product {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   discountPrice?: number;
//   discountPercent?: number;
//   images: string[];
//   description: string;
//   inStock: boolean;
// }

// export interface CartItem extends Product {
//   quantity: number;
// }

// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: string) => void;
//   updateQuantity: (productId: string, quantity: number) => void;
//   clearCart: () => void;
//   totalItems: number;
//   totalPrice: number;
//   promoCode: string;
//   setPromoCode: (code: string) => void;
//   discount: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   // FIX: Use Lazy Initialization to load data synchronously before first render.
//   // This prevents the "Save" effect from overwriting existing data with an empty array on mount.
//   const [cart, setCart] = useState<CartItem[]>(() => {
//     if (typeof window !== "undefined") {
//       try {
//         const savedCart = localStorage.getItem("luxeCart");
//         return savedCart ? JSON.parse(savedCart) : [];
//       } catch (error) {
//         console.error("Failed to parse cart from local storage:", error);
//         return [];
//       }
//     }
//     return [];
//   });

//   // Standard state for promo/discount (NOT persisted, as requested)
//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("luxeCart", JSON.stringify(cart));
//   }, [cart]);

//   // Apply promo code discount logic
//   useEffect(() => {
//     const promoCodes: { [key: string]: number } = {
//       LUXE10: 10,
//       GOLD20: 20,
//       DIAMOND25: 25,
//     };
//     setDiscount(promoCodes[promoCode.toUpperCase()] || 0);
//   }, [promoCode]);

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...product, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (productId: string) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
//   };

//   const updateQuantity = (productId: string, quantity: number) => {
//     if (quantity <= 0) {
//       removeFromCart(productId);
//       return;
//     }
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCart([]);
//     setPromoCode("");
//     setDiscount(0);
//     localStorage.removeItem("luxeCart"); // Optional: Clear storage when explicitly clearing cart
//   };

//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//   const totalPrice = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         totalItems,
//         totalPrice,
//         promoCode,
//         setPromoCode,
//         discount,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  discountPercent?: number;
  images: string[];
  description: string;
  inStock: boolean;
  rating?: number; // new
  ratingCount?: number; // new
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  promoCode: string;
  setPromoCode: (code: string) => void;
  discount: number;
  setDiscount: (amount: number) => void; // <--- ADDED THIS
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Load initial cart from local storage synchronously
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedCart = localStorage.getItem("luxeCart");
        return savedCart ? JSON.parse(savedCart) : [];
      } catch (error) {
        console.error("Failed to parse cart from local storage:", error);
        return [];
      }
    }
    return [];
  });

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("luxeCart", JSON.stringify(cart));
  }, [cart]);

  // REMOVED: The hardcoded useEffect that auto-set discount based on promoCode string.
  // Now, discount is set manually via setDiscount() after backend validation.

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode("");
    setDiscount(0);
    localStorage.removeItem("luxeCart");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        promoCode,
        setPromoCode,
        discount,
        setDiscount, // <--- EXPOSED THIS
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

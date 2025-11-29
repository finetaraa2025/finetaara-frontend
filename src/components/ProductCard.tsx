import { useState, useEffect } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Product, useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cart, updateQuantity } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % product.images.length
      );
    }, 3000);
    return () => clearInterval(timer);
  }, [product.images.length]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${product.name} added to cart!`);
    setQuantity(1);
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleCartQuantityChange = (newQuantity: number) => {
    if (cartItem) {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-80 overflow-hidden">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product.name} - View ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {product.discountPercent && (
          <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {product.discountPercent}% OFF
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <span className="text-2xl font-bold text-muted-foreground">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute bottom-2 right-2 flex gap-1">
          {product.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
        <div className="flex items-center gap-2 mb-2">
          {product.discountPrice ? (
            <>
              <p className="text-lg font-bold text-primary">
                ₹{product.discountPrice.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground line-through">
                ₹{product.price.toLocaleString()}
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-primary">
              ₹{product.price.toLocaleString()}
            </p>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        {!product.inStock ? (
          <Button disabled className="w-full">
            Out of Stock
          </Button>
        ) : (
          <>
            {!cartItem && (
              <div className="flex items-center gap-2 w-full">
                <div className="flex items-center border border-border rounded-md">
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
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            )}

            {cartItem && (
              <div className="flex items-center gap-2 w-full">
                <div className="flex items-center border border-border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      handleCartQuantityChange(cartItem.quantity - 1)
                    }
                    className="h-8 w-8"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-3 py-1 font-medium">
                    {cartItem.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      handleCartQuantityChange(cartItem.quantity + 1)
                    }
                    className="h-8 w-8"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-primary font-medium">
                  In Cart
                </span>
              </div>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

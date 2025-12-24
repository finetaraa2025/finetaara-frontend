// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { MessageCircle } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { toast } from "sonner";

// const Checkout = () => {
//   const { cart, totalPrice, discount, clearCart } = useCart();
//   const navigate = useNavigate();

//   // Initialize formData from localStorage or use default empty values
//   const [formData, setFormData] = useState(() => {
//     const savedData = localStorage.getItem("checkoutFormData");
//     return savedData
//       ? JSON.parse(savedData)
//       : {
//           name: "",
//           email: "",
//           phone: "",
//           address: "",
//           city: "",
//           postalCode: "",
//           notes: "",
//         };
//   });

//   // Save formData to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("checkoutFormData", JSON.stringify(formData));
//   }, [formData]);

//   const discountedTotal = totalPrice - (totalPrice * discount) / 100;

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleWhatsAppCheckout = () => {
//     // Validate form
//     if (!formData.name || !formData.phone || !formData.address) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     // Create WhatsApp message
//     let message = `*New Order from Finetaara Website*\n\n`;
//     message += `*Customer Details:*\n`;
//     message += `Name: ${formData.name}\n`;
//     message += `Email: ${formData.email}\n`;
//     message += `Phone: ${formData.phone}\n`;
//     message += `Address: ${formData.address}, ${formData.city} ${formData.postalCode}\n`;
//     if (formData.notes) message += `Notes: ${formData.notes}\n`;
//     message += `\n*Order Items:*\n`;

//     cart.forEach((item) => {
//       message += `${item.name} x${item.quantity} - ₹${(
//         item.price * item.quantity
//       ).toLocaleString()}\n`;
//     });

//     message += `\n*Order Summary:*\n`;
//     message += `Subtotal: ₹${totalPrice.toLocaleString()}\n`;
//     if (discount > 0) {
//       message += `Discount: ${discount}% off\n`;
//     }
//     message += `*Total: ₹${discountedTotal.toLocaleString()}*`;

//     const encodedMessage = encodeURIComponent(message);
//     const whatsappUrl = `https://wa.me/917981244452?text=${encodedMessage}`;

//     window.open(whatsappUrl, "_blank");

//     localStorage.removeItem("checkoutFormData");

//     clearCart();
//     toast.success("Order details sent to WhatsApp!");
//     navigate("/");
//   };

//   if (cart.length === 0) {
//     navigate("/cart");
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-serif font-bold text-foreground mb-8">
//           Checkout
//         </h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Contact & Delivery Information</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="name">Full Name *</Label>
//                     <Input
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <Label htmlFor="phone">Phone Number *</Label>
//                   <Input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="address">Delivery Address *</Label>
//                   <Input
//                     id="address"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="city">City</Label>
//                     <Input
//                       id="city"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="postalCode">Postal Code</Label>
//                     <Input
//                       id="postalCode"
//                       name="postalCode"
//                       value={formData.postalCode}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <Label htmlFor="notes">Additional Notes</Label>
//                   <Textarea
//                     id="notes"
//                     name="notes"
//                     value={formData.notes}
//                     onChange={handleInputChange}
//                     rows={3}
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <div>
//             <Card className="sticky top-24">
//               <CardHeader>
//                 <CardTitle>Order Summary</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-3">
//                   {cart.map((item) => (
//                     <div key={item.id} className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">
//                         {item.name} x{item.quantity}
//                       </span>
//                       <span className="font-medium">
//                         ₹{(item.price * item.quantity).toLocaleString()}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="border-t border-border pt-4 space-y-2">
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
//                   <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
//                     <span>Total</span>
//                     <span className="text-primary">
//                       ₹{discountedTotal.toLocaleString()}
//                     </span>
//                   </div>
//                 </div>

//                 <Button
//                   onClick={handleWhatsAppCheckout}
//                   className="w-full"
//                   size="lg"
//                 >
//                   <MessageCircle className="mr-2 h-5 w-5" />
//                   Checkout via WhatsApp
//                 </Button>

//                 <p className="text-xs text-muted-foreground text-center">
//                   You'll be redirected to WhatsApp to complete your order
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Checkout;
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  MessageCircle,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header"; // Or "@/components/Navbar" if that is your file name
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Checkout = () => {
  const { cart, totalPrice, discount, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("checkoutUserPrefs");
    return savedData
      ? JSON.parse(savedData)
      : {
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          postalCode: "",
          // We don't load 'notes' from storage as they are order-specific
          notes: "",
        };
  });

  // Save ONLY contact details to localStorage (exclude notes)
  useEffect(() => {
    const dataToSave = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
    };
    localStorage.setItem("checkoutUserPrefs", JSON.stringify(dataToSave));
  }, [
    formData.name,
    formData.email,
    formData.phone,
    formData.address,
    formData.city,
    formData.postalCode,
  ]);

  const discountedTotal = totalPrice - (totalPrice * discount) / 100;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent standard form submit

    // Basic Validation
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Create WhatsApp message
    let message = `*New Order from Finetaraa Website*\n`;
    message += `--------------------------------\n`;
    message += `*Customer Details:*\n`;
    message += `👤 Name: ${formData.name}\n`;
    message += `📧 Email: ${formData.email || "N/A"}\n`;
    message += `📱 Phone: ${formData.phone}\n`;
    message += `📍 Address: ${formData.address}, ${formData.city} ${formData.postalCode}\n`;
    if (formData.notes) message += `📝 Notes: ${formData.notes}\n`;

    message += `\n*Order Items:*\n`;
    cart.forEach((item) => {
      message += `• ${item.name} (x${item.quantity}) - ₹${(
        item.price * item.quantity
      ).toLocaleString()}\n`;
    });

    message += `--------------------------------\n`;
    message += `*Summary:*\n`;
    message += `Subtotal: ₹${totalPrice.toLocaleString()}\n`;
    if (discount > 0) {
      message += `Discount: ${discount}% off\n`;
    }
    message += `*Grand Total: ₹${discountedTotal.toLocaleString()}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917981244452?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Success Actions
    toast.success("Order details generated! Redirecting to WhatsApp...");

    // Clear cart but KEEP form data (except notes)
    clearCart();
    setFormData((prev) => ({ ...prev, notes: "" }));
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate("/collections")}>
          Browse Collections
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <Link
          to="/cart"
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Link>

        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
          Secure Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Input Form */}
          <form
            onSubmit={handleWhatsAppCheckout}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  We'll use these details to coordinate your delivery.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        className="pl-9"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="pl-9"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="pl-9"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">
                    Street Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="House No, Street Name"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Mumbai"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      placeholder="400001"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="notes"
                      name="notes"
                      className="pl-9 min-h-[100px]"
                      placeholder="Special instructions for delivery or packaging..."
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile View: Button appears here too for easier access */}
            <Button
              type="submit"
              className="w-full lg:hidden h-12 text-lg font-semibold shadow-lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" /> Place Order via
              WhatsApp
            </Button>
          </form>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-md border-primary/10">
              <CardHeader className="bg-muted/30 pb-4">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-6">
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 text-sm">
                      <div className="w-12 h-12 rounded bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200">
                        {item.images?.[0] && (
                          <img
                            src={item.images[0]
                              .replace(/\[.*?\]\(.*?\)/g, "")
                              .trim()}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right font-medium">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Discount ({discount}%)</span>
                      <span>
                        -₹{((totalPrice * discount) / 100).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg">Total</span>
                  <div className="text-right">
                    <span className="block font-bold text-2xl text-primary">
                      ₹{discountedTotal.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Inclusive of all taxes
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 bg-muted/30 pt-6">
                <Button
                  onClick={handleWhatsAppCheckout}
                  className="w-full h-12 text-base font-semibold shadow-md bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                >
                  <MessageCircle className="mr-2 h-5 w-5 fill-current" />
                  Checkout on WhatsApp
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="w-3 h-3 text-green-600" />
                  <span>Secure checkout powered by WhatsApp</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;

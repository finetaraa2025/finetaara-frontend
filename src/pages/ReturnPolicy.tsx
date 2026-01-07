// import {
//   RotateCcw,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   Video,
//   ArrowRight,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";

// export default function ReturnPolicy() {
//   return (
//     <>
//       <div>
//         <title>Replacement Policy | Finetaraa</title>
//         <meta
//           name="description"
//           content="Finetaraa offers replacement only for damaged products within 2 days. No returns or exchanges. Unpacking videos mandatory."
//         />
//       </div>

//       {/* Full layout with proper spacing */}
//       <div className="flex flex-col min-h-screen">
//         {/* ScrollingBanner space (42px + Header space ~90px total) */}
//         <div className="h-[132px]"></div>

//         <div className="flex-1 pb-16 px-4">
//           <div className="container mx-auto max-w-4xl pt-8">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-center mb-12"
//             >
//               <RotateCcw className="h-16 w-16 text-primary mx-auto mb-4" />
//               <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
//                 Strict Replacement Policy
//               </h1>
//               <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//                 Replacement only for damaged products within 2 days
//               </p>
//             </motion.div>

//             <div className="bg-card rounded-2xl border border-border shadow-xl p-8 md:p-12 space-y-8">
//               {/* No Returns Banner */}
//               <section className="bg-gradient-to-r from-destructive to-destructive/50 border border-destructive/30 p-8 rounded-2xl shadow-lg">
//                 <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
//                   <XCircle className="h-16 w-16 text-destructive flex-shrink-0 -mt-2" />
//                   <div>
//                     <h2 className="font-serif text-3xl font-bold mb-3 text-white drop-shadow-lg">
//                       🚫 No Returns. No Exchanges.
//                     </h2>
//                     <p className="text-xl text-white/95 font-semibold drop-shadow-md max-w-2xl">
//                       Only replacement for damaged products within 2 days of
//                       delivery
//                     </p>
//                   </div>
//                 </div>
//               </section>

//               {/* Replacement Process */}
//               <section>
//                 <h2 className="font-serif text-3xl font-bold mb-8 flex items-center gap-3">
//                   Replacement Process
//                 </h2>
//                 <div className="grid md:grid-cols-2 gap-6">
//                   {[
//                     "Contact us via WhatsApp within 2 days of delivery",
//                     "Share unpacking video + photos of damaged product",
//                     "We verify the damage and issue replacement",
//                     "New product dispatched within 3-5 business days",
//                   ].map((step, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="group bg-muted/50 p-6 rounded-xl border border-border hover:shadow-md transition-all duration-300 hover:-translate-y-1"
//                     >
//                       <div className="flex items-start gap-4 mb-3">
//                         <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
//                           {index + 1}
//                         </span>
//                         <div className="flex-1">
//                           <p className="font-medium text-foreground">{step}</p>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </section>

//               {/* Eligible */}
//               <section>
//                 <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3 text-green-600">
//                   <CheckCircle className="h-8 w-8" />
//                   Eligible for Replacement
//                 </h2>
//                 <div className="grid gap-3 p-6 bg-green-50/50 border border-green-200 rounded-xl">
//                   <ul className="space-y-2 text-muted-foreground">
//                     <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-all">
//                       • <span>Products received damaged/broken</span>
//                     </li>
//                     <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-all">
//                       •{" "}
//                       <span>
//                         Manufacturing defects discovered within 2 days
//                       </span>
//                     </li>
//                     <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-all">
//                       •{" "}
//                       <span>
//                         Wrong item delivered (with unpacking video proof)
//                       </span>
//                     </li>
//                   </ul>
//                 </div>
//               </section>

//               {/* Not Eligible */}
//               <section>
//                 <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3 text-destructive">
//                   <XCircle className="h-8 w-8" />
//                   Not Eligible
//                 </h2>
//                 <div className="grid gap-3 p-6 bg-red-50/50 border border-red-200 rounded-xl">
//                   <ul className="space-y-2 text-muted-foreground">
//                     <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-all">
//                       • No unpacking video provided
//                     </li>
//                     <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-all">
//                       • Damage after 2 days of delivery
//                     </li>
//                     <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-all">
//                       • Customer-induced damage or wear
//                     </li>
//                     <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-all">
//                       • Size/exchange requests
//                     </li>
//                     <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-all">
//                       • Returns or refunds
//                     </li>
//                   </ul>
//                 </div>
//               </section>

//               {/* Video Section */}
//               <section className="bg-gradient-to-r from-primary/10 to-primary/5 p-10 rounded-3xl border border-primary/20 shadow-2xl">
//                 <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
//                   <Video className="h-20 w-20 text-primary flex-shrink-0 shadow-2xl" />
//                   <div>
//                     <h3 className="font-serif text-2xl font-bold mb-4 text-primary">
//                       📹 Unpacking Video MANDATORY
//                     </h3>
//                     <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
//                       Record unboxing from package opening to product
//                       inspection. This protects both you and us from fraudulent
//                       claims.
//                     </p>
//                     <div className="grid md:grid-cols-2 gap-4 text-sm">
//                       <div className="space-y-2 p-4 bg-primary/20 rounded-xl">
//                         <p className="font-semibold">✅ Do:</p>
//                         <ul className="text-muted-foreground space-y-1 pl-3 list-disc list-inside">
//                           <li>Start recording before opening package</li>
//                           <li>Show complete unboxing process</li>
//                           <li>Clearly show product condition</li>
//                           <li>Upload via WhatsApp</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </section>

//               {/* Contact */}
//               <section className="text-center p-10 bg-gradient-to-r from-destructive/10 to-destructive/5 rounded-2xl border border-destructive/20">
//                 <AlertCircle className="h-16 w-16 mx-auto mb-6 text-destructive opacity-80" />
//                 <h3 className="font-bold text-2xl mb-4">Contact Support</h3>
//                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
//                   <a href="https://wa.me/917981244452" className="group">
//                     <Button
//                       size="lg"
//                       className="bg-green-600 hover:bg-green-700 text-lg px-8 h-12 shadow-lg"
//                     >
//                       📱 WhatsApp Chat
//                       <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                     </Button>
//                   </a>
//                   <p className="text-xl font-semibold text-destructive">
//                     +91 79812 44452
//                   </p>
//                 </div>
//                 <p className="text-muted-foreground text-lg">
//                   Available Mon-Sun, 10 AM - 8 PM
//                 </p>
//               </section>
//             </div>
//           </div>
//         </div>

//         {/* Footer space */}
//         <div className="h-24"></div>
//       </div>
//     </>
//   );
// }
import {
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Video,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header"; // Adjust path to your Header component
import { ScrollingBanner } from "@/components/ScrollingBanner"; // Adjust path to your ScrollingBanner component
import Footer from "@/components/Footer";
export default function ReturnPolicy() {
  return (
    <>
      <div>
        <title>Replacement Policy | Finetaraa</title>
        <meta
          name="description"
          content="Finetaraa offers replacement only for damaged products within 2 days. No returns or exchanges. Unpacking videos mandatory."
        />
      </div>

      {/* Scrolling Banner - Fixed at top */}
      <ScrollingBanner />

      {/* Header - Sticky below banner */}
      <Header />

      {/* Main content with proper spacing */}
      <div className="flex flex-col min-h-screen pt-[132px]">
        <div className="flex-1 pb-16 px-4">
          <div className="container mx-auto max-w-4xl pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <RotateCcw className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Strict Replacement Policy
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Replacement only for damaged products within 2 days
              </p>
            </motion.div>

            <div className="bg-card rounded-2xl border border-border shadow-xl p-8 md:p-12 space-y-8">
              {/* No Returns Banner */}
              <section className="bg-gradient-to-r from-destructive to-destructive/50 border border-destructive/30 p-8 rounded-2xl shadow-lg">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  <XCircle className="h-16 w-16 text-destructive flex-shrink-0 -mt-2" />
                  <div>
                    <h2 className="font-serif text-3xl font-bold mb-3 text-white drop-shadow-lg">
                      🚫 No Returns. No Exchanges.
                    </h2>
                    <p className="text-xl text-white/95 font-semibold drop-shadow-md max-w-2xl">
                      Only replacement for damaged products within 2 days of
                      delivery
                    </p>
                  </div>
                </div>
              </section>

              {/* Replacement Process */}
              <section>
                <h2 className="font-serif text-3xl font-bold mb-8 flex items-center gap-3">
                  Replacement Process
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Contact us via WhatsApp within 2 days of delivery",
                    "Share unpacking video + photos of damaged product",
                    "We verify the damage and issue replacement",
                    "New product dispatched within 3-5 business days",
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-muted/50 p-6 rounded-xl border border-border hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4 mb-3">
                        <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{step}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Eligible */}
              <section>
                <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3 text-green-600">
                  <CheckCircle className="h-8 w-8" />
                  Eligible for Replacement
                </h2>
                <div className="grid gap-3 p-6 bg-green-50/50 border border-green-200 rounded-xl">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-all">
                      • <span>Products received damaged/broken</span>
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-all">
                      •{" "}
                      <span>
                        Manufacturing defects discovered within 2 days
                      </span>
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-all">
                      •{" "}
                      <span>
                        Wrong item delivered (with unpacking video proof)
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Not Eligible */}
              <section>
                <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3 text-destructive">
                  <XCircle className="h-8 w-8" />
                  Not Eligible
                </h2>
                <div className="grid gap-3 p-6 bg-red-50/50 border border-red-200 rounded-xl">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-all">
                      • No unpacking video provided
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-all">
                      • Damage after 2 days of delivery
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-all">
                      • Customer-induced damage or wear
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-all">
                      • Size/exchange requests
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-all">
                      • Returns or refunds
                    </li>
                  </ul>
                </div>
              </section>

              {/* Video Section */}
              <section className="bg-gradient-to-r from-primary/10 to-primary/5 p-10 rounded-3xl border border-primary/20 shadow-2xl">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  <Video className="h-20 w-20 text-primary flex-shrink-0 shadow-2xl" />
                  <div>
                    <h3 className="font-serif text-2xl font-bold mb-4 text-primary">
                      📹 Unpacking Video MANDATORY
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                      Record unboxing from package opening to product
                      inspection. This protects both you and us from fraudulent
                      claims.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2 p-4 bg-primary/20 rounded-xl">
                        <p className="font-semibold">✅ Do:</p>
                        <ul className="text-muted-foreground space-y-1 pl-3 list-disc list-inside">
                          <li>Start recording before opening package</li>
                          <li>Show complete unboxing process</li>
                          <li>Clearly show product condition</li>
                          <li>Upload via WhatsApp</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section className="text-center p-10 bg-gradient-to-r from-destructive/10 to-destructive/5 rounded-2xl border border-destructive/20">
                <AlertCircle className="h-16 w-16 mx-auto mb-6 text-destructive opacity-80" />
                <h3 className="font-bold text-2xl mb-4">Contact Support</h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
                  <a href="https://wa.me/917981244452" className="group">
                    <Button
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-lg px-8 h-12 shadow-lg"
                    >
                      📱 WhatsApp Chat
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                  <p className="text-xl font-semibold text-destructive">
                    +91 79812 44452
                  </p>
                </div>
                <p className="text-muted-foreground text-lg">
                  Available Mon-Sun, 10 AM - 8 PM
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* Footer space */}
        <div className="h-24">
          <Footer />
        </div>
      </div>
    </>
  );
}

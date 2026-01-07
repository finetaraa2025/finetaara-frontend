// import { Link } from "react-router-dom";
// import { Facebook, Instagram, Twitter } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="bg-secondary text-secondary-foreground mt-20">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="text-xl font-serif font-bold mb-4">
//               FINETAARA JEWELLERY
//             </h3>
//             <p className="text-secondary-foreground/80">
//               Exquisite 18K jewelry crafted with precision and passion. Discover
//               timeless elegance.
//             </p>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   to="/"
//                   className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/collections"
//                   className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
//                 >
//                   Collections
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/about"
//                   className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
//                 >
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/contact"
//                   className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
//                 >
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-4">Follow Us</h4>
//             <div className="flex gap-4">
//               <a
//                 href="https://www.facebook.com/share/1GNtNgXA9K/"
//                 className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
//                 aria-label="Facebook"
//               >
//                 <Facebook className="h-6 w-6" />
//               </a>
//               <a
//                 href="https://www.instagram.com/finetaraa_18kgold?utm_source=qr&igsh=dDQ0MGN1a2VxZDc3"
//                 className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
//                 aria-label="Instagram"
//               >
//                 <Instagram className="h-6 w-6" />
//               </a>
//               <a
//                 href="#"
//                 className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
//                 aria-label="Twitter"
//               >
//                 <Twitter className="h-6 w-6" />
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-secondary-foreground/60">
//           <p>
//             &copy; {new Date().getFullYear()} Finetaara Jewelry. All rights
//             reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-auto border-t border-stone-800">
      {/* Newsletter Section */}
      <div className="border-b border-stone-800 bg-stone-950/50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-serif text-white mb-2">
                Join Our Newsletter
              </h3>
              <p className="text-stone-400">
                Receive early access to new collections and exclusive offers.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-stone-900 border-stone-700 text-white placeholder:text-stone-500 focus-visible:ring-primary/50"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
              F I N E T A R A A
              <span className="block text-sm font-sans font-light text-primary mt-1 tracking-[0.2em]">
                JEWELLERY
              </span>
            </h2>
            <p className="text-stone-400 leading-relaxed max-w-xs">
              Crafting timeless elegance with 18K gold. Every piece tells a
              story of precision, passion, and perfection.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialLink
                href="https://www.facebook.com/share/1GNtNgXA9K/"
                icon={<Facebook className="h-5 w-5" />}
                label="Facebook"
              />
              <SocialLink
                href="https://www.instagram.com/finetaraa_18kgold?utm_source=qr&igsh=dDQ0MGN1a2VxZDc3"
                icon={<Instagram className="h-5 w-5" />}
                label="Instagram"
              />
              <SocialLink
                href="#"
                icon={<Twitter className="h-5 w-5" />}
                label="Twitter"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-6 tracking-wide uppercase text-sm">
              Discover
            </h4>
            <ul className="space-y-3">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/collections" label="Collections" />
              <FooterLink to="/about" label="Our Story" />
              {/* <FooterLink to="/blog" label="Journal" /> */}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white font-medium mb-6 tracking-wide uppercase text-sm">
              Customer Care
            </h4>
            <ul className="space-y-3">
              <FooterLink to="/contact" label="Contact Us" />
              <FooterLink to="/returns" label="Returns Policy" />
              <FooterLink to="/contact" label="FAQ" />
              {/* <FooterLink to="/size-guide" label="Size Guide" /> */}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-medium mb-6 tracking-wide uppercase text-sm">
              Contact Us
            </h4>
            <ul className="space-y-4 text-stone-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  kavali, Nellore
                  <br />
                  Andhra Pradesh, India 524201
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+91 79812 44452</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>support@finetaraa.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        {/* <div className="border-t border-stone-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} Finetaara Jewelry. All rights
            reserved.
          </p>
          <br />
          <p>
            Developed by{" "}
            <a
              href="https://www.staffarc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              StaffArc
            </a>
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div> */}
        <div className="border-t border-stone-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-stone-500">
          {/* Copyright */}
          <p className="order-2 md:order-1 text-center md:text-left">
            &copy; {new Date().getFullYear()} Finetaraa Jewelry. All rights
            reserved.
          </p>

          {/* Developer Credit - Centered */}
          <p className="order-3 md:order-2 flex items-center gap-1.5 bg-stone-900/80 px-4 py-1.5 rounded-full border border-stone-800 shadow-sm">
            <span className="opacity-75">Developed by</span>
            <a
              href="https://www.staffarc.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 hover:to-orange-400 transition-all duration-300 hover:scale-105"
              style={{
                filter: "drop-shadow(0px 0px 8px rgba(249, 115, 22, 0.2))",
              }}
            >
              StaffArc
            </a>
          </p>

          {/* Links - Right Aligned */}
          <div className="order-1 md:order-3 flex gap-6">
            <Link
              to="/privacy"
              className="hover:text-white transition-colors border-b border-transparent hover:border-stone-600 pb-0.5"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-white transition-colors border-b border-transparent hover:border-stone-600 pb-0.5"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components for Cleaner Code
const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <li>
    <Link
      to={to}
      className="text-stone-400 hover:text-primary hover:pl-1 transition-all duration-300 flex items-center gap-2 group"
    >
      <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 opacity-0 group-hover:opacity-100 text-primary">
        <ArrowRight className="h-3 w-3" />
      </span>
      {label}
    </Link>
  </li>
);

const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 w-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1"
    aria-label={label}
  >
    {icon}
  </a>
);

export default Footer;

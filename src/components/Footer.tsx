import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">
              FINETAARA JEWELLERY
            </h3>
            <p className="text-secondary-foreground/80">
              Exquisite 18K jewelry crafted with precision and passion. Discover
              timeless elegance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1GNtNgXA9K/"
                className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/finetaraa_18kgold?utm_source=qr&igsh=dDQ0MGN1a2VxZDc3"
                className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-secondary-foreground/60">
          <p>
            &copy; {new Date().getFullYear()} Finetaara Jewelry. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  hideMenuItems?: boolean;
}

const Navbar = ({ hideMenuItems = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about", isRoute: false },
    // 'Events' should point to the annual calendar section (Two Events, Endless Possibilities)
    { name: "Events", href: "#schedule", isRoute: false },
    // 'Key Offering' should point to the Four Pillars of Excellence section
    { name: "Key Offering", href: "#events", isRoute: false },
    { name: "Gallery", href: "#gallery", isRoute: false },
    { name: "Contact", href: "#contact", isRoute: false },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /**
   * Handle navigation to in-page sections (About, Events, Key Offering, Gallery, Contact).
   * Works both from the homepage and from inner routes by navigating back to "/"
   * and then scrolling once the page is rendered.
   */
  const handleSectionClick = (
    id: string,
    options?: { closeMobileMenu?: boolean; event?: React.MouseEvent<HTMLAnchorElement> }
  ) => {
    const { closeMobileMenu, event } = options || {};
    if (event) {
      event.preventDefault();
    }

    const scrollWithOffset = () => {
      // Small timeout ensures layout is ready after navigation
      setTimeout(() => {
        scrollToSection(id);
      }, 150);
    };

    if (pathname === "/") {
      scrollWithOffset();
    } else {
      navigate("/");
      scrollWithOffset();
    }

    if (closeMobileMenu) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-strong py-1 sm:py-2" : "bg-transparent py-0 sm:py-1"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-7xl">
        <div className="flex items-center justify-between gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img 
            src="/logo.png" 
            alt="Et Tech X Logo" 
            className="h-8 sm:h-10 md:h-12 w-auto group-hover:scale-110 transition-transform duration-300"
            decoding="async"
          />
        </Link>

          {/* Desktop Navigation
              Why this structure: using absolute-centering can cause links to sit *under* the CTA buttons
              (appearing "hidden") when more items are added. A 3-column flex layout avoids overlap. */}
          {!hideMenuItems && (
          <div className="hidden lg:flex flex-1 items-center justify-center min-w-0">
            <div className="flex items-center justify-center gap-4 xl:gap-6 flex-wrap">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.name}
                to={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium text-sm xl:text-base relative group whitespace-nowrap px-1"
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-primary transition-all duration-300 ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  const id = link.href.replace("#", "");
                  handleSectionClick(id, { event: e });
                  setActiveSection(id);
                }}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium text-sm xl:text-base relative group whitespace-nowrap px-1"
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-primary transition-all duration-300 ${pathname === "/" && activeSection === link.href.replace("#", "") ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </a>
            )
          )}
            </div>
          </div>
          )}

        {/* CTA Buttons - Desktop Only */}
        {!hideMenuItems && (
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
          <a href="tel:+917995975959">
          <Button variant="heroOutline" size="sm" className="text-xs xl:text-sm px-3 xl:px-4">
            Call Us
          </Button>
          </a>
          <Link to="/register">
          <Button variant="hero" size="sm" className="text-xs xl:text-sm px-3 xl:px-4">
            Enquire Now
          </Button>
          </Link>
        </div>
        )}

        {/* Mobile/Tablet Menu Button - Show on mobile and tablet, hide on desktop */}
        {!hideMenuItems && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-foreground p-2 z-10"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {!hideMenuItems && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-border mt-3"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) =>
              link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium py-2"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      const id = link.href.replace("#", "");
                      handleSectionClick(id, { closeMobileMenu: true, event: e });
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium py-2"
                  >
                    {link.name}
                  </a>
                )
              )}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <a href="tel:+917995975959" className="w-full">
                <Button variant="heroOutline" size="lg" className="w-full">
                  Call Us
                </Button>
                </a>
                <Link to="/register" className="w-full">
                <Button variant="hero" size="lg" className="w-full">
                  Enquire Now
                </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

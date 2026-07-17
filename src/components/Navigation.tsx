import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PhoneCall, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { servicesData, packagesData, additionalServices } from "../data";
import wubarLogo from "../assets/images/wubar_logo_1783680139975.jpg";

interface NavigationProps {
  onNavigateToBooking: () => void;
}

export default function Navigation({ onNavigateToBooking }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const [isCocktailsOpen, setIsCocktailsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const packagesDropdownRef = useRef<HTMLDivElement>(null);
  const cocktailsDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      if (packagesDropdownRef.current && !packagesDropdownRef.current.contains(event.target as Node)) {
        setIsPackagesOpen(false);
      }
      if (cocktailsDropdownRef.current && !cocktailsDropdownRef.current.contains(event.target as Node)) {
        setIsCocktailsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleCocktailFilter = (category: string) => {
    setIsCocktailsOpen(false);
    if (location.pathname !== "/") {
      navigate(`/?filter=${category}#cocktails`);
    } else {
      const event = new CustomEvent("filter-cocktails", { detail: { category } });
      window.dispatchEvent(event);
      const element = document.getElementById("cocktails");
      if (element) {
        element.scrollIntoView({ behavior: "auto" });
      }
      const newUrl = `${window.location.pathname}?filter=${category}#cocktails`;
      window.history.pushState({}, "", newUrl);
    }
  };

  const handleCustomCocktailsClick = () => {
    setIsCocktailsOpen(false);
    if (location.pathname !== "/") {
      navigate("/?custom=true#cocktails");
    } else {
      const event = new CustomEvent("open-cocktail-builder");
      window.dispatchEvent(event);
      const element = document.getElementById("cocktails");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isHome = location.pathname === "/";

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, name: string, href: string) => {
    e.preventDefault();
    
    // Explicitly handle Home navigation to always return home and scroll to top
    if (name === "Home") {
      navigate("/", { replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    // Parse target hash
    const hashIndex = href.indexOf("#");
    const targetHash = hashIndex !== -1 ? href.substring(hashIndex) : "";
    
    if (isHome) {
      if (targetHash && targetHash !== "#") {
        // Update URL hash client-side cleanly
        navigate(targetHash, { replace: true });
        
        const elementId = targetHash.replace("#", "");
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Home link or clear hash
        navigate("/", { replace: true });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // client-side navigate
      navigate(href);
    }
  };

  const navLinks = [
    { name: "Home", href: isHome ? "#" : "/" },
    { name: "Services", href: isHome ? "#services" : "/#services" },
    { name: "Packages", href: isHome ? "#packages" : "/#packages" },
    { name: "Why Us", href: isHome ? "#why-us" : "/#why-us" },
    { name: "Cocktails", href: isHome ? "#cocktails" : "/#cocktails" },
    { name: "Gallery", href: isHome ? "#gallery" : "/#gallery" },
    { name: "Contact", href: isHome ? "#booking" : "/#booking" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-brand-bg/95 backdrop-blur-md shadow-sm border-b border-brand-sage/10"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 relative">
        {/* Top Header Row: Logo & Mobile CTA */}
        <div className="w-full md:w-auto flex items-center justify-between gap-4 select-none">
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-3 group text-left"
          >
            <img 
              src={wubarLogo} 
              alt="Wu Bar Logo" 
              className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full border border-brand-sage/25 shadow-sm bg-[#F9F6EE] p-0.5 transition-transform duration-300 group-hover:scale-105 translate-y-[3px] md:translate-y-[4px]"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl tracking-[0.18em] font-light text-brand-sage transition-colors duration-300 group-hover:text-brand-rose">
                WU BAR
              </span>
              <span className="font-sans text-[8px] tracking-[0.4em] uppercase -mt-0.5 text-brand-charcoal/60 transition-colors duration-300">
                S I N G A P O R E
              </span>
            </div>
          </Link>

          {/* Quick CTA on Mobile Screen only */}
          <button
            onClick={onNavigateToBooking}
            className="md:hidden relative px-4 py-2 rounded-full overflow-hidden group border border-brand-sage bg-brand-button hover:bg-brand-sage text-white font-sans text-[10px] tracking-[0.1em] uppercase font-bold transition-all duration-300 shadow-sm"
          >
            <span className="relative z-10 flex items-center space-x-1">
              <PhoneCall className="w-2.5 h-2.5 mr-1" />
              <span>Book</span>
            </span>
          </button>
        </div>

        {/* Navigation Options Ribbons: Displayed directly in top bar, scrollable on mobile */}
        <div 
          className="w-full md:w-auto flex items-center justify-start md:justify-center overflow-x-auto md:overflow-x-visible py-1 px-4 md:px-0 gap-5 md:gap-8 scroll-smooth select-none md:flex-shrink-0 relative"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {navLinks.map((link) => {
            if (link.name === "Services") {
              return (
                <div 
                  key={link.name} 
                  ref={dropdownRef}
                  className="relative flex-shrink-0"
                  onMouseEnter={() => window.innerWidth >= 768 && setIsServicesOpen(true)}
                  onMouseLeave={() => window.innerWidth >= 768 && setIsServicesOpen(false)}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsServicesOpen(!isServicesOpen);
                    }}
                    className={`font-sans text-[11px] md:text-xs tracking-[0.15em] uppercase font-medium transition-colors relative flex-shrink-0 flex items-center gap-1 py-2 ${
                      isServicesOpen ? 'text-brand-sage' : 'text-brand-charcoal/80 hover:text-brand-sage'
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                    <span className={`absolute bottom-0 left-0 h-[1px] bg-brand-rose transition-all duration-300 ${isServicesOpen ? 'w-full' : 'w-0'}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`
                          fixed left-4 right-4 top-[110px]
                          md:absolute md:top-[100%] md:left-1/2 md:right-auto md:-translate-x-1/2 md:mt-2 md:w-[260px] 
                          bg-white border border-brand-sage/15 rounded-2xl shadow-xl z-50 overflow-hidden
                        `}
                      >
                        <div className="py-2 flex flex-col">
                          {servicesData.map(service => (
                            <Link
                              key={service.id}
                              to={`/service/${service.id}`}
                              state={{ fromHome: true }}
                              onClick={() => setIsServicesOpen(false)}
                              className="px-5 py-3.5 text-left font-sans text-[11px] md:text-xs tracking-[0.1em] uppercase text-brand-charcoal/80 hover:text-brand-sage hover:bg-brand-sage-light/40 transition-colors w-full border-b border-brand-sage/5 last:border-0 block"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            if (link.name === "Packages") {
              return (
                <div 
                  key={link.name} 
                  ref={packagesDropdownRef}
                  className="relative flex-shrink-0"
                  onMouseEnter={() => window.innerWidth >= 768 && setIsPackagesOpen(true)}
                  onMouseLeave={() => window.innerWidth >= 768 && setIsPackagesOpen(false)}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsPackagesOpen(!isPackagesOpen);
                    }}
                    className={`font-sans text-[11px] md:text-xs tracking-[0.15em] uppercase font-medium transition-colors relative flex-shrink-0 flex items-center gap-1 py-2 ${
                      isPackagesOpen ? 'text-brand-sage' : 'text-brand-charcoal/80 hover:text-brand-sage'
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isPackagesOpen ? 'rotate-180' : ''}`} />
                    <span className={`absolute bottom-0 left-0 h-[1px] bg-brand-rose transition-all duration-300 ${isPackagesOpen ? 'w-full' : 'w-0'}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isPackagesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`
                          fixed left-4 right-4 top-[110px]
                          md:absolute md:top-[100%] md:left-1/2 md:right-auto md:-translate-x-1/2 md:mt-2 md:w-[260px] 
                          bg-white border border-brand-sage/15 rounded-2xl shadow-xl z-50 overflow-hidden
                        `}
                      >
                        <div className="py-2 flex flex-col">
                          {packagesData.map(pkg => (
                            <Link
                              key={pkg.id}
                              to={`/package/${pkg.id}`}
                              state={{ fromHome: true }}
                              onClick={() => setIsPackagesOpen(false)}
                              className="px-5 py-3.5 text-left font-sans text-[11px] md:text-xs tracking-[0.1em] uppercase text-brand-charcoal/80 hover:text-brand-sage hover:bg-brand-sage-light/40 transition-colors w-full border-b border-brand-sage/5 block"
                            >
                              {pkg.title}
                            </Link>
                          ))}
                          <div className="pt-2 pb-1 border-b border-brand-sage/5">
                            <Link 
                              to="/additional-services"
                              onClick={() => setIsPackagesOpen(false)}
                              className="px-5 py-2 flex items-center justify-between group"
                            >
                              <span className="font-mono text-[9px] tracking-widest text-brand-rose font-bold uppercase">
                                Additional Services
                              </span>
                              <ChevronDown className="w-3 h-3 text-brand-rose -rotate-90 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            {additionalServices.map(service => (
                              <Link
                                key={service.title}
                                to={`/additional-services`}
                                state={{ fromHome: true }}
                                onClick={() => setIsPackagesOpen(false)}
                                className="px-5 py-2.5 pl-6 text-left font-sans text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-brand-charcoal/70 hover:text-brand-sage hover:bg-brand-sage-light/40 transition-colors w-full block"
                              >
                                - {service.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            if (link.name === "Cocktails") {
              return (
                <div 
                  key={link.name} 
                  ref={cocktailsDropdownRef}
                  className="relative flex-shrink-0"
                  onMouseEnter={() => window.innerWidth >= 768 && setIsCocktailsOpen(true)}
                  onMouseLeave={() => window.innerWidth >= 768 && setIsCocktailsOpen(false)}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsCocktailsOpen(!isCocktailsOpen);
                    }}
                    className={`font-sans text-[11px] md:text-xs tracking-[0.15em] uppercase font-medium transition-colors relative flex-shrink-0 flex items-center gap-1 py-2 ${
                      isCocktailsOpen ? 'text-brand-sage' : 'text-brand-charcoal/80 hover:text-brand-sage'
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isCocktailsOpen ? 'rotate-180' : ''}`} />
                    <span className={`absolute bottom-0 left-0 h-[1px] bg-brand-rose transition-all duration-300 ${isCocktailsOpen ? 'w-full' : 'w-0'}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isCocktailsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`
                          fixed left-4 right-4 top-[110px]
                          md:absolute md:top-[100%] md:left-1/2 md:right-auto md:-translate-x-1/2 md:mt-2 md:w-[220px] 
                          bg-white border border-brand-sage/15 rounded-2xl shadow-xl z-50 overflow-hidden
                        `}
                      >
                        <div className="py-2 flex flex-col">
                          {[
                            { label: "Menu", category: "all" },
                            { label: "Wu Signatures", category: "signature" },
                            { label: "Timeless Classics", category: "classic" },
                            { label: "Teas", category: "mocktail" },
                            { label: "Custom Cocktails", category: "custom" }
                          ].map((option, index, arr) => {
                            const isLast = index === arr.length - 1;
                            return (
                              <button
                                key={option.category}
                                onClick={() => {
                                  if (option.category === "custom") {
                                    handleCustomCocktailsClick();
                                  } else {
                                    handleCocktailFilter(option.category);
                                  }
                                }}
                                className={`px-5 py-3.5 text-left font-sans text-[11px] md:text-xs tracking-[0.1em] uppercase transition-colors w-full block ${
                                  option.category === "custom"
                                    ? "text-brand-rose font-semibold bg-brand-rose-light/10 hover:text-brand-sage hover:bg-brand-sage-light/40"
                                    : "text-brand-charcoal/80 hover:text-brand-sage hover:bg-brand-sage-light/40"
                                } ${!isLast ? "border-b border-brand-sage/5" : ""}`}
                              >
                                {option.label}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleLinkClick(e, link.name, link.href)}
                className="font-sans text-[11px] md:text-xs tracking-[0.15em] uppercase font-medium transition-colors relative py-2 flex-shrink-0 text-brand-charcoal/80 hover:text-brand-sage group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-rose transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </div>

        {/* Regular CTA on Desktop (MD screens and up) */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={onNavigateToBooking}
            className="relative px-6 py-2.5 rounded-full overflow-hidden group border border-brand-sage bg-brand-button hover:bg-brand-sage text-white font-sans text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 shadow-sm hover:scale-[1.02]"
          >
            <span className="relative z-10 flex items-center space-x-1">
              <PhoneCall className="w-3 h-3 mr-1" />
              <span>Book Now</span>
            </span>
            <span className="absolute inset-0 bg-brand-rose translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

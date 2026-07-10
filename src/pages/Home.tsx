import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowUp, Instagram, Facebook, CalendarCheck, MapPin, Mail, PhoneCall } from "lucide-react";

// Modular Component Imports
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import WhyUs from "../components/WhyUs";
import CocktailMenu from "../components/CocktailMenu";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import Process from "../components/Process";
import BookingForm from "../components/BookingForm";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import Footer from "../components/Footer";
import classicMartini from "../assets/images/classic_martini_image_1783693546291.jpg";

// High-end image paths from our generate_image assets
const HERO_IMAGE_PATH = "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=1200";
const BAR_IMAGE_PATH = "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=800";
const MARTINI_IMAGE_PATH = classicMartini;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  // Monitor scroll height for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ensure we start at the top if there is no hash
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  // Handle smooth scrolling to hashed sections client-side when navigating via menus
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "auto" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  const handleBookingSubmitSuccess = () => {
    // Elegant success handler
  };

  const handleNavigateToBooking = () => {
    window.open("https://wa.me/6587263670?text=Hello%20Wu%20Bar%20SG%2C%20I%20would%20like%20to%20request%20a%20quote.", "_blank");
  };

  const handleNavigateToMenu = () => {
    const el = document.getElementById("cocktails");
    if (el) el.scrollIntoView({ behavior: "auto" });
  };

  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden bg-brand-bg text-brand-charcoal">
      
      {/* Floating WhatsApp Concierge Button */}
      <FloatingWhatsApp />

      {/* Sticky Navigation bar */}
      <Navigation
        onNavigateToBooking={handleNavigateToBooking}
      />

      {/* Main Full-Screen Hero Area */}
      <Hero
        onNavigateToBooking={handleNavigateToBooking}
        onNavigateToMenu={handleNavigateToMenu}
        heroImage={HERO_IMAGE_PATH}
      />

      {/* Our curations Cocktail Menu Grid */}
      <CocktailMenu signatureImage={MARTINI_IMAGE_PATH} />

      {/* Why Choose Us Bento Grid */}
      <WhyUs />

      {/* Services Tab Portfolio */}
      <Services />

      {/* Lightbox Editorial Gallery Masonry */}
      <Gallery
        heroImage={HERO_IMAGE_PATH}
        barImage={BAR_IMAGE_PATH}
        martiniImage={MARTINI_IMAGE_PATH}
      />

      {/* Process flow layout */}
      <Process />

      {/* Interactive Booking and Quotation Form */}
      <BookingForm
        onBookingSubmitSuccess={handleBookingSubmitSuccess}
      />

      {/* Editorial Footer */}
      <Footer />

      {/* Scroll to Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-6 z-40 p-3 bg-brand-charcoal-light/90 border border-brand-champagne/20 text-brand-champagne rounded-full shadow-lg hover:bg-brand-copper hover:text-brand-charcoal transition-colors"
            title="Scroll back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

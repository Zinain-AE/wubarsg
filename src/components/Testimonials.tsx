import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Quote, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialItem } from "../types";

interface TestimonialsProps {
  isLightMode?: boolean;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews: TestimonialItem[] = [
    {
      id: "1",
      name: "Jeanette & Bryan Tan",
      role: "Bride & Groom",
      company: "Wedding at Capella Sentosa",
      content: "Wu Bar SG completely elevated our wedding reception. Our guests are still talking about the floral 'Midnight Rose' cocktail that color-shifted. The custom portable bar matched our flower arrangements perfectly. Truly a five-star hotel-level experience.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "2",
      name: "Marcus Chen",
      role: "Marketing Director",
      company: "Vacheron Constantin Singapore",
      content: "We hired Wu Bar SG for our luxury boutique timepiece launch. They designed custom cocktails matching our exact rose gold casing tone and laser-etched our brand logo onto the orange peel garnishes. Flawless speed and utmost professionalism.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "3",
      name: "Alexandra Sterling",
      role: "Senior Event Producer",
      company: "Sterling & Co. Weddings",
      content: "An absolute masterpiece. Wu Bar's team brought an unparalleled level of sophistication to our client's wedding at The Ritz-Carlton. The champagne tower with organic cascading blossoms was breathtaking, and the bespoke menu design was incredibly elegant.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "4",
      name: "David Ng",
      role: "CEO",
      company: "TechNexus SG",
      content: "The level of service was immaculate. From the bespoke cocktails that perfectly aligned with our company's branding to the sleek bar setup, everything was flawless. The team was highly professional and kept the drinks flowing smoothly all night.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "5",
      name: "Sarah Lim",
      role: "Birthday Celebrant",
      company: "Private Villa Event",
      content: "I wanted something truly unique for my 30th birthday, and Wu Bar delivered beyond expectations. The custom mocktail options were incredible, ensuring all my guests had an amazing time. The mixologists were not just pouring drinks, they were entertaining!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const getVisibleReviews = () => {
    // Show 1 review on mobile, 2 on tablet, 3 on desktop
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
    }
    return 3;
  };

  // For simplicity, we'll just show 3 items starting from currentIndex, wrapping around
  const visibleItems = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length]
  ];

  return (
    <section id="testimonials" className="py-12 md:py-16 relative overflow-hidden bg-brand-bg">
      {/* Decorative Blur Circles */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-brand-sage-light/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="font-mono text-xs tracking-[0.3em] text-brand-sage uppercase font-bold block">
            CLIENT CORRESPONDENCE
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-brand-charcoal">
            Shared <span className="italic font-normal text-brand-rose">Experiences</span>
          </h2>
          <p className="font-sans text-xs md:text-sm font-light leading-relaxed text-brand-charcoal/70">
            Read honest feedback from luxury celebrations, wedding cocktail hours, and exclusive brand launches across Singapore.
          </p>
        </div>

        {/* Reviews Cards Wall */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left items-stretch">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((rev, idx) => (
              <motion.div
                key={`${rev.id}-${idx}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={`p-8 md:p-10 rounded-3xl border flex flex-col justify-between relative overflow-hidden group bg-white border-brand-sage/10 hover:border-brand-sage/25 hover:shadow-md transition-all duration-300 ${idx >= 1 ? 'hidden md:flex' : ''} ${idx >= 2 ? 'lg:flex hidden' : ''}`}
              >
                {/* Quote icon watermark */}
                <Quote className="absolute top-6 right-8 w-12 h-12 text-brand-sage/5 pointer-events-none group-hover:text-brand-sage/10 transition-colors" />

                <div className="space-y-6">
                  {/* Stars Indicator */}
                  <div className="flex text-brand-rose">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current animate-pulse" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="font-serif italic text-sm md:text-base font-light leading-relaxed text-brand-charcoal/85">
                    "{rev.content}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center pt-6 mt-6 border-t border-brand-sage/10">
                  <div className="text-left">
                    <h4 className="font-serif text-base font-normal text-brand-charcoal">
                      {rev.name}
                    </h4>
                    <div className="flex items-center space-x-1 font-mono text-[10px] text-brand-charcoal/60 tracking-wider">
                      <MapPin className="w-3.5 h-3.5 text-brand-sage" />
                      <span>{rev.company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center space-x-8 mt-16">
          <button 
            onClick={handlePrev}
            className="w-14 h-14 rounded-full border border-brand-rose flex items-center justify-center text-brand-rose hover:bg-brand-rose/5 transition-all"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex items-center space-x-3">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx 
                    ? "w-8 h-2.5 bg-brand-rose" 
                    : "w-2.5 h-2.5 bg-brand-charcoal/15 hover:bg-brand-charcoal/30"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-14 h-14 rounded-full border border-brand-rose flex items-center justify-center text-brand-rose hover:bg-brand-rose/5 transition-all"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}

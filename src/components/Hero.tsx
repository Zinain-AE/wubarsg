import { motion } from "motion/react";
import { ArrowRight, Star, Clock, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroProps {
  onNavigateToBooking: () => void;
  onNavigateToMenu: () => void;
  heroImage: string;
}

export default function Hero({ onNavigateToBooking, onNavigateToMenu, heroImage }: HeroProps) {
  const [sgTime, setSgTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Singapore",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setSgTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-16 bg-brand-bg">
      {/* Cinematic Background Image Container with parallax/zoom animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src={heroImage}
            alt="Crafting Elegant Cocktail Experiences"
            className="w-full h-full object-cover object-[center_35%] filter brightness-95 contrast-[1.02]"
            referrerPolicy="no-referrer"
          ></img>
        </motion.div>
        {/* Soft, airy light-mode overlay gradients for editorial feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/95 via-brand-bg/65 to-transparent md:bg-gradient-to-r" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-brand-bg/10" />
      </div>

      {/* Main Luxury Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Area */}
        <div className="lg:col-span-8 space-y-8 text-left">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center space-x-2 py-1.5 px-4 rounded-full bg-white/80 backdrop-blur-sm border border-brand-sage/15 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-rose" />
            <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-brand-sage uppercase font-bold">
              SINCE 2026 • EXCLUSIVE MOBILE BARTENDING
            </span>
          </motion.div>

          {/* Award/Rating Metric */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-1.5 text-brand-rose"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current text-brand-rose" />
              ))}
            </div>
            <span className="font-mono text-[10px] tracking-widest text-brand-charcoal/70 uppercase font-medium">
              Singapore’s Premium Wedding & Corporate Mobile Bar
            </span>
          </motion.div>

          {/* Elegant Huge Typography Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-light tracking-tight text-brand-charcoal"
          >
            Crafting Elegant Cocktail <br />
            <span className="italic font-normal text-brand-rose">Experiences</span> for Weddings & Corporate Events
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-sans text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl text-brand-charcoal/80"
          >
            Professional mobile bartending services in Singapore, designed to elevate every celebration with handcrafted cocktails and exceptional hospitality.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            <button
              onClick={onNavigateToBooking}
              className="px-8 py-4 rounded-full bg-brand-button hover:bg-brand-sage text-white font-sans text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-sm hover:scale-[1.03] flex items-center justify-center space-x-2"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToMenu}
              className="px-8 py-4 rounded-full border border-brand-rose/30 hover:border-brand-rose bg-white/70 hover:bg-white text-brand-rose font-sans text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 flex items-center justify-center shadow-sm"
            >
              View Cocktail Menu
            </button>
          </motion.div>
        </div>

        {/* Info Bento Card on the Right */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-4 bg-white/95 rounded-3xl p-8 border border-brand-sage/10 shadow-sm relative overflow-hidden flex flex-col justify-between space-y-8"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="font-mono text-[9px] tracking-widest text-brand-sage uppercase font-bold">
                RESERVATION STATS
              </span>
              <Clock className="w-4 h-4 text-brand-rose animate-spin-slow" />
            </div>

            <div className="space-y-4">
              <div>
                <span className="block text-3xl font-serif text-brand-sage font-light">2,000+</span>
                <span className="block font-sans text-[10px] tracking-widest text-brand-charcoal/50 uppercase">
                  Bespoke Cocktails Served
                </span>
              </div>
              <div className="h-[1px] bg-brand-sage/10" />
              <div>
                <span className="block text-3xl font-serif text-brand-sage font-light">500+</span>
                <span className="block font-sans text-[10px] tracking-widest text-brand-charcoal/50 uppercase">
                  Luxury Events Executed
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-sage/10">
            <span className="block font-sans text-[9px] tracking-widest text-brand-charcoal/40 uppercase mb-2">
              CURRENT SINGAPORE TIME
            </span>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
              <span className="font-mono text-base tracking-widest text-brand-sage font-bold">
                {sgTime || "06:46 PM"}
              </span>
            </div>
            <span className="block font-sans text-[9px] tracking-wider text-brand-charcoal/50 mt-1">
              Active concierge booking line is online
            </span>
          </div>

          {/* Decorative graphic glow */}
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-brand-rose/5 rounded-full blur-2xl pointer-events-none" />
        </motion.div>
      </div>

      {/* Elegant Down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none opacity-50">
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-brand-sage mb-1.5">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-brand-sage to-transparent"
        />
      </div>
    </section>
  );
}

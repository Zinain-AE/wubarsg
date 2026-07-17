import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Music, GlassWater, Info, PhoneCall } from "lucide-react";
import { additionalServices } from "../data";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function AdditionalServicesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigateToWhatsApp = () => {
    const text = encodeURIComponent(`Hello Wu Bar SG, I would like to inquire about the Pre-Event Tasting Session.`);
    window.open(`https://wa.me/6587263670?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden bg-brand-bg text-brand-charcoal">
      <Navigation onNavigateToBooking={() => {}} />
      
      <main className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/#packages"
            className="inline-flex items-center space-x-2 text-brand-sage mb-10 hover:text-brand-rose transition-colors font-mono text-[10px] tracking-widest uppercase font-bold group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO PACKAGES</span>
          </Link>
          
          <div className="space-y-4 mb-12">
            <span className="font-mono text-[10px] tracking-widest text-brand-rose font-bold uppercase block">
              ELEVATE YOUR EVENT
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-brand-charcoal font-light leading-tight">
              Additional Services
            </h1>
            <p className="font-serif italic text-lg md:text-2xl text-brand-sage mt-2">
              Enhance your tailored bar experience with our specialized add-ons.
            </p>
          </div>

          <div className="space-y-8">
            {/* DJ Service */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-brand-sage/20 shadow-lg relative overflow-hidden group">
              <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-brand-charcoal flex items-center gap-3">
                    <Music className="w-6 h-6 text-brand-sage" />
                    DJ Service
                  </h3>
                  <p className="font-sans text-sm text-brand-charcoal/70 max-w-md">
                    Professional DJ for your event to keep the energy high and the crowd entertained.
                  </p>
                  <p className="font-mono font-bold text-sm text-brand-charcoal pt-2">$300 / hr</p>
                </div>
                <Link
                  to="/service/dj-service"
                  className="flex items-center space-x-2 py-3 px-6 rounded-full bg-brand-sage-light/50 hover:bg-brand-sage text-brand-charcoal hover:text-white font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 border border-brand-sage/20"
                >
                  <span>See Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Bespoke Signature Cocktail */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-brand-sage/20 shadow-lg relative overflow-hidden group">
              <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-brand-charcoal flex items-center gap-3">
                    <GlassWater className="w-6 h-6 text-brand-sage" />
                    Bespoke Signature Cocktail
                  </h3>
                  <p className="font-sans text-sm text-brand-charcoal/70 max-w-md">
                    A custom cocktail named and crafted specifically for your event. Create your own custom cocktails.
                  </p>
                  <p className="font-mono font-bold text-sm text-brand-charcoal pt-2">+$80</p>
                </div>
                <Link
                  to="/?custom=true"
                  className="flex items-center space-x-2 py-3 px-6 rounded-full bg-brand-sage-light/50 hover:bg-brand-sage text-brand-charcoal hover:text-white font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 border border-brand-sage/20"
                >
                  <span>See Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Pre-Event Tasting Session */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-brand-sage/20 shadow-lg relative overflow-hidden group">
              <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-brand-charcoal flex items-center gap-3">
                    <Info className="w-6 h-6 text-brand-sage" />
                    Pre-Event Tasting Session
                  </h3>
                  <p className="font-sans text-sm text-brand-charcoal/70 max-w-md">
                    1hr consultation and tasting at your location to curate the perfect menu.
                  </p>
                  <p className="font-mono font-bold text-sm text-brand-charcoal pt-2">+$140</p>
                </div>
                <button
                  onClick={handleNavigateToWhatsApp}
                  className="flex items-center space-x-2 py-3 px-6 rounded-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 border border-[#25D366]/30"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>WhatsApp Enquire</span>
                </button>
              </div>
            </div>
            
          </div>
          
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}

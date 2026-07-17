import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Check, Award, ArrowLeft, ArrowRight, Info, Plus } from "lucide-react";
import { packagesData } from "../data";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function PackagePage() {
  const { id } = useParams<{ id: string }>();
  const pkg = packagesData.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center font-sans">
        <div className="text-center">
          <h2 className="font-serif text-3xl mb-4 text-brand-charcoal">Package not found</h2>
          <Link to="/" className="text-brand-sage hover:text-brand-rose underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  const handleNavigateToBooking = () => {
    const text = encodeURIComponent(`Hello Wu Bar SG, I would like to inquire about the ${pkg.title} package.`);
    window.open(`https://wa.me/6587263670?text=${text}`, "_blank");
  };

  const currentIndex = packagesData.findIndex(s => s.id === id);
  const nextPkg = packagesData[(currentIndex + 1) % packagesData.length];
  const prevPkg = packagesData[(currentIndex - 1 + packagesData.length) % packagesData.length];

  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden bg-brand-bg text-brand-charcoal">
      <Navigation onNavigateToBooking={handleNavigateToBooking} />
      
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
            <span>BACK TO ALL PACKAGES</span>
          </Link>
          
          <div className="space-y-4 mb-12">
            <span className="font-mono text-[10px] tracking-widest text-brand-rose font-bold uppercase block">
              {pkg.subtitle}
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-brand-charcoal font-light leading-tight">
              {pkg.title}
            </h1>
            <p className="font-serif italic text-lg md:text-2xl text-brand-sage mt-2">
              {pkg.tagline}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-14 border border-brand-sage/20 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-10">
              
              <div className="flex flex-col md:flex-row justify-between gap-8">
                <div>
                  <h4 className="font-mono text-[11px] tracking-widest text-brand-sage font-bold uppercase mb-4">
                    PRICING DETAILS
                  </h4>
                  <ul className="space-y-3 font-sans text-sm md:text-base text-brand-charcoal/80">
                    {pkg.pricingDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-sage" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {pkg.capacity && (
                  <div>
                    <h4 className="font-mono text-[11px] tracking-widest text-brand-sage font-bold uppercase mb-4">
                      CAPACITY GUIDE
                    </h4>
                    <ul className="space-y-3 font-sans text-sm md:text-base text-brand-charcoal/80">
                      {pkg.capacity.map((cap, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Info className="w-4 h-4 mt-0.5 text-brand-sage shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-6 pt-8 border-t border-brand-sage/10">
                <h4 className="font-mono text-[11px] tracking-widest text-brand-sage font-bold uppercase">
                  WHAT'S INCLUDED
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {pkg.includes.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="w-6 h-6 rounded-full bg-brand-sage-light border border-brand-sage/25 flex items-center justify-center text-brand-sage flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-sans text-sm md:text-base text-brand-charcoal/85 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {pkg.extra && (
                <div className="space-y-6 pt-8 border-t border-brand-sage/10 bg-brand-sage-light/20 p-6 rounded-2xl">
                  <h4 className="font-mono text-[13px] tracking-widest text-brand-rose font-bold uppercase">
                    {pkg.extra.title}
                  </h4>
                  <p className="font-sans text-sm text-brand-charcoal/80 mb-4">{pkg.extra.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-mono text-[10px] tracking-widest font-bold mb-3">PRICING</h5>
                      <ul className="space-y-2 text-sm text-brand-charcoal/80">
                        {pkg.extra.pricing.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-mono text-[10px] tracking-widest font-bold mb-3">INCLUDES</h5>
                      <ul className="space-y-2 text-sm text-brand-charcoal/80">
                        {pkg.extra.includes.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Plus className="w-4 h-4 mt-0.5 text-brand-rose shrink-0" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {pkg.surcharges && (
                <div className="pt-4 mt-6">
                  <p className="font-sans text-xs text-brand-charcoal/60 italic">
                    Note: {pkg.surcharges}
                  </p>
                </div>
              )}

              <div className="pt-12 mt-12 border-t border-brand-sage/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-3">
                    <Award className="w-6 h-6 text-brand-rose" />
                    <span className="font-mono text-[10px] md:text-[11px] tracking-widest text-brand-sage/70 uppercase font-bold">
                      SECURE YOUR DATE
                    </span>
                  </div>
                  <span className="text-xs text-brand-charcoal/60 ml-9">50% deposit required. Balance due 7 days prior.</span>
                </div>
                <button
                  onClick={handleNavigateToBooking}
                  className="py-4 px-10 rounded-full bg-brand-button hover:bg-brand-sage text-white font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 shadow-md border border-brand-sage/20 w-full sm:w-auto"
                >
                  Enquire Now
                </button>
              </div>

            </div>
            
            {/* Background elements */}
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-rose/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-sage/5 rounded-full blur-[100px] pointer-events-none" />
          </div>

          <div className="mt-16 flex items-center justify-between border-t border-brand-sage/10 pt-8">
            <Link 
              to={`/package/${prevPkg.id}`}
              state={{ fromHome: true }}
              className="flex items-center space-x-2 text-brand-sage hover:text-brand-charcoal transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="font-sans text-xs uppercase tracking-widest font-bold">Previous</span>
            </Link>
            <Link 
              to={`/package/${nextPkg.id}`}
              state={{ fromHome: true }}
              className="flex items-center space-x-2 text-brand-sage hover:text-brand-charcoal transition-colors group"
            >
              <span className="font-sans text-xs uppercase tracking-widest font-bold">Next</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}

import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Check, Award, ArrowLeft, ArrowRight } from "lucide-react";
import { servicesData } from "../data";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function ServicePage() {
  const { id } = useParams<{ id: string }>();
  const service = servicesData.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center font-sans">
        <div className="text-center">
          <h2 className="font-serif text-3xl mb-4 text-brand-charcoal">Service not found</h2>
          <Link to="/" className="text-brand-sage hover:text-brand-rose underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  const handleNavigateToBooking = () => {
    const text = encodeURIComponent(`Hello Wu Bar SG, I would like to request a quote for the ${service.title} service.`);
    window.open(`https://wa.me/6587263670?text=${text}`, "_blank");
  };

  const currentIndex = servicesData.findIndex(s => s.id === id);
  const nextService = servicesData[(currentIndex + 1) % servicesData.length];
  const prevService = servicesData[(currentIndex - 1 + servicesData.length) % servicesData.length];

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
            to="/#services"
            className="inline-flex items-center space-x-2 text-brand-sage mb-10 hover:text-brand-rose transition-colors font-mono text-[10px] tracking-widest uppercase font-bold group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO ALL SERVICES</span>
          </Link>

          <div className="space-y-4 mb-12">
            <span className="font-mono text-[10px] tracking-widest text-brand-rose font-bold uppercase block">
              SINGAPORE CATERING PROGRAM
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-brand-charcoal font-light leading-tight">
              {service.title}
            </h1>
            <p className="font-serif italic text-lg md:text-2xl text-brand-sage mt-2">
              "{service.tagline}"
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-14 border border-brand-sage/20 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-10">
              <p className="font-sans text-base md:text-lg font-light leading-relaxed text-brand-charcoal/80 max-w-3xl">
                {service.description}
              </p>

              <div className="space-y-6 pt-8 border-t border-brand-sage/10">
                <h4 className="font-mono text-[11px] tracking-widest text-brand-sage font-bold uppercase">
                  WHAT IS INCLUDED IN THE PACKAGE
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {service.features.map((feature, i) => (
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

              <div className="pt-12 mt-12 border-t border-brand-sage/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-brand-rose" />
                  <span className="font-mono text-[10px] md:text-[11px] tracking-widest text-brand-sage/70 uppercase font-bold">
                    5-STAR CERTIFIED SERVICES
                  </span>
                </div>
                <button
                  onClick={handleNavigateToBooking}
                  className="py-4 px-10 rounded-full bg-brand-button hover:bg-brand-sage text-white font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 shadow-md border border-brand-sage/20 w-full sm:w-auto"
                >
                  Request a Quote
                </button>
              </div>
            </div>

            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-rose/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-sage/5 rounded-full blur-[100px] pointer-events-none" />
          </div>

          <div className="mt-16 flex items-center justify-between border-t border-brand-sage/10 pt-8">
            <Link 
              to={`/service/${prevService.id}`}
              state={{ fromHome: true }}
              className="flex items-center space-x-2 text-brand-sage hover:text-brand-charcoal transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="font-sans text-xs uppercase tracking-widest font-bold">Previous</span>
            </Link>
            <Link 
              to={`/service/${nextService.id}`}
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

import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { servicesData } from "../data";

interface ServicesProps {
  isLightMode?: boolean;
}

export default function Services({ isLightMode }: ServicesProps) {
  return (
    <section id="services" className="py-12 md:py-20 relative bg-brand-bg min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
          <span className="font-mono text-xs tracking-[0.3em] text-brand-sage uppercase font-bold block">
            HOSPITALITY PORTFOLIO
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-brand-charcoal">
            Bespoke <span className="italic font-normal text-brand-rose">Mobile Bar</span> Services
          </h2>
          <p className="font-sans text-xs md:text-sm font-light text-brand-charcoal/70 max-w-xl mx-auto">
            We deliver highly optimized configurations tailored to your crowd's size, taste profile, and format. Explore our luxury services.
          </p>
        </div>

        <motion.div
          key="grid-view"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {servicesData.map((service) => (
            <Link
              key={service.id}
              to={`/service/${service.id}`}
              state={{ fromHome: true }}
              className="group bg-white rounded-3xl p-8 border border-brand-sage/15 hover:border-brand-sage/40 hover:shadow-lg transition-all duration-300 flex flex-col h-full relative overflow-hidden block"
            >
              <div className="flex-grow space-y-4 relative z-10">
                <h3 className="font-serif text-xl md:text-2xl text-brand-charcoal group-hover:text-brand-sage transition-colors">
                  {service.title}
                </h3>
                <p className="font-sans text-xs text-brand-charcoal/70 line-clamp-3">
                  {service.description}
                </p>
              </div>
              
              <div className="pt-6 mt-6 border-t border-brand-sage/10 flex items-center justify-between relative z-10">
                <span className="font-mono text-[9px] tracking-widest uppercase text-brand-rose font-bold">
                  Explore Option
                </span>
                <div className="w-8 h-8 rounded-full bg-brand-sage-light flex items-center justify-center text-brand-sage group-hover:bg-brand-sage group-hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
              
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-brand-sage/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Link>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

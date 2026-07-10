import { motion } from "motion/react";
import { Send, CalendarDays, Wine, FileCode, CheckSquare, Sparkles, Trash2, ArrowDown } from "lucide-react";
import { ProcessStep } from "../types";

interface ProcessProps {
  isLightMode?: boolean;
}

export default function Process() {
  const steps: ProcessStep[] = [
    {
      step: "01",
      title: "Inquiry",
      description: "Submit our premium booking form with event coordinates. We respond within 2 hours with an initial quote.",
    },
    {
      step: "02",
      title: "Consultation",
      description: "Arrange a virtual session or an in-person meeting at our Singapore showroom to align on visual styles and themes.",
    },
    {
      step: "03",
      title: "Custom Menu Curation",
      description: "Our Sommelier crafts a bespoke menu featuring drinks colored, garnished, and named in line with your design.",
    },
    {
      step: "04",
      title: "Event Planning",
      description: "We coordinate with your wedding planner or corporate lead to establish logistics, safety rules, and timing.",
    },
    {
      step: "05",
      title: "Pristine Setup",
      description: "We arrive 90 minutes before. Our logistics team secures the custom portable bars, lighting rigs, and crystal wear.",
    },
    {
      step: "06",
      title: "Cocktail Experience",
      description: "The main event. Our trained mixologists serve theatrical drinks (smoke, bubbles, florality) with flawless hospitality.",
    },
    {
      step: "07",
      title: "Immaculate Cleanup",
      description: "Complete post-event breakdown and waste clearance, leaving the venue exactly as clean as we found it.",
    },
  ];

  const icons = [
    <Send className="w-5 h-5 text-brand-sage" />,
    <CalendarDays className="w-5 h-5 text-brand-sage" />,
    <Wine className="w-5 h-5 text-brand-sage" />,
    <FileCode className="w-5 h-5 text-brand-sage" />,
    <CheckSquare className="w-5 h-5 text-brand-sage" />,
    <Sparkles className="w-5 h-5 text-brand-sage" />,
    <Trash2 className="w-5 h-5 text-brand-sage" />,
  ];

  return (
    <section id="process" className="py-12 md:py-16 relative overflow-hidden bg-white border-t border-brand-sage/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="font-mono text-xs tracking-[0.3em] text-brand-sage uppercase font-bold block">
            OPERATIONAL EXECUTION
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-brand-charcoal">
            Our Flawless <span className="italic font-normal text-brand-rose">Flow & Setup</span>
          </h2>
          <p className="font-sans text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed text-brand-charcoal/70">
            From digital submission to late-night toast, we manage every single segment with total military precision and editorial charm.
          </p>
        </div>

        {/* Process Map Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 relative">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex flex-col items-center justify-center text-center p-6 rounded-2xl relative z-10 border bg-brand-bg border-brand-sage/10 hover:border-brand-sage/25 group transition-all duration-300 aspect-square"
            >
              {/* Floating Step Badge */}
              <span className="font-mono text-[9px] tracking-widest text-brand-rose font-bold absolute top-3 right-4">
                {item.step}
              </span>

              {/* Icon Box */}
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 relative border transition-transform duration-300 group-hover:scale-105 bg-brand-sage-light border-brand-sage/15">
                {icons[idx]}
                
                {/* Micro-sparkle pulse overlay */}
                <div className="absolute inset-0 w-12 h-12 rounded-full border border-dashed border-brand-rose opacity-0 group-hover:opacity-40 group-hover:animate-spin" />
              </div>

              {/* Title & Desc */}
              <h3 className="font-serif text-lg font-normal mb-2 text-brand-charcoal">
                {item.title}
              </h3>
              
              <p className="font-sans text-[11px] md:text-xs font-light leading-relaxed text-brand-charcoal/70">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

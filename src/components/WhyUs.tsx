import { motion } from "motion/react";
import { Sparkles, Award, FileEdit, Check, GlassWater, Landmark, CalendarDays, ShieldCheck } from "lucide-react";

interface WhyUsProps {
  isLightMode?: boolean;
}

export default function WhyUs({ isLightMode }: WhyUsProps) {
  const pillars = [
    {
      icon: <GlassWater className="w-6 h-6 text-brand-sage" />,
      title: "Premium Ingredients",
      description: "We source small-batch spirits, house-infused floral syrups, fresh clarified citrus juices, and beautiful organic botanical garnishes.",
    },
    {
      icon: <Award className="w-6 h-6 text-brand-sage" />,
      title: "Professional Bartenders",
      description: "Our charismatic mixologists are trained in Singapore's finest five-star establishments, providing flawless hospitality.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-brand-sage" />,
      title: "Beautiful Presentation",
      description: "Every pour is a work of art, featuring premium crystal glassware, hand-carved crystal ice blocks, and gorgeous floral accents.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-sage" />,
      title: "Reliable Service",
      description: "From early, discreet setup to complete post-event cleanup, our team ensures a perfectly organized and licensed beverage service.",
    },
    {
      icon: <FileEdit className="w-6 h-6 text-brand-sage" />,
      title: "Custom Cocktail Menus",
      description: "Tailor the menu entirely to your theme. Work with us to design personalized signature drinks named after your milestone.",
    },
    {
      icon: <Landmark className="w-6 h-6 text-brand-sage" />,
      title: "Elegant Setup",
      description: "Bespoke mobile bar structures finished in custom ivory, sage, or gold trims that match the look of Singapore's premier venues.",
    },
    {
      icon: <CalendarDays className="w-6 h-6 text-brand-sage" />,
      title: "Seamless Event Experience",
      description: "We handle the logistics, calculations, setup, and cleanup, allowing you to relax and enjoy the celebration with your guests.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="why-us" className="py-12 md:py-16 relative bg-brand-rose-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs tracking-[0.3em] text-brand-sage uppercase font-bold block"
          >
            SENSORY PERFECTION
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl md:text-5xl font-light tracking-tight text-brand-charcoal"
          >
            Why Discerning Hosts <br />
            <span className="italic font-normal text-brand-rose">Choose Our Service</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed text-brand-charcoal/70"
          >
            We coordinate a luxurious, wedding-inspired sensory journey that seamlessly enhances the social rhythm of your celebration.
          </motion.p>
        </div>

        {/* Bento Grid layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="p-8 rounded-3xl border border-brand-sage/10 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-[280px] bg-white shadow-sm hover:shadow-md group"
            >
              {/* Pillar Icon Box */}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 bg-brand-sage-light">
                  {pillar.icon}
                </div>
                
                <h3 className="font-serif text-lg md:text-xl font-light text-brand-charcoal">
                  {pillar.title}
                </h3>
              </div>

              {/* Description */}
              <p className="font-sans text-xs md:text-sm font-light leading-relaxed text-brand-charcoal/75">
                {pillar.description}
              </p>

              {/* Thin Decorative Rose Corner Bar */}
              <div className="absolute top-0 right-0 w-8 h-[2px] bg-brand-rose/10 group-hover:bg-brand-rose/50 transition-colors duration-300" />
              <div className="absolute top-0 right-0 w-[2px] h-8 bg-brand-rose/10 group-hover:bg-brand-rose/50 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Dynamic Highlight Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 md:p-12 rounded-3xl border border-brand-rose/15 text-center bg-white shadow-sm relative overflow-hidden"
        >
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-[9px] tracking-widest text-brand-rose font-bold uppercase block">
              OUR HOSPITALITY MANIFESTO
            </span>
            <p className="font-serif italic text-base md:text-xl font-light text-brand-charcoal/95">
              "A luxury beverage is not simply a metric of spirits and juice. It is an editorial reflection of host values, served on ice, tailored in crystal, and paced to the heartbeat of the celebration."
            </p>
            <span className="block font-sans text-xs tracking-wider text-brand-sage font-medium uppercase mt-2">
              — WU BAR SG Hospitality Team
            </span>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-32 bg-brand-rose/5 rounded-full blur-[80px] pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

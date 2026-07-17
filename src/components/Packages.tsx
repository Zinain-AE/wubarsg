import { motion } from "motion/react";
import { Check, X, Plus, Info, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { packagesData, additionalServices } from "../data";

export default function Packages() {
  const handleEnquire = (packageName: string) => {
    const text = encodeURIComponent(`Hello Wu Bar SG, I would like to inquire about the ${packageName} package.`);
    window.open(`https://wa.me/6587263670?text=${text}`, "_blank");
  };

  return (
    <section id="packages" className="py-12 md:py-24 relative bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
          <span className="font-mono text-xs tracking-[0.3em] text-brand-sage uppercase font-bold block">
            OUR PACKAGES
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-brand-charcoal">
            Three Tailored <span className="italic font-normal text-brand-rose">Bar Experiences</span>
          </h2>
          <p className="font-sans text-xs md:text-sm font-light text-brand-charcoal/70 max-w-xl mx-auto">
            From professional bartender hire to the complete WuBar experience, select the perfect package for your event. All prices exclude GST.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Package 1: EPSOM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border border-brand-sage/15 flex flex-col h-full relative"
          >
            <div className="mb-6">
              <h3 className="font-serif text-2xl text-brand-charcoal mb-2">EPSOM</h3>
              <p className="font-mono text-[10px] tracking-wider text-brand-rose font-bold uppercase mb-4">Bartender Only Service</p>
              <p className="font-sans text-sm italic text-brand-charcoal/70">"You provide the drinks — we bring the craft."</p>
            </div>
            
            <div className="mb-8">
              <p className="font-sans text-xs text-brand-charcoal/50 uppercase tracking-widest mb-1">From</p>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-4xl text-brand-charcoal">$150</span>
                <span className="font-sans text-xs text-brand-charcoal/60">/ 2 hours min</span>
              </div>
            </div>

            <div className="space-y-6 flex-grow">
              <div>
                <h4 className="font-mono text-xs tracking-wider font-bold mb-3">PRICING DETAILS</h4>
                <ul className="space-y-2 font-sans text-xs text-brand-charcoal/80">
                  <li className="flex justify-between border-b border-gray-100 pb-1"><span>2 Hours:</span> <span>$150</span></li>
                  <li className="flex justify-between border-b border-gray-100 pb-1"><span>3 Hours:</span> <span>$230</span></li>
                  <li className="flex justify-between pb-1"><span>4 Hours+:</span> <span>$60/hr</span></li>
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-xs tracking-wider font-bold mb-3">CAPACITY GUIDE</h4>
                <ul className="space-y-2 font-sans text-xs text-brand-charcoal/80">
                  <li className="flex items-start gap-2"><Info className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>Up to 15 pax — drinks brought directly to guests</span></li>
                  <li className="flex items-start gap-2"><Info className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>20–30 pax — cocktail service</span></li>
                  <li className="flex items-start gap-2"><Info className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>40–50 pax — general drinks service</span></li>
                  <li className="flex items-start gap-2"><Info className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>61–100 pax — 2 bartenders recommended</span></li>
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-xs tracking-wider font-bold mb-3">WHAT'S INCLUDED</h4>
                <ul className="space-y-2 font-sans text-xs text-brand-charcoal/80">
                  <li className="flex items-start gap-2"><Check className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>Licensed professional bartender</span></li>
                  <li className="flex items-start gap-2"><Check className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>Basic bar tools, shakers & jiggers</span></li>
                  <li className="flex items-start gap-2"><Check className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>Setup and teardown</span></li>
                  <li className="flex items-start gap-2"><Check className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>On-call support</span></li>
                </ul>
              </div>

              <div className="pt-4 border-t border-brand-sage/15">
                <p className="font-sans text-[11px] text-brand-charcoal/70 italic mb-2">Surcharges: Sentosa & Tuas: +$50</p>
                <p className="font-sans text-[11px] text-brand-charcoal/70 italic font-bold">Confirm booking: Secure your date with a 50% deposit. Balance due 7 days prior to event.</p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => handleEnquire("EPSOM")}
                  className="w-full py-3 px-6 rounded-full bg-brand-button hover:bg-brand-sage text-white font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 shadow-md border border-brand-sage/20 text-center"
                >
                  Enquire
                </button>
              </div>
            </div>
          </motion.div>

          {/* Package 2: LUXE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-brand-charcoal rounded-3xl p-8 shadow-xl flex flex-col h-full relative text-white"
          >
            {/* Ribbon */}
            <div className="absolute top-0 right-8 bg-brand-sage text-white font-mono text-[9px] tracking-widest px-3 py-1 rounded-b-md uppercase font-bold">
              Popular
            </div>

            <div className="mb-6">
              <h3 className="font-serif text-2xl text-white mb-2">LUXE</h3>
              <p className="font-mono text-[10px] tracking-wider text-brand-rose font-bold uppercase mb-4">Dry Hire + Mobile Bar</p>
              <p className="font-sans text-sm italic text-white/70">"Everything except alcohol, mixers & ice"</p>
            </div>
            
            <div className="mb-8">
              <p className="font-sans text-xs text-white/50 uppercase tracking-widest mb-1">From</p>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-4xl text-white">$380</span>
                <span className="font-sans text-xs text-white/60">/ 2 hours min</span>
              </div>
            </div>

            <div className="space-y-6 flex-grow">
              <div>
                <h4 className="font-mono text-xs tracking-wider font-bold mb-3 text-brand-sage">BASE PACKAGE</h4>
                <ul className="space-y-2 font-sans text-xs text-white/80 mb-4">
                  <li className="flex justify-between border-b border-white/10 pb-1"><span>2 Hours:</span> <span>$380</span></li>
                  <li className="flex justify-between border-b border-white/10 pb-1"><span>3 Hours:</span> <span>$450</span></li>
                  <li className="flex justify-between pb-1"><span>4 Hours+:</span> <span>$80/hr</span></li>
                </ul>
                <ul className="space-y-2 font-sans text-xs text-white/80">
                  <li className="flex items-start gap-2"><Check className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>Signature 5ft styled bar cart</span></li>
                  <li className="flex items-start gap-2"><Check className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>Licensed professional bartender</span></li>
                  <li className="flex items-start gap-2"><Check className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>Bar tools, equipment & delivery</span></li>
                </ul>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 className="font-mono text-xs tracking-wider font-bold mb-2 text-brand-rose">LUXE PLUS</h4>
                <p className="font-sans text-[10px] text-white/60 mb-3 leading-relaxed">Includes custom pre-mixed cocktail/mocktail mixers & garnishes.</p>
                <ul className="space-y-2 font-sans text-xs text-white/80 mb-4">
                  <li className="flex justify-between border-b border-white/10 pb-1"><span>2 Hours:</span> <span>$520</span></li>
                  <li className="flex justify-between border-b border-white/10 pb-1"><span>3 Hours:</span> <span>$620</span></li>
                  <li className="flex justify-between pb-1"><span>4 Hours+:</span> <span>$80/hr</span></li>
                </ul>
                <ul className="space-y-2 font-sans text-xs text-white/80">
                  <li className="flex items-start gap-2"><Plus className="w-3 h-3 mt-0.5 text-brand-rose shrink-0" /> <span>Custom pre-mixed cocktail mixers & mocktail bases</span></li>
                  <li className="flex items-start gap-2"><Plus className="w-3 h-3 mt-0.5 text-brand-rose shrink-0" /> <span>Fresh garnishes, bar accessories, branded napkins & straws</span></li>
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="font-sans text-[11px] text-white/60 italic leading-relaxed mb-2">
                  Services up to 40-50 pax per bartender.<br/>
                  Surcharges: Sentosa & Tuas: +$50 | Custom signage on cart: +$50
                </p>
                <p className="font-sans text-[11px] text-white/80 italic font-bold">Confirm booking: Secure your date with a 50% deposit. Balance due 7 days prior to event.</p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => handleEnquire("LUXE")}
                  className="w-full py-3 px-6 rounded-full bg-brand-sage hover:bg-brand-sage-light hover:text-brand-charcoal text-white font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 shadow-md border border-brand-sage/20 text-center"
                >
                  Enquire
                </button>
              </div>
            </div>
          </motion.div>

          {/* Package 3: BELMONT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-brand-sage-light/30 rounded-3xl p-8 border border-brand-sage/20 flex flex-col h-full relative"
          >
            <div className="mb-6">
              <h3 className="font-serif text-2xl text-brand-charcoal mb-2">BELMONT</h3>
              <p className="font-mono text-[10px] tracking-wider text-brand-sage font-bold uppercase mb-4">Full Wet Bar Service</p>
              <p className="font-sans text-sm italic text-brand-charcoal/70">"The complete WuBar experience. We provide everything."</p>
            </div>
            
            <div className="mb-8">
              <p className="font-sans text-xs text-brand-charcoal/50 uppercase tracking-widest mb-1">From</p>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-4xl text-brand-charcoal">$750</span>
                <span className="font-sans text-xs text-brand-charcoal/60">/ 3 hours, 40 pax</span>
              </div>
            </div>

            <div className="space-y-6 flex-grow">
              <div>
                <h4 className="font-mono text-xs tracking-wider font-bold mb-3">WET HIRE PACKAGES</h4>
                <p className="font-sans text-[11px] text-brand-charcoal/70 mb-3">(Up to 40 pax, 1 bartender included)</p>
                <ul className="space-y-2 font-sans text-xs text-brand-charcoal/80">
                  <li className="flex justify-between border-b border-brand-sage/20 pb-1 font-semibold"><span>3 Hours:</span> <span>From $750</span></li>
                  <li className="pt-1 text-[11px] text-brand-charcoal/60 italic">2 Hours, 4 Hours, and Extra Hours are custom quoted on request.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-xs tracking-wider font-bold mb-3">WHAT'S INCLUDED</h4>
                <ul className="space-y-2 font-sans text-xs text-brand-charcoal/80">
                  <li className="flex items-start gap-2"><Check className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>Signature 5ft styled bar cart & licensed bartender(s)</span></li>
                  <li className="flex items-start gap-2"><Check className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>Custom cocktail menu consultation</span></li>
                  <li className="flex items-start gap-2"><Check className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>Alcohol (spirits, wine, beer), mixers, juices, sodas</span></li>
                  <li className="flex items-start gap-2"><Check className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>Ice, garnishes, appropriate glassware</span></li>
                  <li className="flex items-start gap-2"><Check className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>Branded napkins/straws, setup & full teardown</span></li>
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-xs tracking-wider font-bold mb-3">SCALABILITY</h4>
                <ul className="space-y-2 font-sans text-xs text-brand-charcoal/80">
                  <li className="flex items-start gap-2"><Plus className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>60–80 pax (+1 bartender)</span></li>
                  <li className="flex items-start gap-2"><Plus className="w-3 h-3 mt-0.5 text-brand-sage shrink-0" /> <span>80–150 pax (+2 bartenders)</span></li>
                </ul>
              </div>

              <div className="pt-4 border-t border-brand-sage/15">
                <p className="font-sans text-[11px] text-brand-charcoal/70 italic mb-2">Add-ons: DJ Service: +$50 | Sentosa/Tuas: +$30</p>
                <p className="font-sans text-[11px] text-brand-charcoal/70 italic font-bold">Confirm booking: Secure your date with a 50% deposit. Balance due 7 days prior to event.</p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => handleEnquire("BELMONT")}
                  className="w-full py-3 px-6 rounded-full bg-brand-button hover:bg-brand-sage text-white font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 shadow-md border border-brand-sage/20 text-center"
                >
                  Enquire
                </button>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

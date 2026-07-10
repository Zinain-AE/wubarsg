import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Plus, Wine, Beaker, Leaf, Calendar, Settings } from "lucide-react";

interface CustomCocktailBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomCocktailBuilder({ isOpen, onClose }: CustomCocktailBuilderProps) {
  // Pre-select luxury default options to make the form immediately active and never "stuck" or "disabled"
  const [base, setBase] = useState("Non-Alcoholic Gin");
  const [profile, setProfile] = useState("Sweet & Fruity");
  const [glass, setGlass] = useState("Crystal Coupe");
  const [theme, setTheme] = useState("Classic Elegant");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const bases = [
    "Non-Alcoholic Gin",
    "Zero-Proof Tequila",
    "Aged Rum Alternative",
    "Botanical Distillate",
    "Coffee/Espresso"
  ];

  const profiles = [
    "Sweet & Fruity",
    "Sour & Tangy",
    "Bitter & Complex",
    "Smoky & Woody",
    "Fresh & Herbal"
  ];

  const glassware = [
    "Crystal Coupe",
    "Martini Glass",
    "Highball",
    "Rocks Glass",
    "Copper Mug"
  ];

  const themes = [
    "Classic Elegant Wedding",
    "Modern Minimalist Corporate",
    "Tropical Summer Vibe",
    "Celestial Dark Magic",
    "Traditional Heritage",
    "Private Home Party"
  ];

  const eventNeeds = [
    "Hand-cut Artisanal Ice",
    "Bespoke Glassware selection",
    "Molecular / Smoking theater",
    "Custom Garnishes & Prints",
    "Tailored Signature Menu"
  ];

  const handleToggleNeed = (need: string) => {
    if (selectedNeeds.includes(need)) {
      setSelectedNeeds(selectedNeeds.filter((n) => n !== need));
    } else {
      setSelectedNeeds([...selectedNeeds, need]);
    }
  };

  // WhatsApp text formatting
  const whatsappUrl = `https://wa.me/6587263670?text=${encodeURIComponent(
    `Hello Wu Bar SG, I would like to request a Custom Cocktail selection:
- Base Spirit: ${base}
- Flavor Profile: ${profile}
- Preferred Glassware: ${glass}
- Event Theme: ${theme}
- Event Needs: ${selectedNeeds.length > 0 ? selectedNeeds.join(", ") : "None specified"}
- Special Requests/Notes: ${notes || "None"}`
  )}`;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-charcoal/85 backdrop-blur-md cursor-pointer"
        >
          {/* Prevent clicks inside the modal from closing it */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-brand-bg rounded-3xl overflow-hidden shadow-2xl border border-brand-rose/25 relative flex flex-col max-h-[85vh] cursor-default"
          >
            {/* Sticky/Fixed Header with Title and Close Button */}
            <div className="p-6 pb-4 border-b border-brand-rose/10 flex justify-between items-center bg-brand-bg relative z-10">
              <div className="space-y-1 text-left">
                <span className="font-mono text-[9px] tracking-[0.25em] text-brand-rose font-bold uppercase block">
                  Bespoke Mixology
                </span>
                <h3 className="font-serif text-2xl text-brand-sage font-light tracking-wide">
                  Custom Cocktail Builder
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-brand-rose/10 text-brand-charcoal/60 hover:text-brand-charcoal transition-colors duration-200"
                aria-label="Close custom cocktail builder"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Fields Body */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1 text-left scrollbar-thin">
              <p className="font-sans text-xs text-brand-charcoal/75 leading-relaxed bg-brand-rose-light/50 p-4 rounded-2xl border border-brand-rose/10">
                Design your signature drink and our mixologists will craft it to perfection. Click an option below to customize your creation.
              </p>

              <div className="space-y-6">
                {/* Base */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.15em] text-brand-sage font-bold uppercase">
                    <Beaker className="w-3.5 h-3.5 text-brand-rose" />
                    <span>Select Base Spirit</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {bases.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBase(b)}
                        className={`p-3 rounded-xl text-xs font-sans text-left transition-all duration-200 border flex items-center justify-between ${
                          base === b
                            ? "bg-brand-sage text-white border-brand-sage shadow-sm font-medium"
                            : "bg-white text-brand-charcoal/80 border-brand-sage/10 hover:border-brand-rose/40 hover:bg-brand-champagne-light/30"
                        }`}
                      >
                        <span>{b}</span>
                        {base === b && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-rose animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Profile */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.15em] text-brand-sage font-bold uppercase">
                    <Leaf className="w-3.5 h-3.5 text-brand-rose" />
                    <span>Flavor Profile</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {profiles.map((p) => (
                      <button
                        key={p}
                        onClick={() => setProfile(p)}
                        className={`p-3 rounded-xl text-xs font-sans text-left transition-all duration-200 border flex items-center justify-between ${
                          profile === p
                            ? "bg-brand-sage text-white border-brand-sage shadow-sm font-medium"
                            : "bg-white text-brand-charcoal/80 border-brand-sage/10 hover:border-brand-rose/40 hover:bg-brand-champagne-light/30"
                        }`}
                      >
                        <span>{p}</span>
                        {profile === p && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-rose animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Glass */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.15em] text-brand-sage font-bold uppercase">
                    <Wine className="w-3.5 h-3.5 text-brand-rose" />
                    <span>Preferred Glassware</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {glassware.map((g) => (
                      <button
                        key={g}
                        onClick={() => setGlass(g)}
                        className={`p-3 rounded-xl text-xs font-sans text-left transition-all duration-200 border flex items-center justify-between ${
                          glass === g
                            ? "bg-brand-sage text-white border-brand-sage shadow-sm font-medium"
                            : "bg-white text-brand-charcoal/80 border-brand-sage/10 hover:border-brand-rose/40 hover:bg-brand-champagne-light/30"
                        }`}
                      >
                        <span>{g}</span>
                        {glass === g && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-rose animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Event Theme */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.15em] text-brand-sage font-bold uppercase">
                    <Calendar className="w-3.5 h-3.5 text-brand-rose" />
                    <span>Event Theme / Occasion</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {themes.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`p-3 rounded-xl text-xs font-sans text-left transition-all duration-200 border flex items-center justify-between ${
                          theme === t
                            ? "bg-brand-sage text-white border-brand-sage shadow-sm font-medium"
                            : "bg-white text-brand-charcoal/80 border-brand-sage/10 hover:border-brand-rose/40 hover:bg-brand-champagne-light/30"
                        }`}
                      >
                        <span>{t}</span>
                        {theme === t && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-rose animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Event Needs */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.15em] text-brand-sage font-bold uppercase">
                    <Settings className="w-3.5 h-3.5 text-brand-rose" />
                    <span>Select Event Needs</span>
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {eventNeeds.map((need) => {
                      const isSelected = selectedNeeds.includes(need);
                      return (
                        <button
                          key={need}
                          onClick={() => handleToggleNeed(need)}
                          className={`p-3.5 rounded-xl text-xs font-sans text-left transition-all duration-200 border flex items-center justify-between ${
                            isSelected
                              ? "bg-brand-sage/15 text-brand-sage border-brand-sage font-medium"
                              : "bg-white text-brand-charcoal/80 border-brand-sage/10 hover:border-brand-rose/40 hover:bg-brand-champagne-light/30"
                          }`}
                        >
                          <span>{need}</span>
                          <span className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                            isSelected ? "border-brand-sage bg-brand-sage text-white" : "border-brand-sage/20 bg-white"
                          }`}>
                            {isSelected && <span className="text-[10px] font-bold leading-none">✓</span>}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.15em] text-brand-sage font-bold uppercase">
                    <Plus className="w-3.5 h-3.5 text-brand-rose" />
                    <span>Special Requests / Notes</span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific garnishes, allergies, or visual themes?"
                    className="w-full p-4 rounded-xl bg-white border border-brand-sage/10 text-xs font-sans text-brand-charcoal outline-none focus:border-brand-rose h-24 resize-none transition-colors duration-200"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="p-6 border-t border-brand-rose/10 bg-brand-bg relative z-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full block text-center py-4 rounded-full bg-brand-button hover:bg-brand-rose text-white hover:text-brand-charcoal font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg active:scale-[0.98]"
              >
                Request Custom Creation
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}

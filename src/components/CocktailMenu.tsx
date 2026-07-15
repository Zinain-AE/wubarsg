import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, Sparkles, Coffee, Heart, RefreshCw, Layers, Plus, Wine } from "lucide-react";
import { Cocktail } from "../types";
import CustomCocktailBuilder from "./CustomCocktailBuilder";
import espressoMartini from "../assets/images/espresso_martini_1783693206423.jpg";
import negroniImage from "../assets/images/negroni_cocktail_1783693385207.jpg";
import classicMartini from "../assets/images/classic_martini_image_1783693546291.jpg";
import whiskeySourImage from "../assets/images/whiskey_sour_cocktail_1783693732253.jpg";
import smokeAshImage from "../assets/images/smoke_ash_cocktail_1783694899466.jpg";
import midnightPurpleImage from "../assets/images/midnight_purple_cocktail_1783695423811.jpg";
import tanoshiteaImage from "../assets/images/tanoshitea_cocktail_1783695642898.jpg";

interface CocktailMenuProps {
  isLightMode?: boolean;
  signatureImage: string;
}

export default function CocktailMenu({ signatureImage }: CocktailMenuProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "signature" | "classic" | "mocktail">("all");
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  useEffect(() => {
    // Function to update active tab based on query params
    const updateTabFromQuery = () => {
      const params = new URLSearchParams(window.location.search);
      const filter = params.get("filter");
      if (filter && ["all", "signature", "classic", "mocktail"].includes(filter)) {
        setActiveTab(filter as any);
      }

      // Check for custom builder query param or hash trigger
      if (params.get("custom") === "true" || window.location.hash === "#custom-cocktails") {
        setIsBuilderOpen(true);
        // Clean up URL parameter to prevent multiple triggers
        const cleanSearch = window.location.search.replace(/[?&]custom=true/, "");
        const prefix = cleanSearch.startsWith("&") ? "?" + cleanSearch.substring(1) : cleanSearch;
        const cleanUrl = window.location.pathname + prefix + (window.location.hash === "#custom-cocktails" ? "" : window.location.hash);
        window.history.replaceState(null, "", cleanUrl);
      }
    };

    // Run on mount
    updateTabFromQuery();

    // Listen to custom event
    const handleFilterEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ category: string }>;
      if (customEvent.detail && customEvent.detail.category) {
        setActiveTab(customEvent.detail.category as any);
      }
    };

    // Listen to custom builder open event
    const handleOpenBuilderEvent = () => {
      setIsBuilderOpen(true);
      const element = document.getElementById("cocktails");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("filter-cocktails", handleFilterEvent);
    window.addEventListener("open-cocktail-builder", handleOpenBuilderEvent);
    // Also listen to popstate in case of browser navigation
    window.addEventListener("popstate", updateTabFromQuery);

    return () => {
      window.removeEventListener("filter-cocktails", handleFilterEvent);
      window.removeEventListener("open-cocktail-builder", handleOpenBuilderEvent);
      window.removeEventListener("popstate", updateTabFromQuery);
    };
  }, []);

  const cocktailsData: Cocktail[] = [
    {
      id: "espresso",
      name: "Espresso",
      ingredients: ["Freshly Brewed Espresso", "Non-Alcoholic Coffee Elixir", "Premium Cane Sugar Syrup", "Vanilla Bean Pod"],
      preparation: ["Double Shake", "Double Strain", "Garnish with Three Coffee Beans"],
      taste: ["Bold", "Coffee", "Smooth"],
      glass: "Crystal Coupe",
      type: "signature",
      description: "A dark, rich, and velvety masterpiece. Double-shaken to achieve a luxurious golden foam layer that perfectly highlights the premium, fresh single-origin espresso.",
      image: espressoMartini
    },
    {
      id: "margarita",
      name: "Margarita",
      ingredients: ["Zero-Proof Tequila alternative", "Non-Alcoholic Orange Sec", "Fresh Pressed Lime Juice", "Organic Agave Nectar"],
      preparation: ["Wet Shake", "Fine Strain", "Sea Salt Half Rim"],
      taste: ["Tangy", "Citric", "Crisp"],
      glass: "Coupe Glass",
      type: "classic",
      description: "A classic harmony of sharp citrus and tequila warmth, balanced with organic agave and served with a delicate crystalline sea salt rim.",
      image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "negroni",
      name: "Negroni",
      ingredients: ["Non-Alcoholic Gin Distillate", "Botanical Bitter Elixir", "Zero-Proof Sweet Vermouth"],
      preparation: ["Stir 30 seconds", "Single Strain over Block Ice", "Grated Orange Peel Twist"],
      taste: ["Bitter", "Complex", "Rich"],
      glass: "Bespoke Rocks Glass",
      type: "classic",
      description: "The gold standard of Italian aperitifs. Stretched slowly over a solid hand-carved ice sphere, allowing the herbal gin and bitter Campari to bind smoothly.",
      image: negroniImage
    },
    {
      id: "rum-old-fashioned",
      name: "Rum Old Fashioned",
      ingredients: ["Aged Non-Alcoholic Rum alternative", "Organic Demerara", "Aromatic Bitters"],
      preparation: ["Stir with Orange Rind", "Pour over Clear Spherical Ice", "Torched Cinnamon Stick garnish"],
      taste: ["Sweet", "Smoked", "Oaky"],
      glass: "Ribbed Double Rocks",
      type: "classic",
      description: "A dark Caribbean take on a vintage masterpiece. Deep molasses and barrel oak notes, sweetened with demerara syrup and elevated with warm spice.",
      image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "martini",
      name: "Martini",
      ingredients: ["Premium Non-Alcoholic Juniper Distillate", "Artisanal Dry botanical Elixir", "Sicilian Lemon Peel", "Green Olives"],
      preparation: ["Ice Bath Stir", "Double Strain", "Lemon Zest Expressed"],
      taste: ["Pure", "Dry", "Crisp"],
      glass: "Martini Glass",
      type: "signature",
      description: "Sleek, dry, and exceptionally pure. Chilled to freezing temperatures with dry vermouth and expressed with organic Sicilian lemon oils.",
      image: classicMartini
    },
    {
      id: "whiskey-sour",
      name: "Whiskey Sour",
      ingredients: ["Zero-Proof Kentucky Bourbon alternative", "Fresh Lemon Juice", "Sugar Syrup", "Angostura Bitters", "Egg Whites (Optional)"],
      preparation: ["Dry Shake (No Ice)", "Wet Shake with Ice", "Double Strain"],
      taste: ["Sour", "Foamy", "Citrus"],
      glass: "Bespoke Lowball",
      type: "classic",
      description: "An elegant contrast of sharp lemon and smooth Kentucky bourbon. Double-shaken to produce an incredibly smooth meringue-like collar.",
      image: whiskeySourImage
    },
    {
      id: "smoke-ash",
      name: "Smoke Ash",
      ingredients: ["Bespoke Smoked Oak Infusion", "Perrier Soda Water", "Aromatic Botanical Bitters"],
      preparation: ["Build over Clear Ice Block", "Smoke Infusion under Cloche", "Charred Rosemary Sprig"],
      taste: ["Smoked", "Effervescent", "Oaky"],
      glass: "Tall Highball Glass",
      type: "signature",
      description: "Our signature theatrical highball. Presented under a glass cloche filled with local wood smoke, revealing a complex, effervescent, and smoky botanical elixir.",
      image: smokeAshImage
    },
    {
      id: "midnight",
      name: "Blackberry Veil",
      ingredients: ["Non-Alcoholic Botanical Juniper Elixir", "Alcohol-Free Violet Blossom Water", "Fresh Lemon", "Butterfly Pea Elixir"],
      preparation: ["Double Strain", "Layered Pea Flower Float", "Pressed Viola Edible Flower"],
      taste: ["Floral", "Sweet", "Royal"],
      glass: "Vintage Coupe",
      type: "signature",
      description: "An enchanting, color-shifting tribute to Singapore's evening sky. Infused with local butterfly pea flowers that drift from indigo to royal violet on lime contact.",
      image: midnightPurpleImage
    },
    {
      id: "santorini-sunset",
      name: "Aegean Glow",
      ingredients: ["Zero-Proof Saffron botanical Spirit", "Cold Pressed Pineapple Elixir", "Fresh Squeezed Lime", "Premium Saffron Syrup"],
      preparation: ["Hard Shake", "Double Strain", "Dehydrated Blood Orange Wheel"],
      taste: ["Tropical", "Citric", "Saffron"],
      glass: "Fluted Tulip Coupe",
      type: "signature",
      description: "A golden-hued, sun-drenched drink designed for rooftop settings. Melds tropical zero-proof spice warmth with the luxurious, exotic aroma of saffron syrup.",
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "sakura-fizz",
      name: "Hanami Spritz",
      ingredients: ["Bespoke Cherry Blossom infusion", "Ume Plum zero-proof nectar", "Perrier Soda", "Butterfly Pea extract"],
      preparation: ["Built over Floral Ice Sphere", "Slow Carbonation Pour", "Pickled Sakura Blossom garnish"],
      taste: ["Sweet", "Effervescent", "Berry"],
      glass: "Ribbed Highball",
      type: "signature",
      description: "Delicate, carbonated pink elegance. We freeze whole organic flower blossoms inside clear artisanal ice, melting slowly to release floral and plum tones.",
      image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "tanoshitea",
      name: "Smoky Amber",
      ingredients: ["Uji Matcha ceremonial grade", "Sakura Blossom water", "Fresh Citrus Squeeze", "Filtered Sparkling Soda"],
      preparation: ["Matcha Whisked Cold", "Built with Soda", "Fresh Mint Leaf crown"],
      taste: ["Herbaceous", "Floral", "Zen"],
      glass: "Ribbed Rocks",
      type: "mocktail",
      description: "An artisanal, completely non-alcoholic botanical masterpiece. Ceremonial green tea balanced with sweet cherry blossom elixir and sparkling spring soda.",
      image: tanoshiteaImage
    },
    {
      id: "long-island",
      name: "Long Island",
      ingredients: ["Zero-Proof Five-Botanical Blend", "Fresh Lemon Infusion", "Artisanal Cola Reduction"],
      preparation: ["Built on Crushed Ice", "Gentle Swirl", "Candied Lemon Wheel"],
      taste: ["Rich", "Cola-Spiced", "Sweet"],
      glass: "Luxury Highball",
      type: "classic",
      description: "A sophisticated non-alcoholic reinvention of a high-octane classic. By batching our ultra-premium zero-proof botanicals and incorporating organic cola syrup, we deliver a cleaner, smoother drink.",
      image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=600"
    }
  ];

  // Filtering Logic
  const filteredCocktails = cocktailsData.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.ingredients.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));
    if (activeTab === "all") return matchesSearch;
    return c.type === activeTab && matchesSearch;
  });

  return (
    <section id="cocktails" className="py-12 md:py-16 relative bg-brand-rose-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4 max-w-xl text-left">
            <span className="font-mono text-xs tracking-[0.3em] text-brand-sage uppercase font-bold block">
              OUR LIQUID ARTISTRY
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-brand-charcoal">
              Curated <span className="italic font-normal text-brand-rose">Signature</span> Elixirs
            </h2>
            <p className="font-sans text-xs md:text-sm font-light text-brand-charcoal/70">
              Browse our standard catalog. Every drink is 100% alcohol-free, tailored with hand-cut ice, hand-selected local organic botanicals, and served in immaculate crystal glass.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search spirits or flavor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3.5 pl-12 pr-6 rounded-full font-sans text-xs tracking-wider outline-none border transition-all duration-300 bg-white border-brand-sage/15 focus:border-brand-sage text-brand-charcoal"
            />
            <Search className="w-4 h-4 text-brand-sage absolute left-4.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 border-b border-brand-sage/10 pb-4 items-center w-full justify-center">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { id: "all", label: "Entire Menu" },
              { id: "signature", label: "Wu Signatures" },
              { id: "classic", label: "Timeless Classics" },
              { id: "mocktail", label: "Teas" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2.5 rounded-full font-sans text-xs tracking-widest uppercase transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-brand-sage text-white font-bold shadow-sm"
                    : "hover:bg-brand-sage-light text-brand-charcoal/70"
                }`}
              >
                {tab.id === "signature" && <Sparkles className="inline-block w-3 h-3 mr-1.5 -mt-0.5" />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cocktails Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCocktails.map((cocktail) => (
            <div
              key={cocktail.id}
              onClick={() => setSelectedCocktail(cocktail)}
              className="cocktail-card rounded-3xl overflow-hidden border cursor-pointer flex flex-col justify-between h-[450px] group transition-all duration-300 bg-white border-brand-sage/10 hover:border-brand-sage/30 hover:shadow-md"
            >
              {/* Image Section */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={cocktail.image}
                  alt={cocktail.name}
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                {/* Category Pill */}
                <span className="absolute top-4 left-4 font-mono text-[9px] tracking-widest font-bold uppercase py-1 px-3.5 rounded-full bg-brand-charcoal/80 text-brand-champagne border border-brand-champagne/20">
                  {cocktail.type}
                </span>
              </div>

              {/* Body Text */}
              <div className="p-6 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-serif text-xl md:text-2xl font-light text-brand-charcoal">
                      {cocktail.name}
                    </h3>
                    <span className="font-mono text-[10px] text-brand-sage tracking-wider">
                      {cocktail.glass}
                    </span>
                  </div>

                  <p className="font-sans text-xs font-light line-clamp-3 leading-relaxed text-brand-charcoal/70">
                    {cocktail.description}
                  </p>
                </div>

                {/* Ingredients & Prep Summary */}
                <div className="pt-4 border-t border-brand-sage/10 space-y-3">
                  <div className="flex flex-wrap gap-1.5 justify-start">
                    {cocktail.ingredients.slice(0, 3).map((ing, i) => (
                      <span key={i} className="font-mono text-[9px] tracking-wide py-0.5 px-2 rounded-md bg-brand-sage-light text-brand-sage font-medium">
                        {ing}
                      </span>
                    ))}
                    {cocktail.ingredients.length > 3 && (
                      <span className="font-mono text-[9px] tracking-wide py-0.5 px-2 rounded-md bg-transparent text-brand-sage/60 font-medium">
                        +{cocktail.ingredients.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Taste Tags */}
                  <div className="flex items-center space-x-2 justify-start">
                    <span className="font-sans text-[8px] tracking-widest text-brand-rose font-bold uppercase">
                      PROFILE:
                    </span>
                    <div className="flex space-x-1.5">
                      {cocktail.taste.map((t, idx) => (
                        <span key={idx} className="font-mono text-[9px] text-brand-charcoal/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Custom Cocktails Card - the size of a standard square with rounded corners */}
          <div
            onClick={() => setIsBuilderOpen(true)}
            className="cocktail-card rounded-3xl overflow-hidden border-2 border-dashed cursor-pointer flex flex-col justify-between h-[450px] group transition-all duration-300 bg-gradient-to-br from-[#F9F6EE] via-white to-brand-rose-light/40 border-brand-rose/40 hover:border-brand-sage hover:shadow-lg hover:shadow-brand-rose/20 p-8 text-center"
          >
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              {/* Icon Container with a rotating sparkle and wine glass */}
              <div className="w-20 h-20 rounded-2xl bg-white border border-brand-rose/25 flex items-center justify-center group-hover:scale-105 transition-all duration-500 shadow-sm relative overflow-hidden">
                <Sparkles className="w-10 h-10 text-brand-rose absolute animate-pulse opacity-40" />
                <Wine className="w-8 h-8 text-brand-sage relative z-10 group-hover:rotate-6 transition-transform" />
              </div>

              {/* Text Info */}
              <div className="space-y-3">
                <span className="font-mono text-[9px] tracking-[0.25em] text-brand-rose font-bold uppercase block">
                  BESPOKE EXPERIENCE
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-brand-charcoal leading-tight">
                  Your own <span className="italic font-normal text-brand-rose">Custom</span> Cocktails
                </h3>
                <p className="font-sans text-xs font-light text-brand-charcoal/70 leading-relaxed max-w-xs mx-auto">
                  Can't find your perfect match? Design a completely custom cocktail menu tailored exactly to your event's theme and unique mixology desires.
                </p>
              </div>

              {/* Event Theme & Needs helper pill */}
              <div className="py-2 px-4 rounded-xl bg-white/75 border border-brand-rose/10 inline-flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-brand-rose animate-ping" />
                <span className="font-sans text-[10px] font-medium text-brand-sage">
                  Crafted for your event theme & needs
                </span>
              </div>
            </div>

            {/* CTA bottom bar */}
            <div className="pt-4 border-t border-brand-sage/10 flex justify-center items-center">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-brand-sage group-hover:text-brand-rose transition-colors duration-300 flex items-center gap-1.5">
                Design Your Cocktail <Plus className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Modal/Drawer for expanded cocktail view */}
        {typeof document !== "undefined" && createPortal(
          <AnimatePresence>
            {selectedCocktail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-brand-charcoal-dark/95 backdrop-blur-md"
              onClick={() => setSelectedCocktail(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-3xl w-full rounded-3xl overflow-hidden border shadow-xl bg-brand-bg border-brand-sage/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left Column Image */}
                  <div className="h-64 md:h-full relative min-h-[300px]">
                    <img
                      src={selectedCocktail.image}
                      alt={selectedCocktail.name}
                      loading="lazy"
                      className="w-full h-full object-cover filter brightness-95"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={() => setSelectedCocktail(null)}
                      className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-brand-sage/20 text-brand-sage px-3 py-1.5 rounded-full text-xs font-mono tracking-widest hover:bg-brand-sage hover:text-white transition-all duration-300 font-bold"
                    >
                      ✕ Close
                    </button>
                  </div>

                  {/* Right Column Mixology Info */}
                  <div className="p-8 space-y-6 max-h-[85vh] overflow-y-auto text-left">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] tracking-widest text-brand-rose font-bold uppercase">
                        {selectedCocktail.type} SELECTION
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-brand-sage font-light">
                        {selectedCocktail.name}
                      </h3>
                      <div className="flex justify-between text-xs font-mono text-brand-charcoal/60">
                        <span>Glass: {selectedCocktail.glass}</span>
                      </div>
                    </div>

                    <p className="font-sans text-xs md:text-sm font-light text-brand-charcoal/80 leading-relaxed">
                      {selectedCocktail.description}
                    </p>

                    {/* Ingredients List */}
                    <div className="space-y-2">
                      <h4 className="font-mono text-[10px] tracking-widest text-brand-sage font-bold uppercase">
                        PREMIUM COMPONENTS
                      </h4>
                      <ul className="grid grid-cols-1 gap-1.5 pl-4 list-disc text-xs text-brand-charcoal/85">
                        {selectedCocktail.ingredients.map((ing, i) => (
                          <li key={i} className="font-light">{ing}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Preparation specs */}
                    <div className="space-y-2">
                      <h4 className="font-mono text-[10px] tracking-widest text-brand-sage font-bold uppercase">
                        MIXOLOGY PROCESS
                      </h4>
                      <div className="space-y-2">
                        {selectedCocktail.preparation.map((step, i) => (
                          <div key={i} className="flex items-start space-x-2 text-xs">
                            <span className="font-mono text-brand-rose font-bold text-[10px]">0{i+1}.</span>
                            <span className="font-light text-brand-charcoal/70">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA from detail modal */}
                    <div className="pt-4 border-t border-brand-sage/10 flex justify-between items-center">
                      <div className="text-left">
                        <span className="block text-[8px] font-mono text-brand-charcoal/40 uppercase">
                          TASTE PROFILE
                        </span>
                        <span className="block text-xs font-serif text-brand-rose italic">
                          {selectedCocktail.taste.join(", ")}
                        </span>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedCocktail(null);
                          window.location.hash = "#booking";
                        }}
                        className="py-2.5 px-5 rounded-full bg-brand-button hover:bg-brand-sage text-white text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300"
                      >
                        Select & Quote
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
        <CustomCocktailBuilder isOpen={isBuilderOpen} onClose={() => setIsBuilderOpen(false)} />
      </div>
    </section>
  );
}

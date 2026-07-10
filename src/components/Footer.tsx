import { Instagram, Facebook, PhoneCall } from "lucide-react";
import wubarLogo from "../assets/images/wubar_logo_1783680139975.jpg";

export default function Footer() {
  return (
    <footer className="py-16 border-t relative overflow-hidden bg-white border-brand-sage/15 text-brand-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
        
        {/* Logo block */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img src={wubarLogo} alt="WU BAR Logo" className="h-12 w-12" />
            <div>
              <span className="font-serif text-3xl tracking-[0.18em] font-light text-brand-sage block">
                WU BAR
              </span>
              <span className="font-sans text-[10px] tracking-[0.4em] text-brand-rose uppercase block -mt-1 font-semibold">
                SINGAPORE
              </span>
            </div>
          </div>
          <p className="font-sans text-xs font-light leading-relaxed pt-2 text-brand-charcoal/70">
            Crafting refined mixology, delivering unforgettable corporate launches, luxury Sentosa weddings, and bespoke corporate cocktail experiences.
          </p>
        </div>

        {/* Contact Us block */}
        <div className="space-y-4">
          <h4 className="font-mono text-[9px] tracking-widest text-brand-rose font-bold uppercase">
            CONTACT US
          </h4>
          <p className="font-sans text-xs font-light leading-relaxed text-brand-charcoal/70">
            Ready to design your bespoke beverage menu? Get in touch with our private concierge team today.
          </p>
          <div className="pt-2 text-xs font-mono text-brand-charcoal/80 space-y-2.5">
            <div className="flex items-center space-x-2">
              <PhoneCall className="w-3.5 h-3.5 text-brand-sage" />
              <a href="tel:+6587263670" className="hover:text-brand-rose transition-colors">+65 8726 3670</a>
            </div>
          </div>
        </div>

        {/* Social Media block */}
        <div className="space-y-4">
          <h4 className="font-mono text-[9px] tracking-widest text-brand-rose font-bold uppercase">
            FOLLOW OUR JOURNEY
          </h4>
          <p className="font-sans text-xs font-light leading-relaxed text-brand-charcoal/70">
            Discover our latest liquid artistry, behind-the-scenes event setups, and bespoke cocktail masterpieces.
          </p>
          <div className="flex flex-col space-y-2 pt-1">
            <a 
              href="https://www.instagram.com/wubarsg" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-2 text-xs font-sans font-light text-brand-charcoal hover:text-brand-rose transition-colors"
            >
              <Instagram className="w-4 h-4 text-brand-sage" />
              <span>Instagram • @wubarsg</span>
            </a>
            <a 
              href="https://www.facebook.com/share/1Nw8jUjdUV/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-2 text-xs font-sans font-light text-brand-charcoal hover:text-brand-rose transition-colors"
            >
              <Facebook className="w-4 h-4 text-brand-sage" />
              <span>Facebook • Wu Bar SG</span>
            </a>
          </div>
        </div>

      </div>

      {/* Copyright block */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-brand-sage/15 flex flex-col md:flex-row justify-center items-center gap-4">
        <span className="font-sans text-[10px] tracking-wider text-brand-charcoal/60">
          © 2026 WU BAR SG. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  );
}

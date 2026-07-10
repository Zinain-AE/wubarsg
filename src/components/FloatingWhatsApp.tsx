import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquareDot, X, Send } from "lucide-react";
import wubarLogo from "../assets/images/wubar_logo_1783680139975.jpg";

interface FloatingWhatsAppProps {
  isLightMode?: boolean;
}

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const handleSend = () => {
    const text = encodeURIComponent(chatMessage || "Hello Wu Bar SG, I would like to inquire about your luxury mobile bar experiences.");
    window.open(`https://wa.me/6587263670?text=${text}`, "_blank");
    setChatMessage("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 text-left">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-80 rounded-2xl border shadow-2xl mb-4 overflow-hidden relative bg-white border-brand-sage/20"
          >
            {/* Header */}
            <div className="bg-brand-sage text-white p-4 flex justify-between items-center relative">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/40 bg-white p-0.5 shadow-inner">
                    <img
                      src={wubarLogo}
                      alt="Wu Bar Logo"
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-brand-sage animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-medium text-white">Wu Bar Concierge</h4>
                  <span className="text-[10px] text-white/80 font-sans block">Online • Typically replies instantly</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-full transition-colors"
                title="Close chat bubble"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 space-y-3 h-48 overflow-y-auto bg-brand-bg">
              <div className="p-3.5 rounded-2xl rounded-tl-none bg-brand-sage-light border border-brand-sage/10 text-xs text-brand-charcoal/90 leading-relaxed max-w-[85%]">
                Greetings. Thank you for visiting Wu Bar SG.
              </div>
              <div className="p-3.5 rounded-2xl rounded-tl-none bg-brand-sage-light border border-brand-sage/10 text-xs text-brand-charcoal/90 leading-relaxed max-w-[85%]">
                How may we elevate your celebration today? Share details of your wedding reception, cocktail hour, or upcoming corporate gala.
              </div>
            </div>

            {/* Input Tray */}
            <div className="p-3 border-t border-brand-sage/10 flex gap-2">
              <input
                type="text"
                placeholder="Type your inquiry here..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 py-2 px-3 rounded-xl font-sans text-xs outline-none border bg-brand-bg border-brand-sage/15 text-brand-charcoal focus:border-brand-sage"
              />
              <button
                onClick={handleSend}
                className="p-2 rounded-xl bg-brand-button hover:bg-brand-sage text-white transition-colors"
                title="Send WhatsApp Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Trigger Badge */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-[0_4px_25px_rgba(34,197,94,0.4)] relative"
        title="Chat on WhatsApp"
      >
        <MessageSquareDot className="w-7 h-7 text-white" />
        {/* Pulse indicator */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border border-white text-[8px] font-mono font-bold text-white flex items-center justify-center animate-bounce">
          1
        </span>
      </motion.button>
    </div>
  );
}

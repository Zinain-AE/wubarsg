import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Phone, Calculator, ShieldCheck, Sparkles, MessageSquareDot } from "lucide-react";

import { servicesData } from "../data";

interface BookingFormProps {
  isLightMode?: boolean;
  onBookingSubmitSuccess: () => void;
}

export default function BookingForm({ onBookingSubmitSuccess }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [venue, setVenue] = useState("");
  const [guestCount, setGuestCount] = useState<number>(50);
  const [budget, setBudget] = useState("$3,000 - $5,000");
  const [message, setMessage] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);

  const servicesList = servicesData.map(s => ({ id: s.id, label: s.title }));

  const handleServiceChange = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);

    try {
      // Opt-in backend submission to preserve server capability, wrapped to not block WhatsApp transition
      try {
        await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone,
            eventDate,
            venue,
            guestCount,
            budget,
            message,
            selectedServices
          }),
        });
      } catch (apiErr) {
        console.warn("Optional booking backup submission skipped or failed:", apiErr);
      }

      // Convert selected services IDs to human-readable labels
      const selectedServicesLabels = selectedServices.map(
        (id) => servicesList.find((srv) => srv.id === id)?.label || id
      );

      // Build elegant, high-end structured message for WhatsApp
      const whatsappMessage = `Hello Wu Bar SG! 🥂 I would like to request a Bespoke Proposal with the following details:

👤 *Name:* ${name}
✉️ *Email:* ${email}
📞 *Contact Number:* ${phone || "Not specified"}
📅 *Event Date:* ${eventDate || "TBD / Flexible"}
📍 *Singapore Venue:* ${venue || "TBD / To Be Decided"}
💰 *Approximate Budget:* ${budget}
👥 *Attendees:* ${guestCount} Guests

📋 *Required Capabilities:*
${selectedServicesLabels.length > 0 ? selectedServicesLabels.map(s => `  • ${s}`).join("\n") : "  • Standard Cocktail & Beverage Catering"}

💬 *Mixology Requirements & Notes:*
${message || "No custom requirements requested. Ready to discuss!"}`;

      // Deep link to WhatsApp with pre-filled message
      const encodedMsg = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/6587263670?text=${encodedMsg}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank");

      // Set state to show custom successful confirmation
      setSubmitDone(true);
      setTimeout(() => {
        onBookingSubmitSuccess();
        // Reset form
        setName("");
        setEmail("");
        setPhone("");
        setEventDate("");
        setVenue("");
        setGuestCount(50);
        setMessage("");
        setSelectedServices([]);
        setSubmitDone(false);
      }, 4000);

    } catch (err) {
      console.error("Booking submission or WhatsApp redirect error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(`Hello Wu Bar SG, I would like to inquire about a luxury mobile bar for my event on ${eventDate || "TBD"} for around ${guestCount} guests.`);
    window.open(`https://wa.me/6587263670?text=${text}`, "_blank");
  };

  return (
    <section id="booking" className="py-12 md:py-16 relative bg-brand-bg">
      {/* Glow Details */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-sage-light/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs tracking-[0.3em] text-brand-sage font-bold uppercase block">
            RESERVATION SYSTEM
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-brand-charcoal">
            Request A <span className="italic font-normal text-brand-rose">Bespoke Proposal</span>
          </h2>
          <p className="font-sans text-xs md:text-sm font-light text-brand-charcoal/70">
            Begin your journey. Submit your details below, or contact our WhatsApp concierge line directly for an immediate estimate.
          </p>
        </div>

        {/* Workspace layout: Form */}
        <div className="max-w-4xl mx-auto w-full text-left">
          
          {/* Main Booking Form */}
          <div className="w-full">
            <div className="p-8 md:p-10 rounded-3xl border relative bg-white border-brand-sage/15 shadow-sm text-brand-charcoal">
              
              <AnimatePresence>
                {submitDone && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 backdrop-blur-md rounded-3xl bg-white/95 flex flex-col items-center justify-center text-center p-8 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-sage-light text-brand-sage border border-brand-sage flex items-center justify-center shadow-lg">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div className="space-y-1.5 max-w-sm">
                      <h3 className="font-serif text-2xl text-brand-charcoal font-light">
                        Proposal Request Received
                      </h3>
                      <p className="font-sans text-xs text-brand-charcoal/70 leading-relaxed">
                        Thank you, {name}. Your event details have been securely transmitted to our team. Our lead concierge is drafting your bespoke PDF proposal and will contact you shortly.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* Dual Field: Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-widest text-brand-sage font-bold uppercase block">
                      FULL NAME *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Jeanette Tan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full py-3.5 px-4 rounded-xl font-sans text-xs tracking-wider outline-none border transition-all bg-brand-bg border-brand-sage/15 focus:border-brand-sage text-brand-charcoal"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-widest text-brand-sage font-bold uppercase block">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. jeanette@luxuryevents.sg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3.5 px-4 rounded-xl font-sans text-xs tracking-wider outline-none border transition-all bg-brand-bg border-brand-sage/15 focus:border-brand-sage text-brand-charcoal"
                    />
                  </div>
                </div>

                {/* Dual Field: Phone & Event Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-widest text-brand-sage font-bold uppercase block">
                      CONTACT NUMBER
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +65 8726 3670"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full py-3.5 px-4 rounded-xl font-sans text-xs tracking-wider outline-none border transition-all bg-brand-bg border-brand-sage/15 focus:border-brand-sage text-brand-charcoal"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-widest text-brand-sage font-bold uppercase block">
                      EVENT DATE
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full py-3.5 px-4 rounded-xl font-sans text-xs tracking-wider outline-none border transition-all bg-brand-bg border-brand-sage/15 focus:border-brand-sage text-brand-charcoal"
                    />
                  </div>
                </div>

                {/* Venue and Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-widest text-brand-sage font-bold uppercase block">
                      SINGAPORE VENUE
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. The Capella, Sentosa"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      className="w-full py-3.5 px-4 rounded-xl font-sans text-xs tracking-wider outline-none border transition-all bg-brand-bg border-brand-sage/15 focus:border-brand-sage text-brand-charcoal"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-widest text-brand-sage font-bold uppercase block">
                      APPROXIMATE BUDGET
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full py-3.5 px-4 rounded-xl font-sans text-xs tracking-wider outline-none border transition-all bg-brand-bg border-brand-sage/15 focus:border-brand-sage text-brand-charcoal"
                    >
                      <option value="$1,500 - $3,000">$1,500 - $3,000</option>
                      <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                      <option value="$5,000 - $8,000">$5,000 - $8,000</option>
                      <option value="$8,000 - $12,000">$8,000 - $12,000</option>
                      <option value="$12,000+">$12,000+ (Elite customized)</option>
                    </select>
                  </div>
                </div>

                {/* Guest Count Range slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <label className="font-mono text-[9px] tracking-widest text-brand-sage font-bold uppercase block">
                      ATTENDEE RANGE
                    </label>
                    <span className="font-mono text-xs text-brand-rose font-bold">
                      {guestCount} Guests
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="400"
                    step="5"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full h-1 bg-brand-sage/20 rounded-lg appearance-none cursor-pointer accent-brand-sage"
                  />
                </div>

                {/* Selected Services Checkbox Grid */}
                <div className="space-y-2">
                  <label className="font-mono text-[9px] tracking-widest text-brand-sage font-bold uppercase block">
                    REQUIRED CAPABILITIES
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {servicesList.map((srv) => (
                      <label
                        key={srv.id}
                        className={`py-2.5 px-3 rounded-lg border text-[10px] tracking-wide font-mono flex items-center space-x-2 cursor-pointer transition-all ${
                          selectedServices.includes(srv.id)
                            ? "bg-brand-sage-light border-brand-sage text-brand-sage font-semibold"
                            : "bg-brand-bg border-brand-sage/10 text-brand-charcoal/70 hover:bg-brand-sage-light"
                        }`}
                      >
                        <input
                          id={`service-${srv.id}`}
                          type="checkbox"
                          checked={selectedServices.includes(srv.id)}
                          onChange={() => handleServiceChange(srv.id)}
                          className="service-checkbox hidden"
                        />
                        <span>{srv.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Messages Box */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] tracking-widest text-brand-sage font-bold uppercase block">
                    EVENT DETAILS & MIXOLOGY REQUIREMENTS
                  </label>
                  <textarea
                    id="booking-message"
                    rows={4}
                    placeholder="Provide notes regarding theme design, preferred cocktail ingredients, custom branding needs, or schedule specifics..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl font-sans text-xs tracking-wider outline-none border resize-none transition-all bg-brand-bg border-brand-sage/15 focus:border-brand-sage text-brand-charcoal"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4.5 rounded-xl bg-brand-button hover:bg-brand-sage disabled:bg-brand-sage/40 text-white font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 shadow-sm flex items-center justify-center space-x-2.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "Generating Proposal & Opening WhatsApp..." : "SUBMIT PROPOSAL REQUEST & START CHAT"}</span>
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

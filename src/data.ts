import { ServiceItem, PackageItem } from "./types";

export const servicesData: ServiceItem[] = [
  {
    id: "wedding-cocktail-hour",
    title: "Wedding Cocktail Hour",
    tagline: "Sophisticated pre-reception mixology for your guests",
    description: "Our wedding cocktail hour package provides an elegant welcome for your guests. We coordinate closely with your floral designer and wedding planner to construct a custom-designed bar setup adorned with beautiful floral accents, serving refined botanical and effervescent signature cocktails.",
    features: [
      "Personalized couple's signature drink creations",
      "Elegantly themed sage and ivory bar counters",
      "Custom ice spheres frozen with organic edible flowers",
      "Flawless five-star pre-reception hospitality",
    ]
  },
  {
    id: "corporate-events",
    title: "Corporate Events",
    tagline: "Elevated brand hospitality & VIP networking galas",
    description: "Engineered for high-end product launches, media previews, and executive networking events in Singapore. We craft bespoke beverages aligned with your brand's color palette, operating with high-density efficiency while maintaining exquisite visual standards and formal corporate dress codes.",
    features: [
      "Brand-aligned cocktail coloring & curated flavor profiles",
      "Delicate bespoke fruit peel garnishes laser-etched with logos",
      "Highly experienced mixologists dressed in formal attire",
      "Efficient, high-speed luxury service suited for VIP crowds",
      "Seamless corporate billing, paperwork, and licensing",
    ]
  },
  {
    id: "wedding-reception",
    title: "Wedding Reception Bar",
    tagline: "Full-scale luxury beverage experiences for your banquet",
    description: "A complete, premium mobile bar installation dedicated to your main reception dinner. We manage high-volume premium drink delivery seamlessly, pacing our pours with your program milestones so you and your guests enjoy an uninterrupted, magical evening.",
    features: [
      "Uncapped service for premium curated cocktails & spirits",
      "Coordination with banquet managers and wedding planners",
      "Luxury back-lit mobile bars matching your venue's styling",
      "Full support for champagne toasts and wine service",
      "Dedicated VIP table service for the couple & family",
    ]
  },
  {
    id: "cocktail-catering",
    title: "Cocktail Catering",
    tagline: "Turn-key luxury mixology brought to any premium venue",
    description: "Our turn-key cocktail catering covers everything you need. We supply premium spirits, cold-pressed artisanal syrups, fresh organic garnishes, custom hand-cut ice cubes, crystal-clear highball and coupe glassware, and a gorgeous designer bar structure.",
    features: [
      "Premium turn-key spirit and hydration packages",
      "House-infused floral and botanical syrups",
      "Eco-friendly, visually stunning luxury straws & napkins",
      "Pre-event cocktail tasting session at our showroom",
      "Full event licensing, liability coverage, and cleanup",
    ]
  },
  {
    id: "dj-service",
    title: "DJ Service",
    tagline: "Curated soundscapes and live entertainment",
    description: "Elevate your event's atmosphere with our professional DJ service. We provide bespoke sonic experiences tailored to your crowd, complete with high-fidelity audio equipment and sophisticated aesthetic DJ booths that complement your venue's decor.",
    features: [
      "Bespoke music curation aligned with event flow",
      "High-fidelity professional audio equipment setup",
      "Visually appealing, minimalistic DJ booth design",
      "Experienced DJs handling diverse crowds smoothly",
      "Seamless coordination with event timelines",
    ]
  },
  {
    id: "staffing-hire",
    title: "Staffing Hire",
    tagline: "Premium hospitality professionals for your event",
    description: "Secure Singapore's finest hospitality artisans to ensure your event runs flawlessly. From experienced mixologists to attentive floor staff, our team delivers five-star service, immaculate presentation, and proactive guest management.",
    features: [
      "Five-star mixologists and service staff",
      "Polite, refined communication and guest handling",
      "Immaculate formal corporate dress codes",
      "Charming, fast-paced, and hygienic bar management",
      "Strict adherence to premium service standards",
    ]
  },
  {
    id: "event-planning",
    title: "Event Planning",
    tagline: "Comprehensive end-to-end luxury event coordination",
    description: "Beyond exquisite beverage curation, our master planners meticulously orchestrate every dimension of your luxury event. From conceptualizing the theme to executing flawless logistics, we ensure your vision becomes an unforgettable reality.",
    features: [
      "End-to-end luxury event conceptualization and theme design",
      "Vendor sourcing, contract negotiation, and coordination",
      "Precision-crafted event timelines and itinerary management",
      "On-site event direction and seamless flow orchestration",
      "VIP guest concierge and personalized hospitality management",
    ]
  }
];

export const packagesData: PackageItem[] = [
  {
    id: "epsom",
    title: "EPSOM",
    subtitle: "Bartender Only Service",
    tagline: "\"You provide the drinks — we bring the craft.\"",
    price: "$150 / 2 hours min",
    pricingDetails: [
      "2 Hours: $150",
      "3 Hours: $230",
      "4 Hours+: $60/hr"
    ],
    capacity: [
      "Up to 15 pax — drinks brought directly to guests",
      "20–30 pax — cocktail service",
      "40–50 pax — general drinks service",
      "61–100 pax — 2 bartenders recommended"
    ],
    includes: [
      "Licensed professional bartender",
      "Basic bar tools, shakers & jiggers",
      "Setup and teardown",
      "On-call support"
    ],
    surcharges: "Sentosa & Tuas: +$50"
  },
  {
    id: "luxe",
    title: "LUXE",
    subtitle: "Dry Hire + Mobile Bar",
    tagline: "\"Everything except alcohol, mixers & ice\"",
    price: "$380 / 2 hours min",
    pricingDetails: [
      "2 Hours: $380",
      "3 Hours: $450",
      "4 Hours+: $80/hr"
    ],
    includes: [
      "Signature 5ft styled bar cart",
      "Licensed professional bartender",
      "Bar tools, equipment & delivery",
      "Setup, teardown, on-call support"
    ],
    surcharges: "Services up to 40-50 pax per bartender | Sentosa & Tuas: +$50 | Custom signage on cart: +$50",
    extra: {
      title: "LUXE PLUS",
      description: "Includes custom pre-mixed cocktail/mocktail mixers & garnishes.",
      pricing: [
        "2 Hours: $520",
        "3 Hours: $620",
        "4 Hours+: $80/hr"
      ],
      includes: [
        "Custom pre-mixed cocktail mixers & mocktail bases",
        "Fresh garnishes, bar accessories, branded napkins & straws"
      ]
    }
  },
  {
    id: "belmont",
    title: "BELMONT",
    subtitle: "Full Wet Bar Service",
    tagline: "\"The complete WuBar experience. We provide everything.\"",
    price: "$750 / 3 hours, 40 pax",
    pricingDetails: [
      "3 Hours: From $750 (2 Hours, 4 Hours, and Extra Hours are custom quoted on request)."
    ],
    includes: [
      "Signature 5ft styled bar cart & licensed bartender(s)",
      "Custom cocktail menu consultation",
      "Alcohol (spirits, wine, beer), mixers, juices, sodas",
      "Ice, garnishes, appropriate glassware",
      "Branded napkins/straws, setup & full teardown",
      "Pre-event consultation & delivery"
    ],
    capacity: [
      "60–80 pax (+1 bartender)",
      "80–150 pax (+2 bartenders)"
    ],
    surcharges: "DJ Service Add-on: $50 | Sentosa/Tuas: +$30"
  }
];

export const additionalServices = [
  {
    title: "DJ Service",
    description: "Professional DJ for your event",
    price: "$300 / hr"
  },
  {
    title: "Bespoke Signature Cocktail",
    description: "A custom cocktail named for your event",
    price: "+$80"
  },
  {
    title: "Pre-Event Tasting Session",
    description: "1hr consultation at your location",
    price: "+$140"
  }
];

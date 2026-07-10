import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client on the server
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Server initialized with Gemini API Key");
  } else {
    console.warn("Warning: GEMINI_API_KEY not found in environment variables. Sommelier AI will run in luxurious offline preset mode.");
  }

  // API endpoint for AI Cocktail Sommelier
  app.post("/api/sommelier", async (req, res) => {
    try {
      const { prompt, eventDetails } = req.body;
      if (!ai) {
        // High-end offline fallback presets matching user details
        const theme = (eventDetails.theme || "").toLowerCase();
        const type = (eventDetails.eventType || "").toLowerCase();
        
        let menuName = "The Singapore Marina Collection";
        let description = "A carefully curated pairing reflecting premium craftsmanship, high-end spirits, and local botanical sophistication tailored to your private celebration.";
        let cocktails = [
          {
            name: "Orchid Velvet Elixir",
            ingredients: ["Sipsmith Gin", "Maison Ferrand Triple Sec", "Fresh Orchid Scented Syrup", "Clarified Lime Juice"],
            glass: "Fluted Crystal Coupe",
            profile: "Floral, Delicate, Silk",
            reason: "Designed as an homage to Singapore's elegance, matching a luxury event's botanical-forward and bespoke nature."
          },
          {
            name: "The Copper Smoked Old Fashioned",
            ingredients: ["Diplomático Reserva Rum", "Angostura Bitters", "Demerara Reduction", "Cold Oakwood Smoke infusion"],
            glass: "Ribbed Double Rocks Glass",
            profile: "Rich, Smokey, Velvety",
            reason: "An indulgent classic elevated with natural woodsmoke, echoing luxury sophistication and fine evening entertainment."
          }
        ];

        if (type.includes("wedding")) {
          menuName = "The Sentosa Imperial Union";
          description = "An exquisite dual selection designed to symbolize harmony. Combining delicate white floral notes with bold, celebratory spirits for an unforgettable evening.";
          cocktails[0].name = "Blossom & Gold";
          cocktails[1].name = "Elysian Sunset Highball";
        } else if (theme.includes("corporate") || type.includes("corporate")) {
          menuName = "The Skyline Executive Pairing";
          description = "Bold, neat, and highly precise profiles engineered for executive receptions and branding launches, representing premium Singaporean corporate standards.";
          cocktails[0].name = "The Copper Catalyst";
          cocktails[1].name = "Meridian Dry Martini";
        }

        return res.json({ menuName, description, cocktails });
      }

      const systemInstruction = `You are an elite, Michelin-star mixologist, luxury hospitality director, and beverage designer for "WU BAR SG", Singapore's premier luxury mobile bar company.
Your goal is to curate an ultra-premium, personalized 2-cocktail menu for a client's celebration based on their submitted event specifics.
Respond ONLY with a JSON object. Do NOT wrap it in any comments or preambles. Output raw JSON that fits the following schema exactly:
{
  "menuName": string, // A creative, sophisticated name for the bespoke menu, reflecting Singapore luxury
  "description": string, // A paragraph (3 sentences) written in a highly elegant, sensory, and narrative-driven tone explaining the concept and flavor story
  "cocktails": [
    {
      "name": string, // A creative custom luxury cocktail name
      "ingredients": string[], // 3-5 specific high-end ingredients (e.g. Sipsmith Gin, Mr Black, clarified juices)
      "glass": string, // Premium glassware (e.g. Vintage Crystal Coupe, Ribbed Highball)
      "profile": string, // Brief list of notes, e.g. "Effervescent, Botanical, Gold"
      "reason": string // A 2-sentence sensory explanation of why this cocktail perfectly elevates their specific event, referencing their venue or style
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Event Details: ${JSON.stringify(eventDetails)}\nClient custom notes: ${prompt || "Curate a bespoke high-end cocktail experience."}`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.8,
        }
      });

      const responseText = response.text || "{}";
      const cleaned = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      res.json(parsed);
    } catch (error: any) {
      console.error("Gemini Sommelier Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate custom menu" });
    }
  });

  // Booking in-memory persistent database to show interactive dashboard
  const inquiries: any[] = [
    {
      id: "1",
      name: "Audrey Khoo",
      email: "audrey.k@events-prestige.sg",
      phone: "+65 9182 4312",
      eventDate: "2026-09-18",
      venue: "The Capella Singapore, Sentosa",
      guestCount: 150,
      budget: "$5,000 - $8,000",
      message: "We are holding a sunset garden wedding on the Capella lawn. We would love the luxury custom cocktail bar with champagne setups.",
      selectedServices: ["Wedding Bar", "Luxury Mobile Bar"],
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      id: "2",
      name: "Erich von Brandt (Audemars Piguet)",
      email: "erich.v@ap-boutique.sg",
      phone: "+65 8743 2190",
      eventDate: "2026-10-12",
      venue: "National Gallery Singapore",
      guestCount: 100,
      budget: "$12,000+",
      message: "An exclusive watch launch event for our VVIP collectors. We need elegant custom molecular cocktail designs featuring gold leaf and copper brand engravings.",
      selectedServices: ["Corporate Bar", "Cocktail Catering", "Mobile Bartending"],
      timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
    }
  ];

  app.get("/api/bookings", (req, res) => {
    res.json(inquiries);
  });

  app.post("/api/bookings", (req, res) => {
    const { name, email, phone, eventDate, venue, guestCount, budget, message, selectedServices } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Missing required booking details." });
    }
    const newInquiry = {
      id: String(inquiries.length + 1),
      name,
      email,
      phone: phone || "Not specified",
      eventDate: eventDate || "TBD",
      venue: venue || "TBD",
      guestCount: Number(guestCount) || 50,
      budget: budget || "Not specified",
      message: message || "No additional requirements.",
      selectedServices: selectedServices || [],
      timestamp: new Date().toISOString()
    };
    inquiries.push(newInquiry);
    res.status(201).json({ success: true, inquiry: newInquiry });
  });

  // Vite middleware for development or Static Assets for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Production static files mounted from dist/");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Luxury fullstack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

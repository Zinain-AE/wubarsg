/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Cocktail {
  id: string;
  name: string;
  ingredients: string[];
  preparation: string[];
  taste: string[];
  glass: string;
  type: "classic" | "signature" | "mocktail";
  description: string;
  image: string;
  color?: string; // Hex or gradient for custom cards
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  tagline: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface BookingInquiry {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  venue: string;
  guestCount: number;
  budget: string;
  message: string;
  selectedServices: string[];
}


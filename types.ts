
/**
 * RAW DATA INTERFACE
 * ------------------
 * Represents the structure of data exactly as it comes from the database/API.
 * Field names use snake_case to match database columns.
 */
export interface RawSehriSpot {
  location_id: number;
  venue_name: string;
  primary_area: string;
  venue_type: string;
  food_type: string;
  timing?: {
    start?: string;
    end?: string;
    takeaway?: string;
    in_masjid?: string;
  };
  availability?: string;
  landmark?: string;
  locality?: string;
  features?: string[];
  phones?: string[];
  contact_persons?: string[];
  price?: string;
  notes?: string;
  target_audience?: string[];
  // New fields for Bangalore
  city?: string;
  zone?: string;
}

/**
 * Main data interface for a Sehri Distribution Spot.
 * Used across the application to display listing cards.
 */
export interface SehriSpot {
  /** Unique identifier for the spot (from database or raw data) */
  id: number;
  
  /** Display name of the venue (e.g., "Masjid-e-Noor") */
  name: string;
  
  /** Primary neighborhood or locality (e.g., "Adyar") */
  area: string;

  /** City Name */
  city: string;

  /** Zone (e.g. North, South, West) - Specific to Bangalore */
  zone?: string;
  
  /** Full address or landmark string for display and maps */
  address: string;
  
  /** Formatted string of distribution times (e.g., "03:00 - 04:00") */
  timing: string;
  
  /** Type of venue (Masjid, Hotel, Foundation, etc.) */
  venueType: string;
  
  /** Cost model: "Free" or "Paid" */
  foodType: "Free" | "Paid" | string;
  
  /** Specific groups this spot serves (e.g., "Bachelors", "Families") */
  targetAudience?: string[];
  
  /** Contact numbers for the venue */
  phones: string[];

  /** Primary Contact Person */
  contactPerson?: string;
  
  // UI Specific Fields
  
  /** Calculated distance from user (Placeholder: "X km") */
  distance: string;
  
  /** Whether the spot has been manually verified by admins */
  verified: boolean;
  
  /** Year of last verification */
  lastVerified: string;
  
  /** Combined string of notes, price, and availability */
  specialNotes: string;
  
  /** Array of feature tags */
  features: string[];
}

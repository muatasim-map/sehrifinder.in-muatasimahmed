
import { SehriSpot } from "./types";
import { CHENNAI_DATA } from "./data/chennai";
import { BANGALORE_DATA } from "./data/bangalore";
import { HYDERABAD_DATA } from "./data/hyderabad";
import { MUMBAI_DATA } from "./data/mumbai";

// Combine all datasets
const RAW_DATA = [...CHENNAI_DATA, ...BANGALORE_DATA, ...HYDERABAD_DATA, ...MUMBAI_DATA];

// List of Verified IDs (Only existing real IDs + Major Mosques)
const VERIFIED_IDS = [
  // Chennai Verified (Range 1-68)
  1, 2, 3, 5, 8, 9, 14, 20, 22, 24, 35, 40, 41, 42, 55, 60, 68,
  
  // Bangalore Verified (Range 3001-3115)
  3001, 3002, 3010, 3020, 3028, 3080,

  // Mumbai Verified (Range 4001-4011)
  4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008,

  // Hyderabad Verified (Range 5001-5013)
  5001, 5002, 5003, 5004, 5011
];

// Helper to format timing object to string
const formatTiming = (timing: any): string => {
  if (!timing) return "Contact for timing";
  if (timing.takeaway || timing.in_masjid) {
     const parts = [];
     if (timing.takeaway) parts.push(`Takeaway: ${timing.takeaway}`);
     if (timing.in_masjid) parts.push(`Masjid: ${timing.in_masjid}`);
     return parts.join(" | ");
  }
  if (timing.start && timing.end) return `${timing.start} - ${timing.end}`;
  if (timing.start) return `Starts ${timing.start}`;
  return "Contact for timing";
};

/**
 *  DATA TRANSFORMATION LAYER
 */
export const SAMPLE_DATA: SehriSpot[] = RAW_DATA.map(d => {
  // Normalize City Name
  let city = d.city || "Chennai";
  if (city === "Bengaluru") city = "Bangalore";

  // Construct Address
  const addressParts = [
    d.landmark,
    d.locality,
    d.primary_area,
    city !== "Chennai" ? city : null // Append city if not default
  ].filter(Boolean);

  return {
    id: d.location_id,
    name: d.venue_name,
    area: d.primary_area,
    city: city,
    zone: d.zone, // Only available for Bangalore
    address: addressParts.join(", "),
    timing: formatTiming(d.timing),
    venueType: d.venue_type || "Unknown",
    foodType: d.food_type || "Unknown",
    targetAudience: d.target_audience,
    phones: d.phones || [],
    contactPerson: d.contact_persons?.[0], // Take first contact person

    // Re-populated fields for UI request
    distance: "X km", 
    verified: VERIFIED_IDS.includes(d.location_id), 
    lastVerified: "2025",
    
    // Join various note fields into one string
    specialNotes: [
      d.notes, 
      d.availability ? `Availability: ${d.availability}` : '', 
      d.price ? `Price: ${d.price}` : ''
    ].filter(Boolean).join(". "),
    
    features: d.features || []
  };
});

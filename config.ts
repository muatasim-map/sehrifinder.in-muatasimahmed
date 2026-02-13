
export const APP_CONFIG = {
  // The WhatsApp number for the admin receiving reports
  ADMIN_PHONE: "919876543210",
  
  // Default city suffix for map searches
  DEFAULT_CITY: "Chennai",
  
  // Base URLs
  WHATSAPP_BASE_URL: "https://wa.me",
  MAPS_BASE_URL: "https://www.google.com/maps/search/?api=1&query=",
  
  // Message Templates
  MESSAGES: {
    REPORT_TEMPLATE: (name: string, area: string) => 
      `Assalamu Alaikum, I want to report an issue or update details for ${name}, ${area}.`,
    
    SHARE_TEMPLATE: (name: string, area: string, timing: string) => 
      `*Sehri Finder 2026 - Chennai*\n\nCheck out this Sehri spot:\n*${name}*\n📍 ${area}\n🕒 ${timing}\n\nView details: https://sehrifinder.com`
  }
};

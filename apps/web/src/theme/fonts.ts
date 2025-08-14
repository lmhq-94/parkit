// 🎨 FONT CONFIGURATION
// Change this single value to switch fonts across the entire app

export const APP_FONT = "Inter";

// Available font options:
// - "Outfit" - Ultra modern, geometric, unique (current)
// - "Clash Display" - Contemporary, elegant, premium
// - "General Sans" - Geometric, modern, distinctive
// - "Cabinet Grotesk" - Modern grotesk with personality
// - "Inter" - Digital-first, excellent readability
// - "Poppins" - Modern, friendly, professional
// - "League Spartan" - Unique, distinctive, premium

export const getFontFamily = (fontName: string = APP_FONT) => {
  return `"${fontName}", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif`;
}; 
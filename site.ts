export const site = {
  name: 'Ahtasham Sohail', brand: 'AHT Studio', role: 'AI Video Ad Creator',
  url: process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '', whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '',
  fiverr: process.env.NEXT_PUBLIC_FIVERR_URL || '', linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
  desc: 'Ahtasham Sohail is an AI video ad creator and the creator behind AHT Studio, specializing in cinematic product advertising, AI commercials, creative strategy and short-form video ads.',
};
export const services = [
  ['AI Product Commercials', 'Cinematic commercials that make physical products look desirable.'],
  ['AI UGC Ads', 'Natural, social-first ads in the style of user-made content.'],
  ['Social Media Advertising', 'Vertical ads built for Reels, TikTok and YouTube Shorts.'],
  ['Brand Commercials', 'Story-led films that give a brand a clear visual identity.'],
  ['Creative Ad Concepts', 'Hooks, scripts and visual direction before anything is generated.'],
];

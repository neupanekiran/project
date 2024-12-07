export const API_CONFIG = {
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  model: "gemini-1.5-pro",
  apiUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent",
  defaultPrompt: `You are an AI assistant specializing in tea-related information. Use the website provided to ensure the answers are accurate.`,
  websiteSource: "https://danfetea.com/",
};

export default API_CONFIG;
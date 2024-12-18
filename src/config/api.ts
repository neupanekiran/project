import { defaultPrompt } from '../prompts/danfetea';
export const API_CONFIG = {
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  model: "gemini-1.5-flash-latest",
  apiUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent",
  defaultPrompt: defaultPrompt,

};

export default API_CONFIG;
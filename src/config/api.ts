export const API_CONFIG = {
  apiKey: import.meta.env.AIzaSyBwnIhqYf63DvznaadSYoZOvFKcOPEWlPM || '', // Update with Gemini API key environment variable
  apiUrl: 'https://api.gemini.ai/v1/completions', // Replace with Gemini API URL
  model: 'gemini-1', // Replace with the correct Gemini model identifier
  defaultPrompt: `You are a helpful AI assistant. You will assist users with their questions and tasks in a professional and friendly manner.`
};

import { defaultPrompt } from '../prompts/danfetea';
const API_CONFIG = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  apiUrl: 'https://api.openai.com/v1/chat/completions',
  model: 'gpt-3.5-turbo',
  defaultPrompt: defaultPrompt , 
};
export default API_CONFIG; 

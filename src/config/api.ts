import { defaultPrompt } from '../prompts/danfetea';
const API_CONFIG = {
  apiKey: "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"
  apiUrl: 'https://api.openai.com/v1/chat/completions',
  model: 'gpt-3.5-turbo',
  defaultPrompt: defaultPrompt , 
};
export default API_CONFIG; 

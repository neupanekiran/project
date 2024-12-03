import { API_CONFIG } from '../config/api';
import type { Message } from '../types/chat';

export async function sendChatMessage(messages: Message[]) {
  const response = await fetch(API_CONFIG.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_CONFIG.apiKey}`,
    },
    body: JSON.stringify({
      model: API_CONFIG.model,
      messages: [
        { role: 'system', content: API_CONFIG.defaultPrompt },
        ...messages
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to get response');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
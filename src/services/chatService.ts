import API_CONFIG from '../config/api';
import type { Message } from '../types/chat';

function convertMessagesToChatGPTFormat(messages: Message[]) {
  return messages.map(msg => ({
    role: msg.role,
    content: msg.content,
  }));
}


export async function sendChatMessage(messages: Message[]) {
  const url = API_CONFIG.apiUrl;

  const chatGPTMessages = convertMessagesToChatGPTFormat([
    { role: 'system', content: API_CONFIG.defaultPrompt },
    ...messages
  ]);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.apiKey}`,
      },
      body: JSON.stringify({
        model: API_CONFIG.model,
        messages: chatGPTMessages,
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get response from ChatGPT API');
    }

    const data = await response.json();

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from ChatGPT API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    throw error;
  }
}

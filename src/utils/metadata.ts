import type { MetaData } from '../types/chat';

export async function fetchMetaData(url: string): Promise<MetaData> {
  try {
    // Replace this with your actual metadata service endpoint
    const response = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch metadata');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {};
  }
}
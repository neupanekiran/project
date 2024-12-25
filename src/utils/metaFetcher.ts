import type { MetaData } from '../types/metadata';

export async function fetchMetaData(url: string): Promise<MetaData> {
  try {
    // Use a proxy service to avoid CORS issues and fetch metadata
    const proxyUrl = `https://api.microlink.io?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch metadata');
    }

    const data = await response.json();
    
    return {
      imageUrl: data.data?.image?.url || data.data?.logo?.url,
      title: data.data?.title,
      description: data.data?.description
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {};
  }
}
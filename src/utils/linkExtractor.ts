export function extractLinksAndPrices(content: string) {
    const linkRegex = /https?:\/\/[^\s)]+/g;
    const priceRegex = /\$[0-9]+(\.[0-9]{2})?/g;
  
    const links = content.match(linkRegex) || [];
    const prices = content.match(priceRegex) || [];
  
    return { links, prices };
  }
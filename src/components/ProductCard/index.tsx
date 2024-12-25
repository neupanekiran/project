import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import QRCode from 'react-qr-code';
import type { MetaData } from '../../types/metadata';
import { fetchMetaData } from '../../utils/metaFetcher';

interface ProductCardProps {
  url: string;
  price?: string;
}

export function ProductCard({ url, price }: ProductCardProps) {
  const [metadata, setMetadata] = useState<MetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const data = await fetchMetaData(url);
        setMetadata(data);
      } catch (error) {
        console.error('Error loading metadata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMetadata();
  }, [url]);

  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 h-48 rounded-lg" />;
  }

  if (!metadata?.imageUrl) {
    return null;
  }

  return (
    <div className="my-4">
      <div className="flex gap-4 p-4 bg-white rounded-lg shadow-md">
        {/* Product Image */}
        <div className="relative w-48 h-48 flex-shrink-0">
          <img
            src={metadata.imageUrl}
            alt={metadata.title || 'Product image'}
            className="w-full h-full object-cover rounded-lg"
          />
          {price && (
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              <span className="font-semibold text-gray-900">{price}</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between flex-1 ">
          <div>
            <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
              {metadata.title || 'View Product Details'}
            </h3>
            {metadata.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {metadata.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <QRCode
              value={url}
              size={80}
              className="bg-white p-2 rounded-lg shadow-sm"
            />
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              View Product
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
// import { ArrowRight } from 'lucide-react';
import type { MetaData } from '../types/chat';

interface ProductPreviewProps {
  url: string;
  metadata: MetaData;
  price?: string;
}

export function ProductPreview({ url, metadata, price }: ProductPreviewProps) {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {metadata.imageUrl && (
        <div className="relative h-48 bg-gray-100">
          <img
            src={metadata.imageUrl}
            alt={metadata.title || 'Product preview'}
            className="w-full h-full object-cover"
          />
          {price && (
            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-sm">
              <span className="font-semibold text-gray-900">{price}</span>
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
          {metadata.title || 'Product Details'}
        </h3>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          {/* View Product */}
            {/* ArrowRight size={16}  */}
        </a>
      </div>
    </div>
  );
}
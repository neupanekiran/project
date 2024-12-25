import { ArrowRight } from 'lucide-react';

interface ProductDetailsProps {
  title: string;
  description?: string;
  url: string;
}

export function ProductDetails({ title, description, url }: ProductDetailsProps) {
  return (
    <div className="flex-1 min-w-0">
      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 ">
        {title}
      </h3>
      {description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>
      )}
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
  );
}
interface ProductImageProps {
    imageUrl: string;
    title: string;
    price?: string;
  }
  
  export function ProductImage({ imageUrl, title, price }: ProductImageProps) {
    return (
      <div className="relative w-48 h-48 flex-shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
        {price && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            <span className="font-semibold text-gray-900">{price}</span>
          </div>
        )}
      </div>
    );
  }
import QRCode from 'react-qr-code';

interface ProductQRProps {
  url: string;
}

export function ProductQR({ url }: ProductQRProps) {
  return (
    <div className="flex-shrink-0">
      <QRCode
        value={url}
        size={120}
        className="bg-white p-2 rounded-lg shadow-sm"
      />
    </div>
  );
}
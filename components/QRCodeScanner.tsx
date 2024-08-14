import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface QRCodeScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanFailure?: (errorMessage: string) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScanSuccess, onScanFailure }) => {
  const qrCodeRegionId = 'qr-reader';
  const html5QrCodeScannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    html5QrCodeScannerRef.current = new Html5QrcodeScanner(
      qrCodeRegionId,
      {
        fps: 30, 
        qrbox: { width: 250, height: 250 }, 
      },
      false
    );

    if (html5QrCodeScannerRef.current) {
      html5QrCodeScannerRef.current.render(
        (decodedText) => {
          onScanSuccess(decodedText);
        },
        (error) => {
          if (onScanFailure) {
            onScanFailure(error);
          }
        }
      );
    }

    return () => {
      if (html5QrCodeScannerRef.current) {
        html5QrCodeScannerRef.current.clear().catch((error) => {
          console.error('Failed to clear html5QrCodeScanner', error);
        });
      }
    };
  }, [onScanSuccess, onScanFailure]);

  return <div id={qrCodeRegionId} />;
};

export default QRCodeScanner;

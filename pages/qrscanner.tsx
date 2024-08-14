import { useState } from 'react';
import QRCodeScanner from '../components/QRCodeScanner';

const QRScannerPage: React.FC = () => {
  const [scannedContent, setScannedContent] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleScanSuccess = (decodedText: string) => {
    setScannedContent(decodedText);
    setErrorMessage(null);
  };

  const handleScanFailure = (error: string) => {
    console.warn(`QR Code Scan Failed: ${error}`);
    setErrorMessage('Failed to scan. Please try again.');
  };

  return (
    <div id="qr-scanner-container">
      <h1>QR Code Scanner</h1>
      <QRCodeScanner onScanSuccess={handleScanSuccess} onScanFailure={handleScanFailure} />
      {scannedContent && <p>Scanned content: {scannedContent}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default QRScannerPage;

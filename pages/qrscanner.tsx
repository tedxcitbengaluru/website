import { useState } from 'react';
import Html5QrcodePlugin from '../components/Html5QrcodePlugin';

const QRScannerPage: React.FC = () => {
    const [scannedContent, setScannedContent] = useState<string | null>(null);

    const handleScanSuccess = (decodedText: string, decodedResult: any) => {
        console.log("Scanned result:", decodedResult);
        setScannedContent(decodedText);
    };

    return (
        <div className="qrscanner-page">
            <h1>QR Code Scanner</h1>
            <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={handleScanSuccess}
            />
            {scannedContent && (
                <div className="scanned-results">
                    <h2>Scanned Content:</h2>
                    <p>{scannedContent}</p>
                </div>
            )}
        </div>
    );
};

export default QRScannerPage;
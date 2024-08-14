import { useState } from 'react';
import Html5QrcodePlugin from '../components/Html5QrcodePlugin';

const QRScannerPage: React.FC = () => {
    const [scannedContent, setScannedContent] = useState<string | null>(null);
    const [scanResult, setScanResult] = useState<'valid' | 'invalid' | null>(null); 

    const handleScanSuccess = (decodedText: string, decodedResult: any) => {
        console.log("Scanned result:", decodedResult);
        setScannedContent(decodedText);
    };

    const handleScanResult = (result: 'valid' | 'invalid') => {
        setScanResult(result);
    };

    return (
        <div className="qrscanner-page">
            <h1>QR Code Scanner</h1>
            <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={handleScanSuccess}
                setScanResult={handleScanResult} 
            />
            {scannedContent && (
                <div className="scanned-results">
                    <h2>Scanned Content:</h2>
                    <p>{scannedContent}</p>
                </div>
            )}
            {scanResult === 'valid' && (
                <div className="result-icon">
                    <span role="img" aria-label="tick">✔️</span>
                </div>
            )}
            {scanResult === 'invalid' && (
                <div className="result-icon">
                    <span role="img" aria-label="cross">❌</span>
                </div>
            )}
        </div>
    );
};

export default QRScannerPage;

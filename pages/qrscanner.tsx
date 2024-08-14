import { useState } from 'react';
import Html5QrcodePlugin from '../components/Html5QrcodePlugin';

const QRScannerPage: React.FC = () => {
    const [decodedResults, setDecodedResults] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleScanSuccess = (decodedText: string, decodedResult: any) => {
        console.log("Scanned result:", decodedResult);
        setDecodedResults((prev) => [...prev, decodedResult]);
        setErrorMessage(null);
    };

    const handleScanFailure = (errorMessage: string) => {
        console.warn(`QR Code Scan Failed: ${errorMessage}`);
        setErrorMessage('Failed to scan. Please try again.');
    };

    return (
        <div className="qrscanner-page">
            <h1>QR Code Scanner</h1>
            <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={handleScanSuccess}
                qrCodeErrorCallback={handleScanFailure}
            />
            {decodedResults.length > 0 && (
                <div className="scanned-results">
                    <h2>Scanned Content:</h2>
                    <ul>
                        {decodedResults.map((result, index) => (
                            <li key={index}>{result.decodedText}</li>
                        ))}
                    </ul>
                </div>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default QRScannerPage;

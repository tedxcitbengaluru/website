import { useState } from 'react';
import Html5QrcodePlugin from '../components/Html5QrcodePlugin';


const QRScannerPage: React.FC = () => {
    const [scannedContent, setScannedContent] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);

    const handleScanSuccess = async (decodedText: string, decodedResult: any) => {
        console.log("Scanned result:", decodedResult);
        setScannedContent(decodedText);

        try {
            const response = await fetch('/api/checkQrCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ qrCodeData: decodedText }),
            });
            const result = await response.json();

            if (response.ok) {
                setFeedback('success'); 
            } else {
                setFeedback('error'); 
            }
        } catch (error) {
            console.error('Error sending QR code data to API:', error);
            setFeedback('error'); 
        }
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
                    <div className="feedbackContainer">
                        {feedback === 'success' && <div className="tick">✓</div>}
                        {feedback === 'error' && <div className="error">✗</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QRScannerPage;

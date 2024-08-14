import { useState, useEffect } from 'react';
import Html5QrcodePlugin from '../components/Html5QrcodePlugin';

const QRScannerPage: React.FC = () => {
    const [scannedContent, setScannedContent] = useState<string | null>(null);
    const [scanResult, setScanResult] = useState<'valid' | 'invalid' | null>(null);
    const [validHashes, setValidHashes] = useState<string[]>([]);

    useEffect(() => {
        const fetchHashes = async () => {
            try {
                const response = await fetch('/api/checkQrCode'); 
                const result = await response.json();
                setValidHashes(result.hashes);
            } catch (error) {
                console.error('Error fetching hashes:', error);
            }
        };

        fetchHashes();
    }, []);

    const handleScanSuccess = async (decodedText: string, decodedResult: any) => {
        console.log("Scanned result:", decodedResult);
        setScannedContent(decodedText);

        if (validHashes.includes(decodedText)) {
            setScanResult('valid');
            try {
                const response = await fetch('/api/checkQrCode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ qrCodeData: decodedText }),
                });
                const result = await response.json();
                if (result.message === 'QR code found and updated.') {
                    setScanResult('valid');
                } else {
                    setScanResult('invalid');
                }
            } catch (error) {
                console.error('Error sending QR code data to API:', error);
                setScanResult('invalid');
            }
        } else {
            setScanResult('invalid');
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

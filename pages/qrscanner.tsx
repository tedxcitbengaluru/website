import { useState, useEffect } from 'react';
import Html5QrcodePlugin from '../components/Html5QrcodePlugin';

const QRScannerPage: React.FC = () => {
    const [scannedContent, setScannedContent] = useState<string | null>(null);
    const [scanResult, setScanResult] = useState<'valid' | 'invalid' | 'warning' | null>(null);
    const [validHashes, setValidHashes] = useState<string[]>([]);
    const [showScanner, setShowScanner] = useState(true);
    const [enteredPassword, setEnteredPassword] = useState('');
    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            setShowScanner(false);

            try {
                const response = await fetch('/api/checkQrCode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ qrCodeData: decodedText }),
                });
                const result = await response.json();

                if (result.alreadyScanned) {
                    setScanResult('warning');
                } else {
                    setScanResult('valid');
                }
            } catch (error) {
                console.error('Error sending QR code data to API:', error);
                setScanResult('invalid');
            }

            // Show the scanner again after a short delay
            setTimeout(() => {
                setScanResult(null);
                setShowScanner(true);
            }, 2000);
        } else {
            setScanResult('invalid');
            setShowScanner(false);
            setTimeout(() => {
                setScanResult(null);
                setShowScanner(true);
            }, 2000);
        }
    };

    const handleLogin = () => {
        const correctPassword = process.env.NEXT_PUBLIC_VIP_PASS;
        if (enteredPassword === correctPassword) {
            setAuthorized(true);
            setError(null); 
        } else {
            setError('Invalid password');
        }
    };

    return (
        <div className="qrscanner-page">
            {!authorized ? (
                <div className="login-box">
                    <h1 className="title">Admin Access</h1>
                    <div className="login-form">
                        <input
                            className="input-field"
                            type="password"
                            placeholder="Enter password"
                            value={enteredPassword}
                            onChange={(e) => setEnteredPassword(e.target.value)}
                        />
                        <button
                            className="login-button"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </div>
            ) : (
                <>
                    {showScanner && (
                        <>
                            <h1 className='ticket-scan-title'>Ticket Scanner</h1>
                            <Html5QrcodePlugin
                                fps={10}
                                qrbox={250}
                                disableFlip={false}
                                qrCodeSuccessCallback={handleScanSuccess}
                            />
                        </>
                    )}
                    {scanResult === 'valid' && !showScanner && (
                        <div className="result-message success">
                            <span>Success!</span>
                        </div>
                    )}
                    {scanResult === 'invalid' && !showScanner && (
                        <div className="result-message failure">
                            <span>Failed!</span>
                        </div>
                    )}
                    {scanResult === 'warning' && !showScanner && (
                        <div className="result-message warning">
                            <span>Warning: Already Scanned!</span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default QRScannerPage;

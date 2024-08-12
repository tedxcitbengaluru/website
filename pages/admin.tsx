import AdminDashboard from '../components/dashboard';
import React, { useState } from 'react';

const VIPPage: React.FC = () => {
    const [enteredPassword, setEnteredPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [authorized, setAuthorized] = useState(false);

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
        <div className="vip-page-container">
            <div className="login-box">
                {!authorized && (
                    <div><h1 className="title">VIP Access</h1>
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
                    </div>
                )}
                {error && <p className="error-message">{error}</p>}
                {authorized && <AdminDashboard />}
            </div>
        </div>
    );
};

export default VIPPage;

import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { verifyCaptcha } from "api/index";
import { useNavigate, state } from "react-router-dom";


const Sign = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!recaptchaToken) {
            alert("Please complete the reCAPTCHA.");
            return;
        }

        // Handle authentication logic here
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("reCAPTCHA Token:", recaptchaToken);
        
        try {
            await verifyCaptcha(recaptchaToken);    
            console.log('verified succesfully');
            navigate('/');
        } catch (error) {
            console.error('Error  recaptcha:', error);
        }
    };

    const handleRecaptchaChange = (token) => {
        setRecaptchaToken(token);
    };

    return (
        <div style={{ maxWidth: '300px', margin: 'auto', padding: '50px' }}>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label><br />
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        style={{ width: '100%', padding: '8px', marginTop: '8px' }} 
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password:</label><br />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        style={{ width: '100%', padding: '8px', marginTop: '8px' }} 
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <ReCAPTCHA
                        sitekey="6Ldjq04qAAAAALAd-XqWkWnaoGzTXOisi-QznINz" // Replace this with your site key from Google reCAPTCHA
                        onChange={handleRecaptchaChange}
                    />
                </div>

                <button type="submit" style={{ padding: '10px', width: '100%' }}>Sign In</button>
            </form>
        </div>
    );
};

export default Sign;

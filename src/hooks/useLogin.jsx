import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLoginForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    // Update form validity when any of the fields change
    useEffect(() => {
        setIsFormValid(
            email.trim() !== '' && password.trim() !== ''
        );
    }, [email, password]);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (isFormValid) {
            try {
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ firstName,lastName,email, password }),
                });
    
                if (!response.ok) {
                    throw new Error('Login failed');
                }
    
                const data = await response.json();
                console.log('Login successful:', data);
                localStorage.setItem('firstName', data.user.firstName);
                localStorage.setItem('lastName', data.user.lastName);
                navigate('/HomepageView');
            } catch (error) {
                setErrorMessage('Login failed: ' + error.message);
                console.error('Error during login:', error);
            }
        } else {
            setErrorMessage('Please fill in all fields');
        }
    };
    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogout = async () => {
        console.log('logout successful');
        localStorage.clear();
        // Optionally reset the email and password fields
        setEmail('');
        setPassword('');
        // Redirect the user to the login page
        navigate('/login');
    };
    return {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        toggleShowPassword,
        handleLogin,
        handleLogout,
        isFormValid,
        errorMessage,
    };
};

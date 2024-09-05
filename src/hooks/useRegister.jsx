// import { useState } from 'react';

// export const useRegisterForm = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleRegister = (e) => {
//     e.preventDefault();
//     console.log('First Name:', firstName);
//     console.log('Last Name:', lastName);
//     console.log('Email:', email);
//     console.log('Username:', username);
//     console.log('Password:', password);
//   };

//   const toggleShowPassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   return {
//     firstName,
//     setFirstName,
//     lastName,
//     setLastName,
//     email,
//     setEmail,
//     username,
//     setUsername,
//     password,
//     setPassword,
//     showPassword,
//     toggleShowPassword,
//     handleRegister,
//   };
// };
// import { useState, useEffect } from 'react';

// export const useRegisterForm = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isFormValid, setIsFormValid] = useState(false);

//   // Update form validity when any of the fields change
//   useEffect(() => {
//     setIsFormValid(
//       firstName.trim() !== '' &&
//       lastName.trim() !== '' &&
//       email.trim() !== '' &&
//       username.trim() !== '' &&
//       password.trim() !== ''
//     );
//   }, [firstName, lastName, email, username, password]);

//   const handleRegister = (e) => {
//     e.preventDefault();
//     console.log('First Name:', firstName);
//     console.log('Last Name:', lastName);
//     console.log('Email:', email);
//     console.log('Username:', username);
//     console.log('Password:', password);
//   };

//   const toggleShowPassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   return {
//     firstName,
//     setFirstName,
//     lastName,
//     setLastName,
//     email,
//     setEmail,
//     username,
//     setUsername,
//     password,
//     setPassword,
//     showPassword,
//     toggleShowPassword,
//     handleRegister,
//     isFormValid, // Return isFormValid to control the button state in the view
//   };
// };
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Regex for password validation: At least 8 characters, includes letters, numbers, and special characters
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const navigate = useNavigate();
  // Update form validity when any of the fields change
  useEffect(() => {
    // Check if the password meets the constraints
    if (password && !passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and include letters, numbers, and special characters.'
      );
    } else {
      setPasswordError('');
    }

    setIsFormValid(
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      email.trim() !== '' &&
      username.trim() !== '' &&
      password.trim() !== '' &&
      passwordRegex.test(password) // Ensure password meets constraints
    );
  }, [firstName, lastName, email, username, password]);

  const handleRegister = async (e) => {

    e.preventDefault();
    if (isFormValid) {
      console.log('First Name:', firstName);
      console.log('Last Name:', lastName);
      console.log('Email:', email);
      console.log('Username:', username);
      e.preventDefault();

      if (isFormValid) {
        try {
          const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              username,
              password,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            console.log('User registered successfully:', data);
                navigate('/login');
                
          } else {
            console.error('Registration failed:', data.message);
            // Handle registration failure (e.g., show error messages)
          }
        } catch (error) {
          console.error('An error occurred:', error);
          // Handle any unexpected errors
        }
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
    handleRegister,
    isFormValid,
    passwordError, // Return password error message if password doesn't meet the constraints
  };
};

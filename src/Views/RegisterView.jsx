// import React from 'react';
// import BackgroundImage from '../assets/Img.jpg';
// import ShowPasswordIcon from '../assets/show-password-icon.svg'; 
// import HidePasswordIcon from '../assets/hide-password-icon.svg'; 
// import '../styles/styles.css';
// import { Link } from 'react-router-dom'; 

// const RegisterView = ({
//   firstName,
//   setFirstName,
//   lastName,
//   setLastName,
//   email,
//   setEmail,
//   username,
//   setUsername,
//   password,
//   setPassword,
//   showPassword,
//   toggleShowPassword,
//   handleRegister
// }) => {
//   return (
//     <div className="register-container">
//       {/* Left side - Background Image */}
//       <div
//         className="left-section"
//         style={{ backgroundImage: `url(${BackgroundImage})` }}
//       >
//       </div>

//       {/* Right side - Sign Up Form */}
//       <div className="right-section">
//         <div className="form-containerRegister">
//           <div className='titleContainer'>
//             <h2 className="form-title">Create an account</h2>
//             <h2 className="form-subtitle">Sign up now to claim your free space.</h2>
//           </div>
//           <form className="space-y-4" onSubmit={handleRegister}>
//             <div className='inputContainerFirstAndLast'>
//               <div>
//                 <div>
//                   <label htmlFor='first' className="form-label">First Name</label>
//                   <label className="necessary"> *</label>
//                 </div>
//                 <input
//                   id='first'
//                   type="text"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   required
//                   className="form-input"
//                 />
//               </div>

//               <div>
//                 <div>
//                   <label htmlFor="last" className="form-label">Last Name</label>
//                   <label className="necessary"> *</label>
//                 </div>
//                 <input
//                   id='last'
//                   type="text"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   required
//                   className="form-input"
//                 />
//               </div>
//             </div>

//             <div className='inputContainer'>
//               <div>
//                 <label className="form-label">Email</label>
//                 <label className="necessary"> *</label>
//               </div>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="form-input"
//               />
//             </div>

//             <div className='inputContainer'>
//               <div>
//                 <label className="form-label">Username</label>
//                 <label className="necessary"> *</label>
//               </div>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//                 className="form-input"
//               />
//             </div>

//             <div className='inputContainer'>
//               <div>
//                 <label className="form-label">Password</label>
//                 <label className="necessary"> *</label>
//               </div>
//               <div className="input-wrapper">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="form-input"
//                 />
//                 <button
//                   type="button"
//                   className="show-password-button"
//                   onClick={toggleShowPassword}
//                 >
//                   <img
//                     src={showPassword ? HidePasswordIcon : ShowPasswordIcon}
//                     alt="Show/Hide Password"
//                   />
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="form-button"
//             >
//               Signup
//             </button>
//           </form>
//           <p className="form-text">
//             Already have an account? <Link to="/login" className="form-link">Login</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterView;
// import React from 'react';
// import BackgroundImage from '../assets/Img.jpg';
// import ShowPasswordIcon from '../assets/show-password-icon.svg'; 
// import HidePasswordIcon from '../assets/hide-password-icon.svg'; 
// import '../styles/styles.css';
// import { Link } from 'react-router-dom'; 

// const RegisterView = ({
//   firstName,
//   setFirstName,
//   lastName,
//   setLastName,
//   email,
//   setEmail,
//   username,
//   setUsername,
//   password,
//   setPassword,
//   showPassword,
//   toggleShowPassword,
//   handleRegister,
//   isFormValid,  // Add the isFormValid prop to control the button state
// }) => {
//   return (
//     <div className="register-container">
//       {/* Left side - Background Image */}
//       <div
//         className="left-section"
//         style={{ backgroundImage: `url(${BackgroundImage})` }}
//       >
//       </div>

//       {/* Right side - Sign Up Form */}
//       <div className="right-section">
//         <div className="form-containerRegister">
//           <div className='titleContainer'>
//             <h2 className="form-title">Create an account</h2>
//             <h2 className="form-subtitle">Sign up now to claim your free space.</h2>
//           </div>
//           <form className="space-y-4" onSubmit={handleRegister}>
//             <div className='inputContainerFirstAndLast'>
//               <div>
//                 <div>
//                   <label htmlFor='first' className="form-label">First Name</label>
//                   <label className="necessary"> *</label>
//                 </div>
//                 <input
//                   id='first'
//                   type="text"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   required
//                   className="form-input"
//                 />
//               </div>

//               <div>
//                 <div>
//                   <label htmlFor="last" className="form-label">Last Name</label>
//                   <label className="necessary"> *</label>
//                 </div>
//                 <input
//                   id='last'
//                   type="text"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   required
//                   className="form-input"
//                 />
//               </div>
//             </div>

//             <div className='inputContainer'>
//               <div>
//                 <label className="form-label">Email</label>
//                 <label className="necessary"> *</label>
//               </div>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="form-input"
//               />
//             </div>

//             <div className='inputContainer'>
//               <div>
//                 <label className="form-label">Username</label>
//                 <label className="necessary"> *</label>
//               </div>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//                 className="form-input"
//               />
//             </div>

//             <div className='inputContainer'>
//               <div>
//                 <label className="form-label">Password</label>
//                 <label className="necessary"> *</label>
//               </div>
//               <div className="input-wrapper">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="form-input"
//                 />
//                 <button
//                   type="button"
//                   className="show-password-button"
//                   onClick={toggleShowPassword}
//                 >
//                   <img
//                     src={showPassword ? HidePasswordIcon : ShowPasswordIcon}
//                     alt="Show/Hide Password"
//                   />
//                 </button>
//               </div>
//             </div>

//             {/* Disable the button if the form is not valid */}
//             <button
//               type="submit"
//               className="form-button"
//               disabled={!isFormValid} // Button is disabled based on form validation
//             >
//               Signup
//             </button>
//           </form>
//           <p className="form-text">
//             Already have an account? <Link to="/login" className="form-link">Login</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterView;
import React from 'react';
import BackgroundImage from '../assets/Img.jpg';
import ShowPasswordIcon from '../assets/show-password-icon.svg'; 
import HidePasswordIcon from '../assets/hide-password-icon.svg'; 
import '../styles/styles.css';
import { Link } from 'react-router-dom';

const RegisterView = ({
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
  passwordError, // Add the passwordError prop
}) => {
  return (
    <div className="register-container">
      {/* Left side - Background Image */}
      <div
        className="left-section"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
      </div>

      {/* Right side - Sign Up Form */}
      <div className="right-section">
        <div className="form-containerRegister">
          <div className='titleContainer'>
            <h2 className="form-title">Create an account</h2>
            <h2 className="form-subtitle">Sign up now to claim your free space.</h2>
          </div>
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className='inputContainerFirstAndLast'>
              <div>
                <div>
                  <label htmlFor='first' className="form-label">First Name</label>
                  <label className="necessary"> *</label>
                </div>
                <input
                  id='first'
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              <div>
                <div>
                  <label htmlFor="last" className="form-label">Last Name</label>
                  <label className="necessary"> *</label>
                </div>
                <input
                  id='last'
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className='inputContainer'>
              <div>
                <label className="form-label">Email</label>
                <label className="necessary"> *</label>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className='inputContainer'>
              <div>
                <label className="form-label">Username</label>
                <label className="necessary"> *</label>
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className='inputContainer'>
              <div>
                <label className="form-label">Password</label>
                <label className="necessary"> *</label>
              </div>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  className="show-password-button"
                  onClick={toggleShowPassword}
                >
                  <img
                    src={showPassword ? HidePasswordIcon : ShowPasswordIcon}
                    alt="Show/Hide Password"
                  />
                </button>
              </div>
              {/* Display password error if there's an issue */}
              {passwordError && <p className="password-error">{passwordError}</p>}
            </div>

            {/* Disable the button if the form is not valid */}
            <button
              type="submit"
              className="form-button"
              disabled={!isFormValid} // Button is disabled based on form validation
            >
              Signup
            </button>
          </form>
          <p className="form-text">
            Already have an account? <Link to="/login" className="form-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;

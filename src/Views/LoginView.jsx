// import React from 'react';
// import BackgroundImage from '../assets/Img.jpg';
// import CheckIcon from '../assets/check-icon.svg'; 
// import ShowPasswordIcon from '../assets/show-password-icon.svg'; 
// import HidePasswordIcon from '../assets/hide-password-icon.svg'; 
// import '../styles/styles.css';
// import { Link } from 'react-router-dom'; 

// const LoginView = ({
//   email,
//   setEmail,
//   password,
//   setPassword,
//   rememberMe,
//   handleRememberMeChange,
//   showPassword,
//   toggleShowPassword,
//   handleLogin,
//   isFormValid,
// }) => {
//   return (
//     <div className="login-container">
//       <div
//         className="left-section"
//         style={{ backgroundImage: `url(${BackgroundImage})` }}
//       >
//       </div>

//       <div className="right-section">
//         <div className="form-containerLogin">
//           <div className='titleContainer'>
//             <h2 className="form-title">Log in to your account</h2>
//             <h2 className="form-subtitle">Hello again! Log in and get productive.</h2>
//           </div>
//           <form className="space-y-4" onSubmit={handleLogin}>
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
//                 <label className="form-label">Password</label>
//                 <label className='necessary'> *</label>
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
//             <div className='remember'>
//               <label className="checkbox-container">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={handleRememberMeChange}
//                 />
//                 <span className={`custom-checkbox ${rememberMe ? 'checked' : ''}`}>
//                   {rememberMe && <img src={CheckIcon} alt="Checked" />}
//                 </span>
//                 <p className='rememberText'>Remember me</p>
//               </label>
//             </div>
//             <button
//               type="submit"
//               className="form-button"
//               disabled={!isFormValid} 
//             >
//               Log in
//             </button>
//           </form>
//           <div className='idkkkk'>
//             <p className="form-text">
//               Don't have an account? <Link to="/register" className="form-link">Signup</Link>
//             </p>
//             <a href="" className="form-link">Forgot password?</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginView;
import React from 'react';
import BackgroundImage from '../assets/Img.jpg';
import CheckIcon from '../assets/check-icon.svg'; 
import ShowPasswordIcon from '../assets/show-password-icon.svg'; 
import HidePasswordIcon from '../assets/hide-password-icon.svg'; 
import '../styles/styles.css';
import { Link } from 'react-router-dom'; 
import { useLoginForm } from '../hooks/useLogin.jsx';  // Import your custom hook

const LoginView = () => {
  // Call the useLoginForm hook to access the form logic
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    handleRememberMeChange,
    showPassword,
    toggleShowPassword,
    handleLogin,
    isFormValid,
  } = useLoginForm(); // Extracting state and functions from your hook

  return (
    <div className="login-container">
      <div
        className="left-section"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
      </div>

      <div className="right-section">
        <div className="form-containerLogin">
          <div className='titleContainer'>
            <h2 className="form-title">Log in to your account</h2>
            <h2 className="form-subtitle">Hello again! Log in and get productive.</h2>
          </div>
          <form className="space-y-4" onSubmit={handleLogin}>
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
                <label className="form-label">Password</label>
                <label className='necessary'> *</label>
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
            </div>
            <div className='remember'>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <span className={`custom-checkbox ${rememberMe ? 'checked' : ''}`}>
                  {rememberMe && <img src={CheckIcon} alt="Checked" />}
                </span>
                <p className='rememberText'>Remember me</p>
              </label>
            </div>
            <button
              type="submit"
              className="form-button"
              disabled={!isFormValid} 
            >
              Log in
            </button>
          </form>
          <div className='idkkkk'>
            <p className="form-text">
              Don't have an account? <Link to="/register" className="form-link">Signup</Link>
            </p>
            <a href="" className="form-link">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchContext } from '../Context/UserContext';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

export default function LogIn() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserData } = useContext(searchContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      
      if (!savedUser) {
        setError("No user found. Please register first.");
        return;
      }

      if (
        (userName === savedUser.email || userName === savedUser.name) &&
        password === savedUser.password
      ) {
        setUserData(savedUser);
        navigate('/profile');
      } else {
        setError("Invalid username/email or password.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='login-card'>
          <div className='login-header'>
            <h1>Welcome Back</h1>
            <p>Please enter your credentials to login</p>
          </div>

          {error && <div className='error-message'>{error}</div>}

          <form onSubmit={handleLogin}>
            <div className='input-group'>
              <label htmlFor="username">
                <FaUser className="input-icon" />
                Username or Email
              </label>
              <input
                type="text"
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='Enter your username or email'
                required
              />
            </div>

            <div className='input-group'>
              <label htmlFor="password">
                <FaLock className="input-icon" />
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                required
              />
            </div>

            <div className='login-options'>
              <div className='remember-me'>
                <input type="checkbox" id="keepLoggedIn" />
                <label htmlFor="keepLoggedIn">Remember me</label>
              </div>
              <a href="#" className='forgot-password'>Forgot password?</a>
            </div>

            <button type="submit" className='login-button' disabled={isLoading}>
              {isLoading ? 'Logging in...' : (
                <>
                  <FaSignInAlt className="button-icon" />
                  LOGIN
                </>
              )}
            </button>
          </form>

          <div className='register-link'>
            Don't have an account? <a href="/signup">Register here</a>
          </div>
        </div>
      </div>
    </div>
  );
}
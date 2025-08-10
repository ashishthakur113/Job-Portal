import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { searchContext } from '../Context/UserContext';
import { FaUser, FaEnvelope, FaLock, FaUniversity, FaBook, FaPhone, FaVenusMars, FaCalendarAlt, FaBriefcase, FaCity } from 'react-icons/fa';

export default function SignUp() {
  const { setUserData } = useContext(searchContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    collegeName: '',
    courseName: '',
    mobile: '',
    gender: '',
    dateofBirth: '',
    workStatus: '',
    city: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = () => {
    const isEmpty = Object.values(formData).some(value => value.trim() === '');
    if (isEmpty) {
      setError('⚠️ Please fill out all the fields!');
      return;
    }
    localStorage.setItem("user", JSON.stringify(formData));
    setUserData(formData);
    navigate('/profile');
  };

  return (
    <div className='signup-container'>
      <div className='signup-card'>
        <div className='signup-header'>
          <h1>Create Your Account</h1>
          <p>Already have an account? <Link to='/logIn' className='login-link'>Login here</Link></p>
        </div>

        {error && <div className='error-message'>{error}</div>}

        <div className='signup-form'>
          <div className='form-group'>
            <label htmlFor="name"><FaUser className="input-icon" /> Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              onChange={handleChange} 
              placeholder="Enter your full name" 
            />
          </div>

          <div className='form-group'>
            <label htmlFor="email"><FaEnvelope className="input-icon" /> Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              onChange={handleChange} 
              placeholder="Enter your email" 
            />
          </div>

          <div className='form-group'>
            <label htmlFor="password"><FaLock className="input-icon" /> Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              onChange={handleChange} 
              placeholder="Create a password" 
            />
          </div>

          <div className='form-group'>
            <label htmlFor="collegeName"><FaUniversity className="input-icon" /> College Name</label>
            <input 
              type="text" 
              id="collegeName" 
              name="collegeName" 
              onChange={handleChange} 
              placeholder="Enter your college name" 
            />
          </div>

          <div className='form-group'>
            <label htmlFor="courseName"><FaBook className="input-icon" /> Course Name</label>
            <input 
              type="text" 
              id="courseName" 
              name="courseName" 
              onChange={handleChange} 
              placeholder="Enter your course" 
            />
          </div>

          <div className='form-group'>
            <label htmlFor="mobile"><FaPhone className="input-icon" /> Mobile Number</label>
            <input 
              type="tel" 
              id="mobile" 
              name="mobile" 
              onChange={handleChange} 
              placeholder="Enter your mobile number" 
            />
          </div>

          <div className='form-group'>
            <label htmlFor="gender"><FaVenusMars className="input-icon" /> Gender</label>
            <select 
              id="gender" 
              name="gender" 
              onChange={handleChange} 
              value={formData.gender}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
             
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor="dateofBirth"><FaCalendarAlt className="input-icon" /> Date of Birth</label>
            <input 
              type="date" 
              id="dateofBirth" 
              name="dateofBirth" 
              onChange={handleChange} 
            />
          </div>

          <div className='form-group'>
            <label htmlFor="workStatus"><FaBriefcase className="input-icon" /> Work Status</label>
            <select 
              id="workStatus" 
              name="workStatus" 
              onChange={handleChange} 
              value={formData.workStatus}
            >
              <option value="">Select Work Status</option>
              <option value="Student">Student</option>
              <option value="Fresher">Fresher</option>
              <option value="Experienced">Experienced</option>
              <option value="Working Professional">Working Professional</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor="city"><FaCity className="input-icon" /> City</label>
            <input 
              type="text" 
              id="city" 
              name="city" 
              onChange={handleChange} 
              placeholder="Enter your city" 
            />
          </div>

          <button className='signup-button' onClick={handleSubmit}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
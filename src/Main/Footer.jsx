import React from 'react'
import { FaUserTie, FaFacebook, FaTwitter, FaInstagram, FaRegCopyright } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer1'>
        <div className='logo-section'>
          <h1><FaUserTie className='logo-icon' /> SkillHire</h1><br />
          <div>
            <FaFacebook className='footer-icon first' />
            <BsInstagram className='footer-icon second' />
            <FaTwitter className='footer-icon third' />
          </div>
        </div>
        <ul>
          <Link to={'/about'} className='footer-about'><li>About Us</li></Link>
          <li>Careers</li>
        </ul>
        <ul>
          <li>Help center</li>
          <li>Report issue</li>
        </ul>
        <ul>
          <li>Privacy policy</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
      <div className='footer2'>
        <h4><FaRegCopyright className='rightsicon' /> All Rights Reserved</h4>
        <h6>Developed by Ashish Tomar</h6>
      </div>
    </div>
  );
}

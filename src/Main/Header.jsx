import React, { useState , useContext } from 'react';
import './main.css';
import { NavLink ,Link} from 'react-router-dom';
import { FaUserTie } from "react-icons/fa";
import { searchContext } from '../Context/UserContext';
import { FaUserCircle } from "react-icons/fa";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
    const { userData } = useContext(searchContext);
  

  return (
    <div className="nav">
      <nav className="header">
       <h1 className='logo' ><FaUserTie className='logo-icon'/>  <Link to={'/'} className='logotext'>SkillHire</Link></h1>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
        <ul className={`nav-items ${menuOpen ? 'open' : ''}`}>
          <li><NavLink to='/' className='nav-link' onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to='/browserjob' className='nav-link' onClick={() => setMenuOpen(false)}>Browse Jobs</NavLink></li>
          <li><NavLink to='/about' className='nav-link' onClick={() => setMenuOpen(false)}>About Us</NavLink></li>
          {userData ? (
            <Link to={'/profile'} className='nav-link '><FaUserCircle size={'25px'} color='black'/></Link>
          ): <Link to={'/signUp'} className='nav-link'>SIGN IN</Link>
          }
        </ul>
      </nav>
     
    </div>
  );
}
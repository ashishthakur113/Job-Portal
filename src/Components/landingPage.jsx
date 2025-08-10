import { Link } from 'react-router-dom';
import img2 from '../assets/img2.webp';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.webp';
import img6 from '../assets/img6.png';
import './Components.css';

export default function LandingPage() {
  return (
    <div className='landingpage'>
      <div className='content'>
        <h1 className='main-heading'>
          Find Your Dream Job<br />
          With Your Interest and Skills
        </h1>
        <p className='subtext'>
          Over <span className='highlight'>10,000+</span> candidates have landed their dream jobs<br />
          through us! Connect with top employers and take the next step in your career.
        </p>
        <div className="landing-buttons">
  <Link to="/browserjob" className="landing-btn btn1">Browse Jobs</Link>
  <Link to="/uploadjob" className="landing-btn btn2">Upload Job</Link>
</div>

      </div>

      <div className="logo-container">
        <div className="logo-slider">
          <img src={img2} alt="company-logo" />
          <img src={img3} alt="company-logo" />
          <img src={img4} alt="company-logo" />
          <img src={img5} alt="company-logo" />
          <img src={img6} alt="company-logo" />
        </div>
      </div>
    </div>
  );
}

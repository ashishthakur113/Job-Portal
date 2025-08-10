import React, { useContext, useState, useEffect } from 'react';
import { searchContext } from '../Context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaGraduationCap, FaCalendarAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn, MdWork } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

export default function UserProfile() {
  const { userData, logout, updateUserProfile } = useContext(searchContext);
  const navigate = useNavigate();

  // formData contains only editable fields (mirrors userData.profile)
  const [formData, setFormData] = useState({
    skills: '',
    projects: '',
    description: '',
    linkedin: '',
    github: '',
    experience: []
  });

  const [activeSection, setActiveSection] = useState(null); // which section is open
  const [isSaving, setIsSaving] = useState(false);

  // sync formData from userData.profile whenever userData changes (after save)
  useEffect(() => {
    if (userData?.profile) {
      setFormData({
        skills: userData.profile.skills || '',
        projects: userData.profile.projects || '',
        description: userData.profile.description || '',
        linkedin: userData.profile.linkedin || '',
        github: userData.profile.github || '',
        experience: userData.profile.experience || []
      });
    }
  }, [userData]);

  if (!userData) {
    return (
      <div className="profile-container-wrapper">
        <Link to="/signUp" className="sign-in-link"><p>SIGN IN</p></Link>
      </div>
    );
  }

  // ---- basic fields from userData (kept same names as your original) ----
  const { name, email, mobile, city, collegeName, courseName, gender, dateofBirth, workStatus } = userData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (sectionName) => {
    setActiveSection(sectionName);
  };

  const handleCancelEdit = () => {
    // revert local changes to last saved profile
    if (userData?.profile) {
      setFormData({
        skills: userData.profile.skills || '',
        projects: userData.profile.projects || '',
        description: userData.profile.description || '',
        linkedin: userData.profile.linkedin || '',
        github: userData.profile.github || '',
        experience: userData.profile.experience || []
      });
    }
    setActiveSection(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      
      await updateUserProfile(formData);
   
      setActiveSection(null);
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/signUp');
  };

  const sections = [
    {
      key: 'profile',
      title: 'Profile Summary',
      view: (
        <p className="profile-summary">
          {formData.description || "No profile summary provided yet. Click 'Edit Profile' to add one."}
        </p>
      ),
      edit: (
        <form onSubmit={handleSubmit} className="edit-form">
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a professional summary about yourself..."
          />
          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={isSaving}>
              {isSaving ? 'Saving...' : <><FaSave /> Save</>}
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancelEdit} disabled={isSaving}>
              <FaTimes /> Cancel
            </button>
          </div>
        </form>
      )
    },
    {
      key: 'contact',
      title: 'Contact Information',
      view: (
        <>
          <div className="info-group"><MdEmail className="icon-small" /><p className="info-content">{email}</p></div>
          <div className="info-group"><MdPhone className="icon-small" /><p className="info-content">{mobile}</p></div>
          {formData.linkedin && <div className="info-group"><AiFillLinkedin className="icon-small" /><a href={formData.linkedin.startsWith('http') ? formData.linkedin : `https://${formData.linkedin}`} target="_blank" rel="noopener noreferrer" className="info-content">{formData.linkedin}</a></div>}
          {formData.github && <div className="info-group"><AiFillGithub className="icon-small" /><a href={formData.github.startsWith('http') ? formData.github : `https://${formData.github}`} target="_blank" rel="noopener noreferrer" className="info-content">{formData.github}</a></div>}
        </>
      ),
      edit: (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group"><label><MdEmail className="icon-small" /> Email</label><input type="email" value={email} readOnly className="read-only-input" /></div>
          <div className="form-group"><label><MdPhone className="icon-small" /> Phone</label><input type="tel" value={mobile} readOnly className="read-only-input" /></div>
          <div className="form-group"><label><AiFillLinkedin className="icon-small" /> LinkedIn</label><input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="Your LinkedIn profile URL" /></div>
          <div className="form-group"><label><AiFillGithub className="icon-small" /> GitHub</label><input name="github" value={formData.github} onChange={handleChange} placeholder="Your GitHub profile URL" /></div>
          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={isSaving}>{isSaving ? 'Saving...' : <><FaSave /> Save</>}</button>
            <button type="button" className="cancel-btn" onClick={handleCancelEdit} disabled={isSaving}><FaTimes /> Cancel</button>
          </div>
        </form>
      )
    },
    {
      key: 'education',
      title: 'Education',
      view: (
        <div className="info-group">
          <FaGraduationCap className="icon-small" />
          <div>
            <p className="info-label">{collegeName}</p>
            <p className="info-content">{courseName}</p>
          </div>
        </div>
      ),
      edit: (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group"><label><FaGraduationCap className="icon-small" /> Institution</label><input type="text" value={collegeName} readOnly className="read-only-input" /></div>
          <div className="form-group"><label><FaGraduationCap className="icon-small" /> Degree</label><input type="text" value={courseName} readOnly className="read-only-input" /></div>
          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={isSaving}>{isSaving ? 'Saving...' : <><FaSave /> Save</>}</button>
            <button type="button" className="cancel-btn" onClick={handleCancelEdit} disabled={isSaving}><FaTimes /> Cancel</button>
          </div>
        </form>
      )
    },
    {
      key: 'skills',
      title: 'Skills',
      view: (
        <div className="skills-container">
          {formData.skills ? formData.skills.split(',').map((skill, index) => (<span key={index} className="skill-tag">{skill.trim()}</span>)) : <p className="empty-message">No skills added yet. Click edit to add your skills.</p>}
        </div>
      ),
      edit: (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group"><label>Your Skills (comma separated)</label><textarea name="skills" value={formData.skills} onChange={handleChange} rows="3" placeholder="e.g. JavaScript, React, Node.js" /></div>
          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={isSaving}>{isSaving ? 'Saving...' : <><FaSave /> Save</>}</button>
            <button type="button" className="cancel-btn" onClick={handleCancelEdit} disabled={isSaving}><FaTimes /> Cancel</button>
          </div>
        </form>
      )
    },
    {
      key: 'projects',
      title: 'Projects',
      view: (
        formData.projects ? <ul className="projects-list">{formData.projects.split('\n').map((project, i) => project.trim() && <li key={i}>{project.trim()}</li>)}</ul> : <p className="empty-message">No projects added yet. Click edit to add your projects.</p>
      ),
      edit: (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group"><label>Your Projects (one per line)</label><textarea name="projects" value={formData.projects} onChange={handleChange} rows="5" placeholder="Project 1\nProject 2" /></div>
          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={isSaving}>{isSaving ? 'Saving...' : <><FaSave /> Save</>}</button>
            <button type="button" className="cancel-btn" onClick={handleCancelEdit} disabled={isSaving}><FaTimes /> Cancel</button>
          </div>
        </form>
      )
    },
    {
      key: 'personal',
      title: 'Personal Information',
      view: (
        <>
          <div className="info-group"><IoPerson className="icon-small" /><p className="info-content">{gender}</p></div>
          <div className="info-group"><FaCalendarAlt className="icon-small" /><p className="info-content">{dateofBirth}</p></div>
        </>
      ),
      edit: (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group"><label><IoPerson className="icon-small" /> Gender</label><input type="text" value={gender} readOnly className="read-only-input" /></div>
          <div className="form-group"><label><FaCalendarAlt className="icon-small" /> Date of Birth</label><input type="text" value={dateofBirth} readOnly className="read-only-input" /></div>
          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={isSaving}>{isSaving ? 'Saving...' : <><FaSave /> Save</>}</button>
            <button type="button" className="cancel-btn" onClick={handleCancelEdit} disabled={isSaving}><FaTimes /> Cancel</button>
          </div>
        </form>
      )
    }
  ];

  return (
    <div className="profile-container-wrapper">
      <div className="profile-card main-profile">
        <div className="profile-header-section">
          <div className="profile-photo-section"><FaUserCircle className="user-icon" /></div>
          <div className="profile-info-section">
            <h2 className="user-name">{name}</h2>
            <p className="work-status "><MdWork className="icon-small" /> {workStatus} <MdLocationOn className="icon-small" /> {city}</p>
          </div>
          <button className="edit-btn edit-profile-btn" onClick={() => handleEditClick('profile')}><FaEdit /> Edit Profile</button>
        </div>

        <div className="profile-section">
          <h3 className="section-title">Profile Summary</h3>
          <div className="section-content">
            {activeSection === 'profile' ? sections.find(s => s.key === 'profile').edit : sections.find(s => s.key === 'profile').view}
          </div>
        </div>
      </div>

      <div className="profile-columns-container">
        <div className="profile-left-column">
           <div className="profile-card">
            <div className="section-header"><h3 className="section-title">Contact Information</h3><button className="edit-btn" onClick={() => handleEditClick('contact')}><FaEdit /></button></div>
            <div className="section-content">{activeSection === 'contact' ? sections.find(s => s.key === 'contact').edit : sections.find(s => s.key === 'contact').view}</div>
          </div>

          <div className="profile-card">
            <div className="section-header"><h3 className="section-title">Education</h3><button className="edit-btn" onClick={() => handleEditClick('education')}><FaEdit /></button></div>
            <div className="section-content">{activeSection === 'education' ? sections.find(s => s.key === 'education').edit : sections.find(s => s.key === 'education').view}</div>
          </div>
        </div>

        <div className="profile-right-column">
         
          <div className="profile-card">
            <div className="section-header"><h3 className="section-title">Skills</h3><button className="edit-btn" onClick={() => handleEditClick('skills')}><FaEdit /></button></div>
            <div className="section-content">{activeSection === 'skills' ? sections.find(s => s.key === 'skills').edit : sections.find(s => s.key === 'skills').view}</div>
          </div>

          <div className="profile-card">
            <div className="section-header"><h3 className="section-title">Projects</h3><button className="edit-btn" onClick={() => handleEditClick('projects')}><FaEdit /></button></div>
            <div className="section-content">{activeSection === 'projects' ? sections.find(s => s.key === 'projects').edit : sections.find(s => s.key === 'projects').view}</div>
          </div>

          <div className="profile-card">
            <div className="section-header"><h3 className="section-title">Personal Information</h3><button className="edit-btn" onClick={() => handleEditClick('personal')}><FaEdit /></button></div>
            <div className="section-content">{activeSection === 'personal' ? sections.find(s => s.key === 'personal').edit : sections.find(s => s.key === 'personal').view}</div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

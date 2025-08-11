import  { useState } from 'react';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaClock, FaUserTie, FaAlignLeft, FaCode, FaUsers } from 'react-icons/fa';

export default function UploadJob() {
  const [formData, setFormData] = useState({ title: '', name: '', location: '', type: '', experience: '', description: '', skills: '', vacancy: ''});
  const [successMsg, setSuccessMsg] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const isEmpty = Object.values(formData).some(value => !value.trim());
    if (isEmpty) {
      alert("Please fill in all required fields.");
      return;
    }
    setSuccessMsg(true);
    setFormData({title: '', name: '',location: '',type: '',experience: '',description: '',skills: '',vacancy: '' });
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  const formFields = [
    { d: "title", name: "title", label: "Job Title", placeholder: "e.g. Frontend Developer", type: "text", icon: <FaBriefcase className="input-icon" />, element: "input" },
    {id: "name",name: "name",label: "Company Name",placeholder: "Company name",type: "text",icon: <FaBuilding className="input-icon" />,element: "input"  },
    {id: "location",name: "location",label: "Location",placeholder: "e.g. New York, NY",type: "text",icon: <FaMapMarkerAlt className="input-icon" />,element: "input"},
    {id: "type",name: "type",label: "Job Type",icon: <FaClock className="input-icon" />,element: "select",
      options: [
        { value: "", label: "Select job type" },
        { value: "Full-Time", label: "Full-Time" },
        { value: "Part-Time", label: "Part-Time" },
        { value: "Contract", label: "Contract" },
        { value: "Internship", label: "Internship" },
        { value: "Remote", label: "Remote" }
      ] },
    {id: "experience",name: "experience",label: "Experience",icon: <FaUserTie className="input-icon" />,element: "select",
      options: [
        { value: "", label: "Select experience level" },
        { value: "Entry Level", label: "Entry Level" },
        { value: "Mid Level", label: "Mid Level (2-5 years)" },
        { value: "Senior Level", label: "Senior Level (5+ years)" },
        { value: "Executive", label: "Executive" }
      ] },
    {id: "description",name: "description",label: "Description",placeholder: "Job description and responsibilities...",icon: <FaAlignLeft className="input-icon" />,element: "textarea",rows: "4"},
    {id: "skills",name: "skills",label: "Required Skills",placeholder: "e.g. React, Node.js, JavaScript",type: "text",icon: <FaCode className="input-icon" />,element: "input"},
    {id: "vacancy",name: "vacancy",label: "Vacancies",placeholder: "Number of openings",type: "number",icon: <FaUsers className="input-icon" />,element: "input",min: "1"}
  ];

  const renderFormElement = (field) => {
    switch (field.element) {
      case 'input':
        return (
          <input type={field.type} id={field.id} name={field.name}placeholder={field.placeholder}value={formData[field.name]}onChange={handleChange}min={field.min}/>
        );
      case 'select':
        return (
          <select id={field.id} name={field.name} value={formData[field.name]} onChange={handleChange}  >
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea id={field.id}  name={field.name} placeholder={field.placeholder} value={formData[field.name]} onChange={handleChange} rows={field.rows}/>
        );
      default:
        return null;
    }
  };

  return (
    <div className='upload-container'>
      <div className='upload-card'>
        <h2 className='upload-title'>Post a New Job</h2>
        
        <div className='form-grid'>
          {formFields.map(field => (
            <div className='form-group' key={field.id}>
              <label htmlFor={field.id}>{field.icon} {field.label}</label>
              {renderFormElement(field)}
            </div>
          ))}
        </div>

        <button className='submit-button' onClick={handleSubmit}>
          Post Job
        </button>
      </div>

      {successMsg && (
        <div className='success-modal'>
          <div className='success-content'>
            Job Posted Successfully!
          </div>
        </div>
      )}
    </div>
  );
}
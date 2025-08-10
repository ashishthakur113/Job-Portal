import React,{useState} from 'react'

export default function UploadJob() {
const [title,setTitle]=useState('')
const [name,setName]=useState('')
const [location,setLocation]=useState('')
const [type,setType]=useState('')
const [experience,setExperience]=useState('')
const [description,setDescription]=useState('')
const [skills,setSkills]=useState('')
const [vacancy,setVacancy]=useState('')
const [successMsg, setSuccessMsg] = useState(false); // ✅ success message state


 return (
    <div className='upload-container'>
        <div className='upload'>
           <h3>Details Related to Job</h3>
          <section className='section1'>
          <h5>Job Title</h5>
          <input type="text" placeholder='Job title...' value={title} onChange={(e)=>setTitle(e.target.value)}/>
          <h5>Company Name</h5>
         <input type="text" placeholder='Company name' value={name} onChange={(e)=>setName(e.target.value)}/>
         </section>
          <h5>Branch Location</h5>
          <input type="text" placeholder='Job Location' value={location} onChange={(e)=>setLocation(e.target.value)} />
          <h5>Job Type</h5>
          <input type="text" placeholder='Full-Time' value={type} onChange={(e)=>setType(e.target.value)}/>
          <h5>Experience Required</h5>
          <input type="text" placeholder='Job experience'value={experience} onChange={(e)=>setExperience(e.target.value)} />
          <h5>Description</h5>
          <input type="text" placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
          <h5>Skills Require</h5>
          <input type="text" placeholder='Skills' value={skills} onChange={(e)=>setSkills(e.target.value)}/>
          <h5>Vacany No.</h5>
          <input type="number" placeholder='Vacancy' value={vacancy} onChange={(e)=>setVacancy(e.target.value)}/>
          <button className='postjob' onClick={() => {
              if ( title && name && location && type && experience && description && skills && vacancy) {
                setSuccessMsg(true); 
                setTitle('');
                setName('');
                setLocation('');
                setType('');
                setExperience('')
                setDescription('')
                setSkills('')
                setVacancy('')
                setTimeout(() => setSuccessMsg(false), 1000);
              } else {
                alert("Please fill in all required fields.");
              }
            }}>Post Job</button>
          </div>
          {successMsg && (
    <div className='succesmsg'>
    <div className='succesmsg-box'>
      Posted SuccessFully!
    </div>
  </div>
)}

    </div>
  )
}

import { useEffect, useState } from 'react';
import { MdOutlinePushPin } from "react-icons/md";
import { PiBagSimpleDuotone } from "react-icons/pi";

import { LuMapPin } from "react-icons/lu";
import { LiaBuilding } from "react-icons/lia";
import { Link, useParams } from 'react-router-dom';

export default function JobDetail() {
  const [showApply, setShowApply] = useState(false);
  const [jobInfo, setJobInfo] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("/data.json");
        const data = await res.json();
        const selectedJob = data.find((job) => String(job.id) === String(id));
        if (selectedJob) {
          setJobInfo(selectedJob);
        } else {
          console.warn("No job found with id:", id);
        }
      } catch (error) {
        console.error("Error in fetching job data:", error);
      }
    }
    getData();
  }, [id]);

  if (!jobInfo) {
    return <p>Loading job details...</p>;
  }

  return (
    <div className='job-container'>
      <div className='job-inner'>
        <h1 className='jobName'>{jobInfo.title}</h1>
        <h4 className='company class'><LiaBuilding className='companyicon' size={"20px"} /><sapn className="jobinfo-comapny">{jobInfo.company}</sapn></h4>
        <h6 className='location class'><LuMapPin />{jobInfo.location}</h6>
        <h5 className='experience class'><PiBagSimpleDuotone />{jobInfo.experience}</h5>
        <h2 className='salary class'>{jobInfo.salary}</h2>
        <h5 className='worktime class'><MdOutlinePushPin />{jobInfo.type}</h5>
        <h4 className='description'>Job Description</h4>
        <hr className='line1' />
        <p className='para'>{jobInfo.description}</p>
        <h4 className='require'>Required skill</h4>
        <hr />
        <ul className='skillUl'>
          {jobInfo.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        <div className='jobdetails-btn'>
          <Link to="/browserjob" className="link-reset">
            <button className="jobbtn job">Back</button>
          </Link>
          <button className="jobbtn apply" onClick={() => setShowApply(true)}>Apply</button>
        </div>

      </div>

      {showApply && (
        <div className='applydetail'>
          <h1 className='apply-title'>Apply for {jobInfo.title}</h1>
          <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="tel" placeholder='Mobile Number' value={mobile} onChange={(e) => setMobile(e.target.value)} />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <textarea name="message" id="message" rows="4" placeholder='Your message...'
            value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          <div className='jobdetails-btn'>
            <button className='jobbtn close' onClick={() => setShowApply(false)}>Close</button>
            <button
              className='applybtn'
              onClick={() => {
                if (name && email && mobile && file && message) {
                  setSuccessMsg(true);
                  setShowApply(false);
                  setName('');
                  setEmail('');
                  setMobile('');
                  setFile(null);
                  setMessage('');
                  setTimeout(() => setSuccessMsg(false), 1000);
                } else {
                  alert("Please fill in all required fields.");
                }
              }}>
              Apply
            </button>
          </div>
        </div>
      )}{successMsg && (
        <div className="success-msg-wrapper">
          <div className="success-msg-box">
            🎉 Application submitted successfully!
          </div>
        </div>
      )}


    </div>
  );
}

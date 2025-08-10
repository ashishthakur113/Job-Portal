import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Components.css'
import ReviewCard from './ReviewCard'
import LandingPage from './landingPage'

export default function Home() {
  const [jobs, setJobs] = useState([]);

  const reviews = [
    {
      name: 'Deepanshu Sehra',
      role: 'Web Developer',
      review: 'I am grateful I found this platform. Because of this, I got a job in Bangalore! Highly recommended.'
    },
    {
      name: 'Karan Datwani',
      role: 'Software Engineer',
      review: 'This job portal helped me land my dream job in a top company. Great experience!'
    },
    {
      name: 'Ashish Tomar',
      role: 'Software Engineer',
      review: 'This platform matched me with the perfect job based on my skills and experience. I landed a front-end developer role at Amazon, and the process was smooth and efficient!'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function getdata() {
      const response = await fetch("/data.json");
      const data = await response.json();
      setJobs(data);
    }
    getdata();
  }, []);

  const jobFilter = jobs.filter(job => job.location === "Mumbai, India");

  return (
   <div className='home'>
     <LandingPage /> 
       <div className='homecard'>
        <div className='homecarddiv'>
          {jobFilter.map((job) => (
            <div className='homecardinner' key={job.id}>
              <Link to={`/job/${job.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1>{job.company}</h1>
                <h2>{job.title}</h2>
                <h5>{job.salary}</h5>
                <hr />
                <p><span>Description:-</span> {job.description}</p>
              </Link>
            </div>
          ))}
        </div>
        <Link to={'/browserjob'}><button className='viewmore'>View More </button></Link>
      </div>

      <div className="Review scroll-section">
        <h1>What Our Users Say</h1>
        <div className="review-container">
          {reviews.map((item, index) => (
            <ReviewCard key={index} {...item} />
          ))}
        </div>
      </div>
   </div>
  )
}

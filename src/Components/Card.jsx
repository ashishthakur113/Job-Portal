import React, { useContext, useEffect } from 'react';
import { searchContext } from '../Context/UserContext';
import { Link } from 'react-router-dom';


export default function Card() {
  const { jobs, setJobs, setAllJobs, allJobs, searchTerm } = useContext(searchContext);

  useEffect(() => {
    async function getdata() {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setJobs(data);       
        setAllJobs(data);    
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }

    getdata();
  }, [setJobs, setAllJobs]);

  useEffect(() => {
    function setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.innerCard').forEach(card => {
        observer.observe(card);
      });
    }

    if (jobs.length > 0) {
      setupIntersectionObserver();
    }
  }, [jobs]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setJobs(allJobs); 
    } else {
      const filtered = allJobs.filter((job) =>
        [job.title, job.company, job.location].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setJobs(filtered);
    }
  }, [searchTerm, allJobs, setJobs]);

  return (
    <div className='cardContainer'>
      <h1>Available Jobs</h1>
      <div className='carddiv'>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className='innerCard' key={job.id}>
              <Link to={`/job/${job.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1>{job.company}</h1>
              <h2> {job.title}</h2>
              <h5>{job.location}</h5>
              <hr />
              <p><span>Description:-</span> {job.description}</p>
            </Link>
            </div>
          ))
        ) : (
          <p className="noResults">No jobs found matching your search.</p>
        )}
      </div>
    </div>
  );
}

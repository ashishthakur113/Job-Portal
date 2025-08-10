import React from 'react'
import { FaUserTie } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className='about-container'>
      <div className='about-inner'>
        <h1 className='comapnyname'><FaUserTie className='companylogo'/>About SkillHire</h1>
        <p>Welcome to SkillHire, the world's largest professional network with more than <br />
        50 million members in more than 100 countries and territories worldwide.</p>
        <h1 className='abouttext'> Vision
          <p>To empower every individual with access to career opportunities <br /> and support businesses in building exceptional teams</p>
        </h1>
        <h1 className='abouttext'>Mission 
          <p>To bridge the gap between opportunity and talent by providing a <br /> reliable, efficient, and modern job search experience.</p>
        </h1>
        <h1 className='abouttext'>Trusted By 1 Lakh+ Company
          <p>Like Amazon , Google , Microsoft, Netflix and many more. </p>
        </h1>
        <h1 className='abouttext'>Turning Skills Into Careers
          <p>Thousands have turned skills into careers. Your dream job is just one step away.</p>
        </h1>
      </div>

    </div>
  )
}

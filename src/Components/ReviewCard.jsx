import React from 'react';
import { FaUser } from "react-icons/fa";
export default function ReviewCard({  name, role, review }) {
  return (
    <div className="review-card">
      <FaUser className='review-img'/>
      <h3>{name}</h3>
      <h4>{role}</h4>
      <p>"{review}"</p>
    </div>
  );
}

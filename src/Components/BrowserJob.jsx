import React, { useContext } from 'react'
import Card from './Card'
import {searchContext} from '../Context/UserContext'

export default function BrowserJob() {
  let {searchTerm,setSearchTerm}=useContext(searchContext);
  return (
    <div >
      <form className='searchdiv' onSubmit={(e)=>e.preventDefault()}>
      <input type="search" placeholder='Search by Job Name,Company,Location' className='searchbar'
       onChange={(e)=>setSearchTerm(e.target.value)} value={searchTerm}/>
      </form>
     
      <Card/>
    </div>
  )
}

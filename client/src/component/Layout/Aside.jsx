import React from 'react'
import { Link } from 'react-router-dom'

function Aside() {
  return (
    <div className='mt-3'>
    <div className='mb-3 p-2'>
    <Link>CreateResume</Link>
    </div>
    <div className='mb-3 p-2'>
    <Link>View Resume</Link>
    </div>
    <div className='mb-3 p-2'>
    <Link>Update Resume</Link>
    </div>
    </div>
    
    
   
  )
}

export default Aside
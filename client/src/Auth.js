import React from 'react'
import  axios from './config/axios'

function Auth() {
    async function protecRouteAccess()
    {
        let data=  await axios.get('/auth/v1/token')
        console.log(data.data)
    }
    
  return (
    <>
      <div>Auth</div>
    <button onClick={protecRouteAccess}>click</button>
    </>
  
  )
}

export default Auth
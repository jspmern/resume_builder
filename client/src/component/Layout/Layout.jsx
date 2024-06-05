import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Aside from './Aside'
function Layout() {
  return (
      <>
      <Header/>
      <div className="container">
      <div className="row d-flex justify-content-evenly" style={{minHeight:"80vh",width:"100%"}}>
        <div className="col-md-3">
          <Aside/>
        </div>
        <div className="col-md-8">
           <Outlet/>
        </div>
      </div>
      </div>
    <Footer/>  
      </>
  )
}
export default Layout
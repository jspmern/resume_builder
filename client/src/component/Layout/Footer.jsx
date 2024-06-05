import React from 'react'

function Footer() {
  return (
    <>
 <footer className="bg-dark text-white text-center text-lg-start">
  <div className="container p-4">
    <div className="row">
      {/* About Section */}
      <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase">About</h5>
        <p>
          Your about section content goes here. Describe your website, company, or provide some general information.
        </p>
      </div>
      {/* Contact Section */}
      <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase">Contact</h5>
        <p>
          Email: contact@example.com<br />
          Phone: +123 456 7890<br />
          Address: 123 Main St, Anytown, USA
        </p>
      </div>
      {/* Copyright Section */}
      <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
        <h5 className="text-uppercase">Copyright</h5>
        <p>
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</footer>


   

    </>
  )
}

export default Footer
import React from 'react'

function Home() {
  return (
    <div className="container mt-3">
        <div className="row d-flex">
            <div className="col-6">
                <div>
                    <img src='https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="home_banner"  className='img-fluid'/>
                </div>
            </div>
            <div className="col-6">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, voluptatum iure? Consequuntur, at porro eius eaque labore magnam neque voluptates earum sunt ipsa dicta dolores reiciendis, in nostrum nobis consequatur natus quasi       </p>
                <br/>
                <br/>
                <button className='btn btn-primary'>Genrate Resume</button>
            </div>
        </div>
    </div>
  )
}

export default Home
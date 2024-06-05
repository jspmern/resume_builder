import React, { useState } from "react";
import Footer from "../component/Layout/Footer";
import Header from "../component/Layout/Header";
import { toast } from "react-toastify";

function Login() {
  let [data,setData] =useState({email:"",password:""})
  //this is common input field handler
  function inputFieldHandler(e)
  {
     setData((pre)=>{
         return {...pre,[e.target.name]:e.target.value}  
     })
  }
  //this is for the submit handler
  function submitHandler()
  {
    console.log('demp')
    if(!data.email || !data.password)
        {
            toast("all field are maindatroy***");
        }
  }
  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh", width: "100%" }}>
        {JSON.stringify(data)}
        <div className="container">
          <div
            className="row "
            style={{ height: "300px"  }}
          >
            <div className="col d-flex flex-column justify-content-center">
              <div>
                <input type="text" placeholder="Enter your email"  name="email" value={data.email} onChange={inputFieldHandler}/>
              </div>

              <br />
              <br />
              <div>
                <input type="password" placeholder="Enter your password"  name="password" value={data.password} onChange={inputFieldHandler}/>
              </div>

              <br />
              <br />
              <div>
              <button className="btn btn-primary" onClick={submitHandler}>Login</button>
              </div>
              
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Login;

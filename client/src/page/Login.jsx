import React, { useState } from "react";
import Footer from "../component/Layout/Footer";
import Header from "../component/Layout/Header";
import { toast } from "react-toastify";
import { useAuth } from "../hook/authHook";
import Loader from "../component/Loader";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  let [data,setData] =useState({email:"",password:""})
  let {loginHandler,data:x,loading,success,access,refresh}  = useAuth()
  let navigate=useNavigate()
  let location=useLocation()

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
    if(!data.email || !data.password)
        {
            alert("all field are maindatroy***");
        }
        else{
          loginHandler(data)
          //localStorage.setItem('resume',x.data)
          localStorage.setItem('access',access)
          localStorage.setItem('refresh',refresh)
           //navigate('/')   
        }
  }
  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh", width: "100%" }}>
         {console.table(x)}
        { 
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
        }
        
      </main>
      <Footer />
    </>
  );
}

export default Login;

import React, { useState } from 'react'
import './CSS/LoginSignup.css'

export const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:"",
    role:"user",
    address:"",
    mobile:"",
    
  })

  

  const changeHandler =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async()=>{
    console.log("Login function",formData);
    let responseData
    await fetch('https://backend-knm3.onrender.com/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-type':'application/json',
      },
      body:JSON.stringify(formData)
    }).then((resp)=>resp.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      localStorage.setItem('user-role',responseData.role)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }
  const signup = async()=>{
    console.log("Signup Function",formData);
    let responseData
    await fetch('https://backend-knm3.onrender.com/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-type':'application/json',
      },
      body:JSON.stringify(formData)
    }).then((resp)=>resp.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      localStorage.setItem('user-role', formData.role)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }

  }

  return <>
  <div className="loginsignup">
    <div className="loginsignup-container">
      <h1>{state}</h1>
      <div className="loginsignup-fields">
        {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name'/>:<></>}
        <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
        {state==="Sign Up"?<input name='mobile' value={formData.mobile} onChange={changeHandler} type="mobile" placeholder='Mobile Number' />:<></>}
        <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        
      </div>
      {state==="Sign Up"?<div className="loginsignup-role">
        <p>Role</p>
        <select value={formData.role} onChange={changeHandler} name="role" className="user-role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
      </div>:<></>}
      
      {state==="Sign Up"?<button onClick={()=>{signup()}}>Register</button>:<button onClick={()=>{login()}}>Continue</button>}
      
      {state==="Sign Up"
      ?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login Here</span></p>
      :<p className="loginsignup-login">Create an Account? <span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>}
    </div>
  </div>
  </>
}

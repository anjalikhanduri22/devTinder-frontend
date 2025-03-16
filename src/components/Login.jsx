import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const[emailId, setEmailId]= useState("");
  const [password, setPassword] = useState("");

  const [firstName,setFirstName]= useState("");
  const[lastName, setLastName]= useState("");

  const[isLoginForm, setIsLoginForm] = useState(true);


  const [error,setError] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async ()=>{
    try{
      const res = await axios.post(BASE_URL + "/login",{
        emailId,
        password,
      },
    {withCredentials:true}
  )
  dispatch(addUser(res.data));
  return navigate("/");

    }catch(err){
      setError(err?.response?.data || "something went wrong");
      
    }
  }

  const handleSignUp = async ()=>{
    try{
      const res = await axios.post(BASE_URL + "/signup",{firstName,lastName,emailId,password},{withCredentials:true});

      dispatch(addUser(res.data.data));
      return navigate("/profile");

    }
    catch(err){
      setError(err?.response?.data || "something went wrong");

    }
  }

  return (
    <div className="card card-border bg-base-300 w-96 mx-100  my-10 ">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLoginForm ? "Login" :"SignUp" }</h2>

    {!isLoginForm && (<div>

<fieldset className="fieldset ">
<legend className="fieldset-legend py-3 font-sans text-base">First Name</legend>
<input type="text" value={firstName}
onChange={(e)=>setFirstName(e.target.value)} className="input" placeholder="Type here" />
</fieldset>

<fieldset className="fieldset ">
  <legend className="fieldset-legend py-3 font-sans text-base">Last Name</legend>
  <input type="text" value={lastName}
  onChange={(e)=>setLastName(e.target.value)} className="input" placeholder="Type here" />
  </fieldset>

    </div>)}

  
     <fieldset className="fieldset ">
  <legend className="fieldset-legend py-3 font-sans text-base">Enter your EmailId</legend>
  <input type="text" value={emailId}
  onChange={(e)=>setEmailId(e.target.value)} className="input" placeholder="Type here" />

    </fieldset>

<fieldset className="fieldset ">
  <legend className="fieldset-legend py-3 font-sans text-base">Enter your Password</legend>
  <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input" placeholder="Type here" />
  
</fieldset>

<p className='text-red-500'>{ error }</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary mt-5" onClick={isLoginForm ? handleLogin :handleSignUp}>{isLoginForm ? "Login" : "SignUp"} </button>
    </div>

    <p onClick={()=> setIsLoginForm((value)=>!value)} className='m-auto cursor-pointer py-2'> 
      {isLoginForm ? "New User ? Signup here":"Existing user ? Login here" }
    </p>
  </div>
</div>
  )
}

export default Login
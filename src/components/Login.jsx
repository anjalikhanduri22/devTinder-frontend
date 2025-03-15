import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const[emailId, setEmailId]= useState("Ankit@email.com");
  const [password, setPassword] = useState("Ankit@123");
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

  return (
    <div className="card card-border bg-base-300 w-96 mx-100  my-10 ">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>

    <fieldset className="fieldset ">
  <legend className="fieldset-legend py-3 font-sans text-base">Enter your EmailId</legend>
  <input type="text" value={emailId}
  onChange={(e)=>setEmailId(e.target.value)} className="input" placeholder="Type here" />
  
</fieldset>
<fieldset className="fieldset ">
  <legend className="fieldset-legend py-3 font-sans text-base">Enter your Password</legend>
  <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} className="input" placeholder="Type here" />
  
</fieldset>



<p className='text-red-500'>{ error }</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary mt-5" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
  )
}

export default Login
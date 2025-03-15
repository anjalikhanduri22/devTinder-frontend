import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';

const EditProfile = ({user}) => {

  const[firstName, setFirstName]= useState(user.firstName);
  const[lastName, setLastName] = useState(user.lastName);
  const[photoUrl, setPhotoUrl]= useState(user.photoUrl);
  const[age, setAge]= useState(user.age);
  const[gender, setGender]= useState(user.gender);
  const[about, setAbout] = useState(user.about);

  const[error, setError]=useState(" ");

  const dispatch = useDispatch();

  const [showToast, setShowToast]= useState(false);

  const saveProfile = async() => {
    setError("");

    try{

      const res = await axios.patch(BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          about,
          age,
          gender,
        },
        {
        withCredentials:true
      }
    );

      

      dispatch(addUser(res?.data?.data));
      
      setShowToast(true);
      setTimeout(()=>{
        setShowToast(false);
      },3000);

    }
    catch(err){
      setError(err.response.data);
    }

  }


  return (
    <div className="flex justify-center  my-10 py-10 pt-2">

      <div className="flex justify-center mx-10 card card-border bg-base-300 w-80 ">
  <div className="card-body flex justify-center ">
    <h2 className="card-title justify-center">Edit Profile</h2>

    <fieldset className="fieldset">
  <legend className="fieldset-legend  font-sans text-base">First Name :</legend>
  <input type="text" value={firstName}
  onChange={(e)=>setFirstName(e.target.value)} className="input" placeholder="Type here" />
  </fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend  font-sans text-base">Last Name :</legend>
  <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="input" placeholder="Type here" />
  </fieldset>

  <fieldset className="fieldset ">
  <legend className="fieldset-legend font-sans text-base">Photo Url :</legend>
  <input type="text" value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)} className="input" placeholder="Type here" />
  </fieldset>

  <fieldset className="fieldset ">
  <legend className="fieldset-legend  font-sans text-base">Age :</legend>
  <input type="text" value={age} onChange={(e)=>setAge(e.target.value)} className="input" placeholder="Type here" />
  </fieldset>

  <fieldset className="fieldset ">
  <legend className="fieldset-legend  font-sans text-base">Gender :</legend>
  <input type="text" value={gender} onChange={(e)=>setGender(e.target.value)} className="input" placeholder="Type here" />
  </fieldset>

  <fieldset className="fieldset ">
  <legend className="fieldset-legend  font-sans text-base">About :</legend>
  <textarea className="textarea" value={about} onChange={(e)=>setAbout(e.target.value)} placeholder="Bio"></textarea>
  </fieldset>
  



<p className='text-red-500'>{ error }</p>

    <div className="card-actions justify-center">
      <button className="btn btn-primary mt-2" onClick={saveProfile} >Save Profile</button>
    </div>
  </div>
</div>
  

    <UserCard user = {{firstName,lastName,photoUrl,about,age,gender}}/>
    
    {showToast && (
      <div className="toast toast-top toast-center">
      
      <div className="alert alert-success">
        <span>Profile saved successfully.</span>
      </div>
    </div>
    )}
    
    </div>
    
    
  )
}

export default EditProfile
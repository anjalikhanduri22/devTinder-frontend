import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
  const {_id,firstName,lastName,age,gender, photoUrl, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest= async(status,userId)=>{
    try{

      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,{},{withCredentials:true});

      dispatch(removeUserFromFeed(userId))

    }

    catch(err){

    }
  }


  return (
    <div className="card  bg-base-200 w-80 shadow-sm ">
    <figure>
      <img src={user.photoUrl}
        alt="Photo" 
        className='px-0'/>
    </figure>
    <div className="card-body">

      <h2 className="card-title">{firstName + " " +lastName}</h2>
      
      {age && gender && <p>{age + "  , " + gender}</p>}
      <p>{ about }</p>
      <div className="card-actions justify-center mx-2">
        <button className="btn btn-accent" onClick={()=>handleSendRequest("ignored",_id)}>Ignore

        </button>
        <button className="btn btn-secondary" onClick={()=>handleSendRequest("intrested",_id)}>Intrested</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard
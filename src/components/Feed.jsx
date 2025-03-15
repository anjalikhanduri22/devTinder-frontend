import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { useSelector } from 'react-redux';
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector((store)=>store.feed);
  const dispatch = useDispatch();
  

  const getFeed = async () =>{
    try{
      if (feed) return;
    const res = await axios.get(BASE_URL +"/feed",{withCredentials:true})
   dispatch(addFeed(res.data))
  }
  catch(err){
    res.status(401).send("ERROR: "+err.message );
  }
  

}
 useEffect(()=>{
  getFeed();
       },[]);
    return( feed && ( 
      
    <div className='flex justify-center mx-10 my-10 px-2'><UserCard user={feed[0]} /> </div>
  
    
  ))
}

export default Feed;
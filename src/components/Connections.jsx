import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice';
import axios from 'axios';
import {Link} from "react-router-dom";


const Connections = () => {
  const connections = useSelector((store)=>store.connections);

  const dispatch = useDispatch();

  const fetchConnections = async () =>{
    try{

      const res = await axios.get(BASE_URL + "/user/connections",
        {
          withCredentials:true,

        }
          );

        

        dispatch(addConnections(res.data.data))

    }
    catch(err){
      
    }

  }
  useEffect(()=>{
    fetchConnections();
  },[]);

  if (!connections) return;
  if(connections.length===0){
    return(<h1 className='flex justify-center text-xl'>No connection found</h1>)
  }

  return (
    <div className="text-center">
      <h1 className="text-bold text-3xl">Connections</h1>
      {connections.map((connection)=>{
        const {_id,firstName,lastName,age,gender,photoUrl,about}=connection;

        return(
          <div key ={_id} className="flex m-4 p-4 bg-base-300 w-1/2 mx-auto rounded-lg space-between"> 
            <div>
              <img className="w-40 h-40" src={photoUrl} alt="photo" />
            </div>

            <div className="mx-8 p-8">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
              <p>{age + "," + gender }</p>)}
              <p>{about}</p>
              </div>
            <Link to = {"/chat/" + _id }>
            <button className='btn btn-primary'>Chat</button></Link>
          </div>
        )
      })}
      
      </div>
  )
}

export default Connections
import React ,{ useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {addRequests} from  "../utils/requestSlice";
import {removeRequest} from  "../utils/requestSlice";


const Requests = () => {
  const requests = useSelector((store)=>store.requests);
  const dispatch= useDispatch();

  const reviewRequest = async(status,_id)=>{
    try{
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {withCredentials:true}
      );

      dispatch(removeRequest(_id));

    }
    catch(err){

    }

  }


  const fetchRequests = async()=>{
    try{
      const res = await axios.get(BASE_URL + "/user/request/received",{
        withCredentials:true,
      });

      dispatch(addRequests(res.data.data));

      

    }
    catch(err){

    } }

    useEffect(()=>{
      fetchRequests();

    },[]);

    if (!requests) return;
  if(requests.length===0){
    return(<h1 className="flex justify-center my-10">No Request found</h1>)
  }

  return (
    <div className="text-center">
      <h1 className="text-bold text-3xl">Pending Requests</h1>
      {requests.map((request)=>{
        const {_id,firstName,lastName,age,gender,photoUrl,about}=request.fromUserId;

        return(
          <div key ={_id} className="flex m-4 p-4 bg-base-300 w-1/2 mx-auto  item-center rounded-lg"> 
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
           
            <button className="btn mx-2 btn-primary" onClick={()=> reviewRequest("rejected",request._id)}>Reject </button>
             <button className="btn mx-2 btn-secondary" onClick={()=> reviewRequest("accepted",request._id)}>Accept</button>
             
          </div>
        )
      })}
      
      </div>
  )
}

export default Requests
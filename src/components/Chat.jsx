import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import {createSocketConnection} from "../utils/socket";
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages,setMessages]=useState([]);
  const [newMessage,setNewMessage] = useState("");
  

  const user = useSelector(store=>store.user);
  const userId = user?._id;

  const fetchChatMessage = async () =>{
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId,{
      withCredentials:true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg)=>{

      const{senderId , text } = msg;
      
      return{
        firstName:senderId?.firstName,
        lastName:senderId?.lastName,
        text,
      };
      
    });
    setMessages(chatMessages);

  };
  useEffect(()=>{
    fetchChatMessage();
  },[]);

  

  useEffect(()=>{
    if(!userId){
      return;
    }
    //connect to the server
    const socket = createSocketConnection();

    socket.emit("joinChat",{firstName:user?.firstName,
      userId,targetUserId});

      socket.on("messageReceived",({
        firstName,lastName,
        text}) => {
          console.log(firstName + ":" + text);
          setMessages((messages)=>[...messages,{firstName,lastName,text}]);
  
        });

    return () => {
      socket.disconnect();
    };
  },[userId,targetUserId]);

  const sendMessage = ()=>{
    const socket = createSocketConnection();
    socket.emit("sendMessage",{
      firstName: user.firstName,
      lastName:user.lastName,
      userId, targetUserId,
      text:newMessage,
    });
    setNewMessage("");
  }

  return (
    <div className='w-1/2 mx-auto border border-grey-600 h-[70vh] m-5 flex flex-col'>
      <h1 className='border-b border-grey-600 p-5'>Chat</h1>
      <div className='overflow-scroll flex-1 p-5'>
       {messages.map((msg,index)=>{
        return(
          <div key={index} 
          className={"chat "+ 
          (user.firstName==msg.firstName ? "chat-end" : "chat-start" )}  >

            <div className="chat-header">
            {`${msg.firstName} ${msg.lastName}`}
            <time className="text-xs opacity-50">2 hours ago</time>
            </div>
             <div className="chat-bubble"> {msg.text} </div>
              <div className="chat-footer opacity-50">Seen</div>
              </div>
        
        )

       })}
      


      </div>
      <div className='border-t border-grey-600 flex items-center p-5 gap-2'>
      <input value = {newMessage} 
      onChange={(e)=> setNewMessage(e.target.value)}
      className="border border-grey-500 text-white bg-base-300 rounded flex-1 p-2" />
      <button className="btn btn-secondary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chat
import React from 'react'

const UserCard = ({user}) => {
  const {firstName,lastName,age,gender, photoUrl, about } = user;

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
        <button className="btn btn-accent">Ignore</button>
        <button className="btn btn-secondary">Intrested</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard
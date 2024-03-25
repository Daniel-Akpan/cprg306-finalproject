'use client';
import React, {useState} from "react";
import Link from "next/link";
import EditProfile from "@/components/editProfile";


const ProfilePage = () => {
  const [name, setName] = useState("John Doe")
  const [showEditPage, setShowEditPage] = useState(false)
  return (
    <div>
      {!showEditPage?<div>
        <h1>Profile Page</h1>
      <p>Name: {name}</p>
      <p>Bio: Some bio information</p>
      <button onClick={()=>{setShowEditPage(true)}}>Edit Profile</button>
      </div>: <></>}
      {showEditPage? <EditProfile closeEditProfile={()=>{setShowEditPage(false)}} setNames={setName}/>: <></>}
    </div>
  );
};

export default ProfilePage;

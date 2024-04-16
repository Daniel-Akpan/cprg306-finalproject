"use client";

import React, { useState } from "react";
import ProfilePage from "./profile";

export default function Profile() {
  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState("Some bio information");
  const [profileImage, setProfileImage] = useState(null); // Define profileImage state

  return (
    <main>
      <ProfilePage
        profileImage={profileImage} // Pass profileImage to ProfilePage
        name={name}
        bio={bio}
        setName={setName}
        setBio={setBio}
      />
    </main>
  );
}



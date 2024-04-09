"use client";

import React from "react";
import { useRouter } from "next/router";


function ProfileEditPage() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Profile updated:", { name, bio });
    await router.push("/profile");
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ProfileEditPage;

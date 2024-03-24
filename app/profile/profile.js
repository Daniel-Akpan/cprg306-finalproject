import React from "react";
import Link from "next/link";

const ProfilePage = () => {
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: John Doe</p>
      <p>Bio: Some bio information</p>
      {/* Link to navigate to profile edit page */}
      <Link href="/edit">
        <p>Edit Profile</p>
      </Link>
    </div>
  );
};

export default ProfilePage;

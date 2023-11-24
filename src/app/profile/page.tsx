"use client";
import React, { useState, useEffect } from "react";

interface UserInfo {
  name: string;
  email: string;
  image: string;
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user`);
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setUserInfo(data[0]);
          }
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex items-center justify-center mt-7">
      {userInfo && (
        <div className="flex">
          <div className="mr-4">
            <img
              src={userInfo.image}
              alt={`Profile picture`}
              className="rounded-full w-80 h-80 object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{userInfo.name}</h2>
            <p className="text-lg">{userInfo.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

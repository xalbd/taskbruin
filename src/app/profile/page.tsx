"use client";
import React, { useState, useEffect } from "react";
import { Task } from "../../../types/task";
import ProfileTasks from "@/components/ProfileTasks";

interface UserInfo {
  name: string;
  email: string;
  image: string;
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [createdTasks, setCreatedTasks] = useState<Task[] | null>(null);
  const [acceptedTasks, setAcceptedTasks] = useState<Task[] | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setUserInfo(data[0]);
          }
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMyTasks = async () => {
      try {
        const response = await fetch(`/api/me`);

        if (response.ok) {
          const data = await response.json();
          setCreatedTasks(data.created);
          setAcceptedTasks(data.accepted);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
    fetchMyTasks();
  }, []);

  return (
    <div className="flex items-center justify-center mt-7">
      <div>
        <div className="flex items-center justify-center">
          {userInfo && (
            <div className="flex">
              <div className="mr-4">
                <img
                  src={userInfo.image}
                  alt={`Profile picture`}
                  className="rounded-full w-20 h-20 object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userInfo.name}</h2>
                <p className="text-lg">{userInfo.email}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex mt-4">
          <ProfileTasks title={"Created Tasks"} tasks={createdTasks} />
          <ProfileTasks title={"Accepted Tasks"} tasks={acceptedTasks} />
        </div>
      </div>
    </div>
  );
};

export default Profile;

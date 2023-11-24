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
  const [createdTasks, setCreatedTasks] = useState<Task[]>([]);
  const [acceptedTasks, setAcceptedTasks] = useState<Task[]>([]);

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
    <div className={`relative min-h-screen mt-10`}>
      <div
        className={`relative shadow-lg rounded-lg overflow-hidden`}
        style={{
          minHeight: "50vh",
          width: "75%",
          margin: "0 auto",
          position: "relative",
          boxShadow: "0 4px 6px rgba(100, 149, 237, 0.5)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")',
            backgroundSize: "cover",
            backgroundPosition: "top center",
            height: "400px",
            zIndex: 1,
          }}
        />

        <div className="flex items-center justify-center mt-7 relative z-10">
          <div>
            <div className="flex flex-col items-center justify-center text-white">
              {userInfo && (
                <>
                  <div>
                    <img
                      src={userInfo.image}
                      alt={`Profile picture`}
                      className="rounded-full max-w-full max-h-full object-cover"
                      style={{
                        width: "200px",
                        height: "200px",
                      }}
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <h2 className="text-4xl font-bold mt-4 mb-4">
                      {userInfo.name}
                    </h2>
                    <p className="text-lg">{userInfo.email}</p>
                  </div>
                </>
              )}
            </div>

            <div className="flex mt-24 mb-10 mr-5 ml-5">
              <ProfileTasks title={"My Tasks"} tasks={createdTasks} />
              <div className="ml-9">
                <ProfileTasks title={"Accepted Tasks"} tasks={acceptedTasks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


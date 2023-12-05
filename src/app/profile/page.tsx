"use client";
import React, { useState, useEffect } from "react";
import { Task } from "../../../types/task";
import ProfileTasks from "@/components/ProfileTasks";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Profile = () => {
  const { data: session, status } = useSession();
  const [createdTasks, setCreatedTasks] = useState<Task[]>([]);
  const [acceptedTasks, setAcceptedTasks] = useState<Task[]>([]);
  const [tasksReady, setTasksReady] = useState("loading");

  useEffect(() => {
    toast.remove();
    const fetchMyTasks = async () => {
      try {
        const response = await fetch(`/api/me`);

        if (response.ok) {
          const data = await response.json();
          setCreatedTasks(data.created);
          setAcceptedTasks(data.accepted);
          setTasksReady("loaded");
        } else {
          setTasksReady("error");
        }
      } catch (error) {
        setTasksReady("error");
      }
    };

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
          className="absolute top-0 left-0 right-0 z-0"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")',
            backgroundSize: "cover",
            backgroundPosition: "top center",
            height: "400px",
          }}
        />

        <div className="flex items-center justify-center mt-7 relative">
          <div className="grow">
            <div className="flex flex-col items-center justify-center text-white">
              {status === "authenticated" && (
                <>
                  <div>
                    <img
                      src={session.user.image ?? ""}
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
                      {session.user.name}
                    </h2>
                    <p className="text-lg">{session.user.email}</p>
                  </div>
                </>
              )}
            </div>

            <div className="flex w-full mt-24 mb-10 px-5">
              {tasksReady === "loading" && (
                <h1 className="mt-5 text-2xl text-center text-gray-400 grow">
                  Tasks loading...
                </h1>
              )}
              {tasksReady === "error" && (
                <h1 className="mt-5 text-2xl text-center text-gray-400 grow">
                  Tasks could not be loaded.
                </h1>
              )}
              {tasksReady === "loaded" && (
                <>
                  <div className="w-1/2">
                    <ProfileTasks title={"My Tasks"} tasks={createdTasks} />
                  </div>
                  <div className="w-1/2">
                    <ProfileTasks
                      title={"Accepted Tasks"}
                      tasks={acceptedTasks}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

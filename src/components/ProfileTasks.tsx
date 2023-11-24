import React from "react";
import { Task } from "../../types/task";

interface ProfileTasksProps {
  title: string;
  tasks: Task[] | null;
}

const ProfileTasks: React.FC<ProfileTasksProps> = ({ title, tasks }) => {
  return (
    <div>
      {tasks && (
        <div className="mr-4">
          <h3 className="text-xl font-bold mb-6">{title}</h3>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`w-full lg:flex mb-8 `}
            >
              <div
                className="lg:w-64 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                style={{
                  backgroundImage:
                    "url('https://tailwindcss.com/img/card-left.jpg')",
                }}
                title="Woman holding a mug"
              ></div>
              <div
                className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
              >
                <div className="mb-8">
                  <div className="font-bold text-xl mb-2">
                    {task.title}
                  </div>
                  <p className="text-grey-darker text-base">
                    {task.description}
                  </p>
                </div>
                <div className="flex items-center">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg"
                    alt="Avatar of Jonathan Reinink"
                  />
                  <div className="text-sm">
                    <p className="leading-none">Jonathan Reinink</p>
                    <p className="text-grey-dark">Aug 18</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileTasks;

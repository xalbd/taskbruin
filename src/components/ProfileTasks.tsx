import React from "react";
import { Task } from "../../types/task";
import TaskCard from "@/components/TaskCard";

interface ProfileTasksProps {
  title: string;
  tasks: Task[] | null;
}

const ProfileTasks: React.FC<ProfileTasksProps> = ({ title, tasks }) => {
  return (
    <div>
      {tasks && (
        <div className="mr-4">
          <h3 className="text-center text-xl font-bold mb-6">{title}</h3>
          {tasks.length === 0 ? (
            <h1 className="mt-5 text-2xl text-center text-gray-400">
              No results found
            </h1>
          ) : (
            <>
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} horizontal={true} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileTasks;

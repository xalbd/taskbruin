import React from "react";
import { Task } from "../../types/task"

interface ProfileTasksProps {
  title: string;
  tasks: Task[] | null;
}

const ProfileTasks: React.FC<ProfileTasksProps> = ({ title, tasks }) => {
  return (
    <div>
      {tasks && (
        <div className="mr-4">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          {tasks.map((task) => (
            <div key={task.id}>
              <div>{task.title}</div>
              <div>{task.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileTasks;

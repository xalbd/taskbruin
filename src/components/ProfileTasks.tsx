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
          <h3 className="text-xl font-bold mb-6">{title}</h3>
          {tasks.map((task) => (
            <TaskCard task={task} horizontal={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileTasks;

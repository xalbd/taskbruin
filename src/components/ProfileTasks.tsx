import React, { useState } from "react";
import { Task } from "../../types/task";
import TaskCard from "@/components/TaskCard";
import TaskModal from "./TaskModal";

interface ProfileTasksProps {
  title: string;
  tasks: Task[] | null;
}

const ProfileTasks: React.FC<ProfileTasksProps> = ({ title, tasks }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <>
      <div>
        {tasks && (
          <div className="px-2 w-full shrink-0">
            <h3 className="text-center text-xl font-bold mb-6">{title}</h3>
            {tasks.length === 0 ? (
              <h1 className="my-5 text-2xl text-center text-gray-400">
                No results found.
              </h1>
            ) : (
              <>
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    horizontal={true}
                    onClick={() => setSelectedTask(task)}
                  />
                ))}
              </>
            )}
          </div>
        )}
        {selectedTask && (
          <TaskModal
            task={selectedTask}
            closeModal={() => setSelectedTask(null)}
          />
        )}
      </div>
    </>
  );
};

export default ProfileTasks;

// TaskModal.tsx

import React, { useState } from "react";
import Modal from "react-modal";
import AcceptTask from "@/app/dev/AcceptTask";

interface TaskModalProps {
  task: {
    title: string;
    description: string;
    image_url?: string;
    id: number;
  } | null;
  closeModal: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, closeModal }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAcceptTask = async () => {
    // Call the API to accept the task
    const response = await fetch(`/api/accept/${task?.id}`, {
      method: "POST", // Assuming your API endpoint supports POST method for task acceptance
    });

    if (response.ok) {
      setIsAccepted(true);
      // Optionally, you can handle further logic based on the API response
    } else {
      // Handle error cases
      console.error("Failed to accept task:", response.statusText);
    }
  };

  return (
    <Modal
      isOpen={task !== null}
      onRequestClose={closeModal}
      contentLabel="Task Modal"
    >
      {task && (
        <div>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          {task.image_url && (
            <img
              src={task.image_url}
              alt={task.title}
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                objectFit: "cover",
              }}
            />
          )}
          <div className="flex">
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-3 sm:w-auto"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="button"
              className={`mt-3 inline-flex w-full justify-center rounded-md ${
                isAccepted
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-800 hover:bg-green-700"
              } px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
              onClick={handleAcceptTask}
              disabled={isAccepted}
            >
              {isAccepted ? "Task Accepted!" : "Accept Task!"}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default TaskModal;

// TaskModal.tsx

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Task } from "../../types/task";

interface TaskModalProps {
  task: Task;
  closeModal: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, closeModal }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const { data: session, status: authStatus } = useSession();
  session?.user.id;

  useEffect(() => {
    setIsAccepted(task?.acceptedByUserId !== null);
  }, [task]);

  const handleAcceptTask = async () => {
    const response = await fetch(`/api/accept/${task?.id}`, {
      method: "POST",
    });

    if (response.ok) {
      setIsAccepted(true);
    } else {
      toast.error("Failed to accept task: ${response.statusText}");
    }
  };

  const getButtonContent = () => {
    if (authStatus !== "authenticated") {
      return "Log in to accept!";
    } else if (task?.userId === session.user.id) {
      return "This is your own task!";
    } else if (isAccepted) {
      return "Task Accepted!";
    } else if (task?.acceptedByUserId) {
      return "Task Already Accepted";
    } else {
      return "Accept this task";
    }
  };

  return (
    <Modal
      isOpen={task !== null}
      onRequestClose={closeModal}
      contentLabel="Task Modal"
      className="modal fixed inset-0 flex items-center justify-center"
    >
      {task && (
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {task.title}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {task.description}
              </p>
              {/*task.image_url && (
                <img
                  src={task.image_url}
                  alt={task.title}
                  className="max-w-full h-auto"
                />
              )*/}
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className={`text-white ${
                  authStatus !== "authenticated" || isAccepted
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-800 hover:bg-green-700"
                } px-5 py-2.5 font-medium rounded-lg text-sm`}
                onClick={handleAcceptTask}
                disabled={
                  task?.userId === session?.user.id ||
                  authStatus !== "authenticated" ||
                  isAccepted
                }
              >
                {getButtonContent()}
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default TaskModal;

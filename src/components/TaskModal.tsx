// TaskModal.tsx

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { Task } from "../../types/task";

interface TaskModalProps {
  task: Task;
  closeModal: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, closeModal }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [networkRequestActive, setNetworkRequestActive] = useState(false);
  const { data: session, status: authStatus } = useSession();

  useEffect(() => {
    setIsAccepted(task?.acceptedByUserId !== null);
  }, [task]);

  const handleAcceptTask = async () => {
    if (networkRequestActive || isAccepted) {
      return;
    }
    setNetworkRequestActive(true);

    const response = await fetch(`/api/accept/${task?.id}`, {
      method: "POST",
    });

    if (response.ok) {
      setIsAccepted(true);
      task.acceptedByUserId = session?.user.id ?? ""; // hack because I don't have a way to refresh information of single task via API
      toast.success("Task accepted!", { id: "accepted" });
    } else if (response.status === 406) {
      toast.error("Someone else accepted this task before you.", {
        id: "failed",
      });
      task.acceptedByUserId = "OTHER"; // hack to fix display of button
      setIsAccepted(true);
    } else {
      toast.error("Failed to accept task.", { id: "failed" });
    }
    setNetworkRequestActive(false);
  };

  async function handleUnAcceptTask() {
    if (networkRequestActive || !isAccepted) {
      return;
    }
    setNetworkRequestActive(true);

    const response = await fetch(`/api/accept/${task?.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setIsAccepted(false);
      task.acceptedByUserId = null;
      toast.success("Task unaccepted!", { id: "accepted" });
    } else {
      toast.error("Failed to unaccept task.", { id: "failed" });
    }
    setNetworkRequestActive(false);
  }

  async function handleDeleteTask() {
    if (networkRequestActive || task?.userId !== session?.user.id) {
      return;
    }
    setNetworkRequestActive(true);

    const response = await fetch(`/api/task/${task?.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setIsAccepted(true);
      task.acceptedByUserId = "OTHER";
      toast.success("Task deleted!", { id: "accepted" });
    } else {
      toast.error("Failed to delete task.", { id: "failed" });
    }
    setNetworkRequestActive(false);
  }

  async function handleUnauthenticated() {
    signIn();
  }

  const getButtonContent = () => {
    if (authStatus !== "authenticated") {
      return "Log in to accept this task.";
    } else if (task?.userId === session.user.id) {
      return "Delete task!";
    } else if (isAccepted) {
      if (task?.acceptedByUserId === session.user.id) {
        return "Unaccept this task.";
      } else {
        return "Someone else already accepted this task.";
      }
    } else if (networkRequestActive) {
      return `${isAccepted ? "Unaccepting..." : "Accepting..."}`;
    }
    return "Accept this task!";
  };

  function buttonColor() {
    if ((authStatus !== "authenticated") || (!isAccepted && task.userId !== session.user.id)){
      return "bg-green-800 hover:bg-green-700"
    }
    else if (isAccepted || task.userId === session.user.id){
      return "bg-red-700 hover:bg-red-600";
    }
    else {
      return "bg-gray-500 cursor-not-allowed";
    }
  }

  function buttonDisabled() {
    return (
      (isAccepted && task.acceptedByUserId !== session?.user.id) ||
      networkRequestActive
    );
  }

  return (
    <Modal
      isOpen={task !== null}
      onRequestClose={closeModal}
      contentLabel="Task Modal"
      className="modal fixed inset-0 flex items-center justify-center z-50"
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
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className={`text-white ${buttonColor()} px-5 py-2.5 font-medium rounded-lg text-sm`}
                onClick={authStatus !== "authenticated" ? handleUnauthenticated
                  : task.userId === session.user.id ? handleDeleteTask
                  : isAccepted ? handleUnAcceptTask : handleAcceptTask}
                disabled={buttonDisabled()}
              >
                {getButtonContent()}
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </Modal>
  );
};

export default TaskModal;

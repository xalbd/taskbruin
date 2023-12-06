import React, { useState, useEffect, use } from "react";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { Task } from "../../types/task";

interface TaskModalProps {
  task: Task;
  closeModal: () => void;
  deleteTask: (taskId: number) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  task,
  closeModal,
  deleteTask,
}) => {
  const [isAccepted, setIsAccepted] = useState(task.acceptedByUserId !== null);
  const [networkRequestActive, setNetworkRequestActive] = useState(false);
  const { data: session, status: authStatus } = useSession();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [usersName, setUserName] = useState<string | null>(null);
  const [userpfpic, setUserPfpic] = useState<string | null>(null);
  const [isContactInfoVisible, setIsContactInfoVisible] = useState(false);

  const obtainContact = async () => {
    try {
      const response = await fetch(`/api/user/${task.userId}`, {
        method: "GET",
      });

      if (response.ok) {
        const userData = await response.json();
        setUserName(userData[0]?.name || "");
        setUserEmail(userData[0]?.email || "");
        setUserPfpic(userData[0]?.image || "");
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    setIsContactInfoVisible(task.acceptedByUserId !== null);
    obtainContact();
  }, [task.acceptedByUserId]);

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
      setIsContactInfoVisible(true);
      await obtainContact();
      task.acceptedByUserId = session?.user.id ?? ""; // hack because I don't have a way to refresh information of single task via API
      toast.success("Task accepted!", { id: "accepted" });
    } else if (response.status === 406) {
      toast.error("Someone else has already accepted this task.", {
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
      setIsContactInfoVisible(false);
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
      deleteTask(task.id);
      closeModal();
    } else {
      toast.error("Failed to delete task.", { id: "failed" });
    }
    setNetworkRequestActive(false);
  }

  async function handleUnauthenticated() {
    signIn(undefined, { callbackUrl: "/explore" });
  }

  const getButtonContent = () => {
    if (authStatus !== "authenticated") {
      return "Log in to accept this task.";
    } else if (task?.userId === session.user.id) {
      return `${networkRequestActive ? "Deleting..." : "Delete this task."}`;
    } else if (isAccepted) {
      if (task?.acceptedByUserId === session.user.id) {
        return `${
          networkRequestActive ? "Unaccepting..." : "Unaccept this task."
        }`;
      } else {
        return "Someone else already accepted this task.";
      }
    }
    return `${networkRequestActive ? "Accepting..." : "Accept this task!"}`;
  };

  function buttonColor() {
    if (networkRequestActive || authStatus !== "authenticated") {
      return "bg-gray-500 cursor-not-allowed";
    } else if (
      authStatus !== "authenticated" ||
      (!isAccepted && task.userId !== session.user.id)
    ) {
      return "bg-green-700 hover:bg-green-600";
    } else if (isAccepted || task.userId === session.user.id) {
      return "bg-red-700 hover:bg-red-600";
    } else {
      return "bg-gray-500 cursor-not-allowed";
    }
  }

  function buttonDisabled() {
    return (
      authStatus !== "authenticated" ||
      (isAccepted &&
        task.acceptedByUserId !== session?.user.id &&
        task.userId !== session.user.id) ||
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
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-300">
                {task.description}
              </p>
              <div className="flex items-center justify-center">
                <img
                  src={task.image}
                  alt="Task image"
                  className="max-h-96 w-auto rounded-lg"
                />
              </div>
            </div>
            {isContactInfoVisible && (
              <div className="p-4 md:p-5 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-4">
                  {userpfpic && (
                    <img
                      src={userpfpic}
                      alt="User Profile Picture"
                      className="w-8 w-8 rounded-full"
                    />
                  )}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {usersName}'s contact information
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Email:{" "}
                      <a href={`mailto:${userEmail}`} className="text-blue-500">
                        {userEmail}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className={`text-white ${buttonColor()} px-5 py-2.5 font-medium rounded-lg text-sm`}
                onClick={
                  authStatus !== "authenticated"
                    ? handleUnauthenticated
                    : task.userId === session.user.id
                    ? handleDeleteTask
                    : isAccepted
                    ? handleUnAcceptTask
                    : handleAcceptTask
                }
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

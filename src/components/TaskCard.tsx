import React from "react";
import { Task } from "../../types/task";

interface CardProps {
  task: Task;
  horizontal?: boolean;
  onClick?: () => void;
}

const TaskCard: React.FC<CardProps> = ({
  task,
  horizontal = false,
  onClick,
}) => {
  const formatDateString = (dateString: string | null) => {
    if (typeof dateString === "string") {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${month}/${day}/${year}`;
    }
  };

  return (
    <div
      className={`${
        horizontal ? "flex" : ""
      } flex-shrink-0 rounded-lg overflow-hidden p-4 mb-11`}
      style={{ boxShadow: "0 4px 6px rgba(100, 149, 237, 0.5)" }}
      onClick={onClick}
    >
      <img
        src={
          "https://static.demilked.com/wp-content/uploads/2018/03/5aaa1cc04ed34-funny-weird-wtf-stock-photos-19-5a3926af95d9d__700.jpg"
        }
        className={`w-1/2 ${horizontal ? "mr-4 mb-2" : ""} rounded-lg`}
        style={{ maxWidth: "100%" }}
      />
      <div className={`w-full ${horizontal ? "" : "ml-4"}`}>
        <p className="mb-2">
          {formatDateString(task.startDate)} - {formatDateString(task.endDate)}
        </p>
        <h2 className="text-xl font-bold mb-2">{task.title}</h2>
        <p>{task.description}</p>
      </div>
    </div>
  );
};

export default TaskCard;

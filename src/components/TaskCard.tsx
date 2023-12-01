import React from "react";
import { Task } from "../../types/task";

interface CardProps {
  task: Task;
  horizontal?: boolean;
}

const TaskCard: React.FC<CardProps> = ({ task, horizontal = false }) => {
  const formatDateString = (dateString: string | null) => {
    if (typeof dateString === "string") {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${month}/${day}`;
    }
  };

  return (
    <div
      className={`${
        horizontal ? "flex" : "flex-col "
      } rounded-lg overflow-hidden p-8 mb-11`}
      style={{ boxShadow: "0 4px 6px rgba(100, 149, 237, 0.5)" }}
    >
      <img
        src={
          "https://static.demilked.com/wp-content/uploads/2018/03/5aaa1cc04ed34-funny-weird-wtf-stock-photos-19-5a3926af95d9d__700.jpg"
        }
        className={`${horizontal ? "w-1/2 mr-4 mb-2" : ""} rounded-lg`}
        style={{ maxWidth: "100%" }}
      />
      <div className={`w-full ${horizontal ? "" : ""}`}>
        <p className="mb-2 mt-5 italic">
          {formatDateString(task.startDate)} - {formatDateString(task.endDate)}
        </p>
        <h2 className="text-2xl font-bold mb-2 ">{task.title}</h2>
        <p className="">{task.description}</p>
        <p className="font-bold mt-2">
          Price: {task.price}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;

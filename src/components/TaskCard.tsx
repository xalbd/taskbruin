import React from "react";

interface TaskCardProps {
  title: string;
  date: string;
  description: string;
  image_url: string;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  date,
  description,
  image_url,
  onClick,
}) => {
  return (
    <div
      className="flex-shrink-0 rounded-lg overflow-hidden flex p-4 mb-11"
      style={{ boxShadow: "0 4px 6px rgba(100, 149, 237, 0.5)" }}
      onClick={onClick}
    >
      <div className="w-full p-4">
        <img
          src={image_url}
          alt={"FROG"}
          className="w-full mb-2 rounded-lg"
          style={{ maxWidth: "100%" }}
        />
        <p className="mb-2"> {date} </p>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default TaskCard;

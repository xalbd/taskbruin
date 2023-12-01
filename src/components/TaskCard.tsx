import React from "react";
import { Task } from "../../types/task";
import { GiTicket } from "react-icons/gi";

interface CardProps {
  task: Task;
  horizontal?: boolean;
}

const TaskCard: React.FC<CardProps> = ({ task, horizontal = false }) => {
  const formatDateString = (dateString: string | null) => {
    if (typeof dateString === "string") {
      const date = new Date(dateString);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = months[date.getMonth()];
      const day = String(date.getDate());
      return `${month} ${day}`;
    }
  };

  const renderPrices = (task: Task) => {
    const prices = [];
    for (let i = 0; i < task.price; i++) {
      prices.push(
        <GiTicket
          key={i}
          className={` mr-2 ${horizontal ? "md:text-2xl lg:text-3xl" : "text-3xl"}`}
        />
      );
    }
    return prices;
  };

  return (
    <div
      className={`${
        horizontal ? "flex" : "flex-col "
      } rounded-lg overflow-hidden cursor-pointer p-8 mb-11`}
      style={{ boxShadow: "0 4px 6px rgba(100, 149, 237, 0.5)" }}
    >
      <img
        src={
          "https://static.demilked.com/wp-content/uploads/2018/03/5aaa1cc04ed34-funny-weird-wtf-stock-photos-19-5a3926af95d9d__700.jpg"
        }
        className={`${horizontal ? "w-1/2 mr-4 mb-2" : ""} rounded-lg`}
        style={{ maxWidth: "100%" }}
      />
      <div className={"w-full "}>
        <p className="mb-2 mt-5 italic">
          {formatDateString(task.startDate)} - {formatDateString(task.endDate)}
        </p>
        <h2 className="text-2xl font-bold mb-2 ">{task.title}</h2>
        <p>{task.description}</p>
      </div>
      <div className={`flex justify-center mt-4`}>{renderPrices(task)}</div>
    </div>
  );
};

export default TaskCard;

import React from "react";
import { Task } from "../../types/task";
import { GiTicket } from "react-icons/gi";

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

  const renderPrices = (price: number) => {
    if (price <= 4) {
      const prices = [];
      for (let i = 0; i < price; i++) {
        prices.push(
          <GiTicket
            key={i}
            className={`shrink-0 mx-1 ${
              horizontal ? "md:text-2xl lg:text-3xl" : "text-3xl"
            }`}
          />,
        );
      }
      return prices;
    }
    return (
      <>
        <GiTicket
          className={`mx-1 ${
            horizontal ? "md:text-2xl lg:text-3xl" : "text-3xl"
          }`}
        ></GiTicket>
        <h3
          className={`${
            horizontal ? "pt-1" : ""
          } text-center text-ml font-semibold`}
        >
          {price}x
        </h3>
      </>
    );
  };

  return (
    <div
      className={`${
        horizontal ? "flex" : "flex-col"
      } rounded-lg overflow-hidden cursor-pointer p-8 mb-5`}
      style={{ boxShadow: "0 4px 6px rgba(100, 149, 237, 0.5)" }}
      onClick={onClick}
    >
      <div className={`${horizontal ? "mr-4 hidden md:block" : ""} w-full`}>
        <img src={task.image} className={`rounded-lg h-auto w-full`} />
      </div>

      <div className={"w-full"}>
        <p className="mb-2 mt-5 italic">
          {formatDateString(task.startDate)} - {formatDateString(task.endDate)}
        </p>
        <h3 className="text-2xl font-bold mb-2 ">{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div
        className={`${
          horizontal ? "flex-col" : "flex"
        } justify-center items-center mt-4`}
      >
        {renderPrices(task.price)}
      </div>
    </div>
  );
};

export default TaskCard;

"use client";

import React from "react";
import TaskCard from "@/components/TaskCard";
import useSWR from "swr";
import SearchBar from "@/components/SearchBar";
import { Task } from "../../types/task"

const fetcher = async (endpoint: string) => {
  const response = await fetch(endpoint);
  const json = await response.json();
  if (response.ok) {
    return json;
  } else {
    throw json;
  }
};

const TaskDisplay = () => {
  const { data, error, isLoading } = useSWR("/api/task", fetcher);
  const [searchString, setSearchString] = React.useState("");

  const filterData = () => {
    if (searchString.length !== 0 && data) {
      const searchWords = new Set(searchString.toLowerCase().split(/\s+/));
      const filteredData = data.filter((item: Task) => {
        const titleWords = item.title.toLowerCase().split(/\s+/);
        return titleWords.some((word) => searchWords.has(word));
      });

      if (filteredData.length === 0) {
        return undefined;
      } else {
        return filteredData;
      }
    } else {
      return data;
    }
  };

  const tasksToRender = filterData();

  return (
    <>
      <div className="max-w-7xl m-auto p-5 sm:p-8">
        <SearchBar setResults={setSearchString} />
        {isLoading && (
          <h1 className="mt-5 text-2xl text-center text-gray-400">
            Loading...
          </h1>
        )}
        {!tasksToRender && searchString.length !== 0 && (
          <h1 className="mt-5 text-2xl text-center text-gray-400">
            {`No results found for ${searchString}`}
          </h1>
        )}

        <div className="mt-8 columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 xl:columns-5 ">
          {tasksToRender?.map((task: Task, index: number) => (
            <TaskCard
              task = {task}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default TaskDisplay;

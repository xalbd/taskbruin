"use client";

import React from "react";
import TaskCard from "@/components/TaskCard";
import useSWR from "swr";
import SearchBar from "@/components/SearchBar";
import FilterMenu from "@/components/FilterMenu";
import fetcher from "@/utils/getFetcher";
import { Task } from "../../types/task";
import FilterMenuPrice from "./FilterMenuPrice";

const TaskDisplay = () => {
  const { data: taskData, isLoading: taskDataIsLoading } = useSWR(
    "/api/task",
    fetcher,
  );
  const { data: categoryData, isLoading: categoryDataIsLoading } = useSWR(
    "/api/category",
    fetcher,
  );
  const [searchString, setSearchString] = React.useState("");
  const [selectedCategories, setSelectedCategories] = React.useState<number[]>(
    [],
  );
  const [value, setValue] =  React.useState<number[]>([1, 50]);

  const filterTasksUsingSearch = () => {
    if (searchString.length !== 0 && taskData) {
      const searchWords = new Set(searchString.toLowerCase().split(/\s+/));
      const filteredData = taskData.filter((item: Task) => {
        const titleWords = item.title.toLowerCase().split(/\s+/);
        return titleWords.some((word) => searchWords.has(word));
      });

      return filteredData;
    } else {
      return taskData;
    }
  };

  function filterTasksUsingCategories(tasks: Array<Task>) {
    if (selectedCategories.length !== 0 && tasks) {
      return tasks.filter((item: Task) =>
        selectedCategories.includes(item.category),
      );
    }
    return tasks;
  };

  function filterTasksUsingPrice(tasks: Array<Task>) {
    if (value[0] != 1 || value[1] != 50) {
      return tasks.filter((item: Task) =>
        value[0] <= item.price && item.price <= value[1],
      );
    }
    return tasks;
  };

  const tasksToRender1 = filterTasksUsingCategories(filterTasksUsingSearch());
  const tasksToRender = filterTasksUsingPrice(tasksToRender1);

  return (
    <>
      <div className="max-w-7xl m-auto p-5 sm:p-8">
        <FilterMenuPrice 
          value={value}
          setValue={setValue}
        />
        <div className="flex flex-row">
          <FilterMenu
            categories={categoryData}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <div className="flex-grow" />
          <SearchBar setResults={setSearchString} />
        </div>

        {taskDataIsLoading && (
          <h1 className="mt-5 text-2xl text-center text-gray-400">
            Loading...
          </h1>
        )}
        {tasksToRender?.length === 0 && searchString.length !== 0 && (
          <h1 className="mt-5 text-2xl text-center text-gray-400">
            {`No results found for "${searchString}".`}
          </h1>
        )}
        {tasksToRender?.length === 0 && searchString.length === 0 && (
          <h1 className="mt-5 text-2xl text-center text-gray-400">
            {`No results found.`}
          </h1>
        )}

        <div className="mt-8 columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 xl:columns-5 ">
          {tasksToRender?.map((task: Task) => (
            <TaskCard task={task} key={task.id} />
          ))}
        </div>
      </div>
    </>
  );
};
export default TaskDisplay;

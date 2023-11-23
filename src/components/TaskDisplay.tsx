"use client";

import React from "react";
import TaskCard from "@/components/TaskCard";
import useSWR from "swr";
import SearchBar from "@/components/SearchBar";
import FilterMenu from "@/components/FilterMenu";
import fetcher from "@/utils/getFetcher";

interface Task {
  id: number;
  title: string;
  price: number;
  description: string;
  userId: string;
  category: number;
}

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
  }

  const tasksToRender = filterTasksUsingCategories(filterTasksUsingSearch());

  return (
    <>
      <div className="max-w-7xl m-auto p-5 sm:p-8">
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
          {tasksToRender?.map((data: Task, index: number) => (
            <TaskCard
              key={index}
              title={data.title}
              date={"10-23-2023"}
              description={data.description}
              image_url={
                "https://upload.wikimedia.org/wikipedia/en/7/79/IOS_17_Homescreen.png"
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default TaskDisplay;

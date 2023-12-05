"use client";
import React, { useState } from "react";
import TaskCard from "@/components/TaskCard";
import useSWR from "swr";
import SearchBar from "@/components/SearchBar";
import TaskModal from "@/components/TaskModal";
import FilterMenu from "@/components/FilterMenu";
import fetcher from "@/utils/getFetcher";
import { Task } from "../../../types/task";
import FilterMenuPrice from "../../components/FilterMenuPrice";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { useDeleteTaskList } from "@/utils/useDeleteTaskList";

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
  const [value, setValue] = React.useState<number[]>([1, 10]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { data: session, status } = useSession();
  const [deletedIds, deleteTask] = useDeleteTaskList();

  React.useEffect(() => {
    toast.remove();
  }, []);

  function filterTasksUsingUser(tasks: Array<Task>) {
    if (status === "authenticated" && tasks) {
      return tasks.filter(
        (item: Task) =>
          item.acceptedByUserId === null ||
          item.acceptedByUserId === session.user.id ||
          item.userId === session.user.id,
      );
    }
    return tasks;
  }

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

  function filterTasksUsingPrice(tasks: Array<Task>) {
    if ((value[0] != 1 || value[1] != 10) && tasks) {
      return tasks.filter(
        (item: Task) => value[0] <= item.price && item.price <= value[1],
      );
    }
    return tasks;
  }

  function filterTasksByDeleted(tasks: Array<Task>) {
    if (tasks) {
      return tasks.filter((item: Task) => !deletedIds.includes(item.id));
    }
    return tasks;
  }

  const tasksToRender = filterTasksByDeleted(
    filterTasksUsingUser(
      filterTasksUsingPrice(
        filterTasksUsingCategories(filterTasksUsingSearch()),
      ),
    ),
  );

  const openModal = (task: Task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <>
      <div className="max-w-7xl m-auto p-5">
        <div className="flex flex-row items-center mb-1">
          <FilterMenu
            categories={categoryData}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <div className="flex-grow" />
          <SearchBar setResults={setSearchString} />
        </div>
        <FilterMenuPrice value={value} setValue={setValue} />

        {taskDataIsLoading && (
          <h1 className="mt-5 text-2xl text-center text-gray-400">
            Hold tight, tasks are loading...
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

        <div className="mt-5 columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 xl:columns-5 ">
          {tasksToRender?.map((task: Task) => (
            <TaskCard
              task={task}
              key={task.id}
              onClick={() => openModal(task)}
            />
          ))}
        </div>
        {selectedTask && (
          <TaskModal
            task={selectedTask}
            closeModal={closeModal}
            deleteTask={deleteTask}
          />
        )}
      </div>
      <Toaster />
    </>
  );
};

export default TaskDisplay;

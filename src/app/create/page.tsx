"use client";
import React from "react";
import Input from "@/components/Input";
import toast, { Toaster } from "react-hot-toast";

const TaskForm = () => {
  const [title, setTitle] = React.useState("");
  const [taskType, setTaskType] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [selectedFiles, setSelectedFiles] = React.useState<FileList | null>(
    null,
  );

  const resetForm = async () => {
    setTitle("");
    setTaskType("");
    setDescription("");
    setPrice(0);
    setStartDate("");
    setEndDate("");
    setSelectedFiles(null);
  };

  const handleTasksSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const requestBody = JSON.stringify({
      title,
      description,
      price,
    });
    const response = await fetch("api/tasks", {
      method: "POST",
      body: requestBody,
    });
    if (response.ok) {
      await resetForm();
      toast.success("Task created!");
    } else {
      toast.error("Task creation failed.");
    }
  };

  React.useEffect(() => {
    console.log(description);
  }, [description]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Task</h2>

      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
        id="file_input"
        type="file"
        onChange={(event) => {
          const files = event.target.files;
          if (files) {
            setSelectedFiles(files);
          }
        }}
      />

      <form onSubmit={handleTasksSubmit}>
        <Input
          title="Task Name"
          isRequired={true}
          value={title}
          onInputChange={setTitle}
        />
        <Input
          title="Task Type/Category"
          isRequired={true}
          value={taskType}
          onInputChange={setTaskType}
        />
        <Input
          title="Task Description"
          rows={3}
          isRequired={true}
          value={description}
          onInputChange={setDescription}
        />
        <Input
          title="Task Price"
          type="number"
          isRequired={true}
          value={price}
          onInputChange={setPrice}
        />

        <div className="flex">
          <div className="mr-2">
            <Input
              title="Start Time"
              isRequired={false}
              value={startDate}
              onInputChange={setStartDate}
            />
          </div>
          <div>
            <Input
              title="End Time"
              isRequired={false}
              value={endDate}
              onInputChange={setEndDate}
            />
          </div>
        </div>

        <button
          className="mt-5 font-bold py-2 px-4 rounded border border-gray-400 text-base block w-full p-3"
          type="submit"
        >
          Create Task
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default TaskForm;

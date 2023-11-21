"use client";
import React from "react";
import Input from "@/components/Input";
import toast, { Toaster } from "react-hot-toast";
import TextArea from "@/components/TextArea";
import { useSession } from "next-auth/react";

const TaskForm = () => {
  const [title, setTitle] = React.useState("");
  const [taskType, setTaskType] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(1);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [selectedFiles, setSelectedFiles] = React.useState<FileList | null>(
    null,
  );

  // control usage of submit button
  const { status: authStatus } = useSession();
  const [formWaiting, setFormWaiting] = React.useState(false);
  const formButtonDisabled = formWaiting || authStatus !== "authenticated";
  const formButtonMessage =
    authStatus !== "authenticated"
      ? "Sign in before submitting!"
      : formWaiting
      ? "Submitting..."
      : "Submit";

  const resetForm = async () => {
    setTitle("");
    setTaskType("");
    setDescription("");
    setPrice(1);
    setStartDate("");
    setEndDate("");
    setSelectedFiles(null);
  };

  const handleTasksSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    if (startDateObj > endDateObj) {
      toast.error("Start date must be before end date.", { id: "failed" });
      return;
    }
    const requestBody = JSON.stringify({
      title,
      description,
      price,
      startDate: startDateObj,
      endDate: endDateObj,
    });
    setFormWaiting(true);
    const response = await fetch("api/task", {
      method: "POST",
      body: requestBody,
    });
    if (response.ok) {
      await resetForm();
      toast.success("Task created!", { id: "created" });
    } else {
      toast.error("Task creation failed.", { id: "failed" });
    }
    setFormWaiting(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Task</h2>
      <form onSubmit={handleTasksSubmit}>
        <Input
          title="Task Name"
          required={true}
          value={title}
          setValue={setTitle}
        />
        <Input
          title="Task Type/Category"
          required={true}
          value={taskType}
          setValue={setTaskType}
        />
        <TextArea
          title="Task Description"
          rows={3}
          required={true}
          value={description}
          setValue={setDescription}
        />
        <Input
          title="Task Price"
          type="number"
          min={1}
          required={true}
          value={price}
          setValue={setPrice}
        />

        <div className="flex">
          <div className="mr-2 grow">
            <Input
              title="Start Time"
              required={false}
              value={startDate}
              setValue={setStartDate}
              type="date"
            />
          </div>
          <div className="grow">
            <Input
              title="End Time"
              required={false}
              value={endDate}
              setValue={setEndDate}
              type="date"
            />
          </div>
        </div>
        <Input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
          type="file"
          title="Image"
          setValue={() => {}}
          onChange={(event) => {
            // override internal input handler using rest spreading
            const files = event.target.files;
            if (files) {
              setSelectedFiles(files);
            }
          }}
        />

        <button
          className="mt-5 font-bold py-2 px-4 rounded border border-gray-400 bg-green-600 hover:bg-green-500 text-base block w-full p-3 disabled:text-gray-400 disabled:bg-gray-600"
          type="submit"
          disabled={formButtonDisabled}
        >
          {formButtonMessage}
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default TaskForm;

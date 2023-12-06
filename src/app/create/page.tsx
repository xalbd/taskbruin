"use client";
import React from "react";
import Input from "@/components/Input";
import toast, { Toaster } from "react-hot-toast";
import TextArea from "@/components/TextArea";
import Dropdown from "@/components/Dropdown";
import { useSession } from "next-auth/react";
import offsetDate from "@/utils/getOffsetDate";
import { v4 as uuidv4 } from "uuid";

const TaskForm = () => {
  React.useEffect(() => {
    toast.remove();
    fetch("api/category")
      .then((response) => response.json())
      .then((data) => setCategoryData(data));
  }, []);
  const [categoryData, setCategoryData] = React.useState([
    { id: 0, name: "Other" },
  ]);

  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(1);
  const [startDate, setStartDate] = React.useState(offsetDate(0));
  const [endDate, setEndDate] = React.useState(offsetDate(7));
  const [file, setFile] = React.useState<File | null>(null);

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
    setCategory(0);
    setDescription("");
    setPrice(1);
    setStartDate(offsetDate(0));
    setEndDate(offsetDate(7));
    setFile(null);
  };

  const handleTasksSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormWaiting(true);
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    if (startDateObj > endDateObj) {
      toast.error("Start date must be before end date.", { id: "failed" });
      return;
    }

    const file_uuid = uuidv4();
    let obj_url = null;

    if (!file) {
      toast.error("No image selected.", { id: "failed" });
      return;
    }

    const upload_response = await fetch("api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename: file_uuid, contentType: file.type }),
    });

    if (upload_response.ok) {
      const { url, fields } = await upload_response.json();

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        obj_url = "http://taskbruin.s3.us-west-1.amazonaws.com/" + file_uuid;
      } else {
        toast.error("Image upload failed.", { id: "failed" });
        return;
      }
    } else {
      toast.error("Failed to get pre-signed URL.", { id: "failed" });
      return;
    }

    const requestBody = JSON.stringify({
      title,
      description,
      price,
      category,
      startDate: startDateObj,
      endDate: endDateObj,
      image: obj_url,
    });
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
        <Dropdown
          categories={categoryData}
          title="Category"
          setValue={setCategory}
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
          max={10}
          required={true}
          value={price}
          setValue={setPrice}
        />

        <div className="flex">
          <div className="mr-2 grow">
            <Input
              title="Start Date"
              required={false}
              value={startDate}
              setValue={setStartDate}
              type="date"
            />
          </div>
          <div className="grow">
            <Input
              title="End Date"
              required={false}
              value={endDate}
              setValue={setEndDate}
              type="date"
            />
          </div>
        </div>
        <Input
          className="file:border-0 file:px-2 file:py-1 block w-full text-sm text-gray-900 border border-gray-400 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400"
          type="file"
          title="Image"
          setValue={() => {}}
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              setFile(files[0]);
            }
          }}
          accept="image/png, image/jpeg"
        />

        <button
          className="mt-5 font-bold py-2 px-4 rounded border text-indigo-500 border-indigo-500 focus:ring transform transition hover:scale-105 duration-300 ease-in-out hover:bg-indigo-500 hover:text-white text-base block w-full p-3 disabled:text-gray-400 disabled:bg-gray-600 disabled:border-gray-400"
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

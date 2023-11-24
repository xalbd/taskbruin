import React from "react";

interface SetTasksProps {
  setRequest: React.Dispatch<React.SetStateAction<string>>;
  setResponse: React.Dispatch<React.SetStateAction<string>>;
  setResponseStatus: React.Dispatch<React.SetStateAction<string>>;
}
export default function PostTasks({
  setRequest,
  setResponse,
  setResponseStatus,
}: SetTasksProps) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null);

  const id = React.useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-message`;
  const priceId = `${id}-price`;
  const imageId = `${id}-image`;

  async function handlePostTasksSubmit(event: React.FormEvent) {
    event.preventDefault();

    const requestBody = JSON.stringify({
      title,
      description,
      price,
      image,
    });

    setRequest(requestBody);

    const response = await fetch("api/tasks", {
      method: "POST",
      body: requestBody,
    });
    const json = await response.json();
    setResponse(JSON.stringify(json));
    setResponseStatus(response.status.toString());
  }

  return (
    <form
      onSubmit={handlePostTasksSubmit}
      className="text-red-500 flex-col flex m-2 p-1"
    >
      <label htmlFor={titleId}>Title</label>
      <input
        id={titleId}
        value={title}
        required={true}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />

      <label htmlFor={descriptionId}>Description</label>
      <textarea
        id={descriptionId}
        value={description}
        placeholder="no description given"
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />

      <label htmlFor={priceId}>Price</label>
      <input
        id={priceId}
        value={price}
        type="number"
        required={true}
        min={1}
        max={10}
        placeholder="default: 1"
        onChange={(event) => {
          setPrice(event.target.value);
        }}
      />

      <label htmlFor={imageId}>Image</label>
      <input
        id={imageId}
        type="file"
        accept="image/*"
        onChange={(event) => {
          const files = event.target.files;
          if (files && files.length > 0) {
            setImage(files[0]);
          }
        }}
      />
      <button className="outline">Post Task</button>
    </form>
  );
}

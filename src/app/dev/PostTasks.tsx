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

  const id = React.useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-message`;
  const priceId = `${id}-price`;

  async function handlePostTasksSubmit(event: React.FormEvent) {
    event.preventDefault();
    const requestBody = JSON.stringify({
      title,
      description,
      price,
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

      <button className="outline">/api/tasks POST</button>
    </form>
  );
}

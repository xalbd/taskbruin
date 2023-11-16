import React from "react";
import { RequestResponseDisplayProps } from "./page";

export default function PostTasks({
  setRequest,
  setResponse,
  setResponseStatus,
}: RequestResponseDisplayProps) {
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
    <form onSubmit={handlePostTasksSubmit} className="flex-col flex m-2">
      <label htmlFor={titleId}>Title</label>
      <input
        className="outline p-1"
        id={titleId}
        value={title}
        required={true}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />

      <label htmlFor={descriptionId}>Description</label>
      <textarea
        className="outline p-1"
        id={descriptionId}
        value={description}
        placeholder="no description given"
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />

      <label htmlFor={priceId}>Price</label>
      <input
        className="outline p-1"
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

      <button className="outline p-1">/api/tasks POST</button>
    </form>
  );
}

import React from "react";
import { RequestResponseDisplayProps } from "./page";
import Upload from "./Upload";

export default function PostTasks({
  setRequest,
  setResponse,
  setResponseStatus,
}: RequestResponseDisplayProps) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");
  const [category, setCategory] = React.useState("");

  const id = React.useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-message`;
  const priceId = `${id}-price`;
  const imageId = `${id}-image`;
  const categoryId = `${id}-category`;

  async function handlePostTasksSubmit(event: React.FormEvent) {
    event.preventDefault();

    const requestBody = JSON.stringify({
      title,
      description,
      price,
      category,
      image,
    });

    setRequest(requestBody);

    const response = await fetch("api/task", {
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

      <label htmlFor={categoryId}>Category</label>
      <input
        className="outline p-1"
        id={categoryId}
        value={category}
        type="number"
        required={true}
        onChange={(event) => {
          setCategory(event.target.value);
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

      <label htmlFor={imageId}>Image</label>
      <input
        className="outline p-1"
        id={imageId}
        value={image}
        required={true}
        onChange={(event) => {
          setImage(event.target.value);
        }}
      />
      <button className="outline p-1">/api/task POST</button>
    </form>
  );
}

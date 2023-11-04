import React from "react";

interface SetTasksProps {
  setRequestDisplay: React.Dispatch<React.SetStateAction<string>>;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
}
export default function PostTasks({
  setRequestDisplay,
  setOutput,
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
    setRequestDisplay(requestBody);

    const response = await fetch("api/tasks", {
      method: "POST",
      body: requestBody,
    });
    const json = await response.json();
    setOutput(JSON.stringify(json));
  }

  return (
    <form onSubmit={handlePostTasksSubmit} style={{ color: "red" }}>
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
        placeholder="default: 1"
        onChange={(event) => {
          setPrice(event.target.value);
        }}
      />

      <button>/api/tasks POST</button>
    </form>
  );
}

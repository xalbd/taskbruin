import React from "react";
import { ResponseDisplayProps } from "./page";

export default function DeleteTask({
  setResponse,
  setResponseStatus,
}: ResponseDisplayProps) {
  const [taskId, setTaskId] = React.useState("");

  async function handleDeleteTask(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch(`/api/task/${taskId}`, {
      method: "DELETE",
    });
    const json = await response.json();
    setResponse(JSON.stringify(json));
    setResponseStatus(response.status.toString());
  }

  return (
    <form onSubmit={handleDeleteTask} className="flex-col flex m-2 p-1">
      <label htmlFor={taskId}>Task ID</label>
      <input
        id="task-id"
        value={taskId}
        required={true}
        type="number"
        onChange={(event) => setTaskId(event.target.value)}
      />
      <button className="outline">/api/task/[id] DELETE</button>
    </form>
  );
}

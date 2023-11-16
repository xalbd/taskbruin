import React from "react";
import { RequestResponseDisplayProps } from "./page";

export default function DeleteTask({
  setRequest,
  setResponse,
  setResponseStatus,
}: RequestResponseDisplayProps) {
  const [taskId, setTaskId] = React.useState("");

  async function handleDeleteTask(event: React.FormEvent) {
    event.preventDefault();
    const requestBody = JSON.stringify({
      id: taskId,
    });
    setRequest(requestBody);

    const response = await fetch("/api/tasks/", {
      method: "DELETE",
      body: requestBody,
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
      <button className="outline">/api/tasks DELETE</button>
    </form>
  );
}

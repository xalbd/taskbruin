import React from "react";
import { RequestResponseDisplayProps } from "./page";

export default function AcceptTask({
  setRequest,
  setResponse,
  setResponseStatus,
}: RequestResponseDisplayProps) {
  const [taskId, setTaskId] = React.useState("");

  async function handleAcceptTask(event: React.FormEvent) {
    event.preventDefault();
    const requestBody = JSON.stringify({
      id: taskId,
    });
    setRequest(requestBody);

    const response = await fetch("/api/accept/", {
      method: "PATCH",
      body: requestBody,
    });
    const json = await response.json();
    setResponse(JSON.stringify(json));
    setResponseStatus(response.status.toString());
  }

  return (
    <form onSubmit={handleAcceptTask} className="flex-col flex m-2 p-1">
      <label htmlFor={taskId}>Task ID</label>
      <input
        id="task-id"
        value={taskId}
        type="number"
        required={true}
        onChange={(event) => setTaskId(event.target.value)}
      />
      <button className="outline">/api/accept PATCH</button>
    </form>
  );
}

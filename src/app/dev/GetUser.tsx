import React from "react";
import { ResponseDisplayProps } from "./page";

export default function GetUser({
  setResponse,
  setResponseStatus,
}: ResponseDisplayProps) {
  const [userId, setUserId] = React.useState("");
  const labelId = React.useId();

  async function handleGetUser(event: React.FormEvent) {
    event.preventDefault();

    const response = userId
      ? await fetch(`/api/user/${userId}`)
      : await fetch("/api/user");
    const json = await response.json();
    setResponse(JSON.stringify(json));
    setResponseStatus(response.status.toString());
  }

  return (
    <>
      <form onSubmit={handleGetUser} className="flex-col flex m-2 p-1">
        <label htmlFor={labelId}>User ID</label>
        <input
          id={labelId}
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
        <button className="outline" onClick={handleGetUser}>
          /api/user/[id] GET
        </button>
      </form>
    </>
  );
}

import { ResponseDisplayProps } from "./page";

export default function GrabTasks({
  setResponse,
  setResponseStatus,
}: ResponseDisplayProps) {
  async function handleGrabTasks(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const response = await fetch("/api/tasks", { method: "GET" });
    const json = await response.json();
    setResponse(JSON.stringify(json));
    setResponseStatus(response.status.toString());
  }

  async function handleGrabMeTasks(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const response = await fetch("/api/me", { method: "GET" });
    const json = await response.json();
    setResponse(JSON.stringify(json));
    setResponseStatus(response.status.toString());
  }

  return (
    <>
      <button className="outline m-2 p-1" onClick={handleGrabTasks}>
        /api/tasks GET
      </button>

      <button className="outline m-2 p-1" onClick={handleGrabMeTasks}>
        /api/me GET
      </button>
    </>
  );
}

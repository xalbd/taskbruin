interface GrabTasksProps {
  setResponse: React.Dispatch<React.SetStateAction<string>>;
  setResponseStatus: React.Dispatch<React.SetStateAction<string>>;
}
export default function GrabTasks({
  setResponse,
  setResponseStatus,
}: GrabTasksProps) {
  async function handleGrabTasks(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const response = await fetch("/api/tasks", { method: "GET" });
    const json = await response.json();
    setResponse(JSON.stringify(json));
    setResponseStatus(response.status.toString());
  }

  return (
    <button className="outline m-2 p-1" onClick={handleGrabTasks}>
      /api/tasks GET
    </button>
  );
}

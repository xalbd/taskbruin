import { ResponseDisplayProps } from "./page";

export default function GrabTasks({
  setResponse,
  setResponseStatus,
}: ResponseDisplayProps) {
  async function handleGet(
    apiURL: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();

    const response = await fetch(apiURL, { method: "GET" });
    const json = await response.json();
    setResponse(JSON.stringify(json));
    setResponseStatus(response.status.toString());
  }

  return (
    <>
      <button
        className="outline m-2 p-1"
        onClick={(e) => handleGet("/api/task", e)}
      >
        /api/task GET
      </button>

      <button
        className="outline m-2 p-1"
        onClick={(e) => handleGet("/api/me", e)}
      >
        /api/me GET
      </button>

      <button
        className="outline m-2 p-1"
        onClick={(e) => handleGet("/api/category", e)}
      >
        /api/category GET
      </button>
    </>
  );
}

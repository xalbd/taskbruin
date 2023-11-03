"use client";

import React from "react";

export default function Dev() {
  const [displayOutput, setDisplayOutput] = React.useState("");

  return (
    <>
      <GrabTasks setOutput={setDisplayOutput} />
      <DisplayOutput output={displayOutput} />
    </>
  );
}

interface GrabTasksProps {
  setOutput: React.Dispatch<React.SetStateAction<string>>;
}
function GrabTasks({ setOutput }: GrabTasksProps) {
  async function handleGrabTasks(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const response = await fetch("/api/tasks", { method: "GET" });
    const json = await response.json();
    setOutput(JSON.stringify(json));
  }

  return <button onClick={handleGrabTasks}>/api/tasks GET</button>;
}

interface DisplayOutputProps {
  output: string;
}
function DisplayOutput({ output }: DisplayOutputProps) {
  return <p>{output}</p>;
}

"use client";

import React from "react";
import PostTasks from "./tasks-post";

export default function Dev() {
  const [displayOutput, setDisplayOutput] = React.useState("");
  const [requestOutput, setRequestOutput] = React.useState("");

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <GrabTasks setOutput={setDisplayOutput} />
          <PostTasks
            setRequestDisplay={setRequestOutput}
            setOutput={setDisplayOutput}
          />
        </div>
        <div className="col-span-1">
          <DisplayOutput title="Last Request Body" output={requestOutput} />
          <DisplayOutput title="Last Response" output={displayOutput} />
        </div>
      </div>
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
  title: string;
  output: string;
}
function DisplayOutput({ title, output }: DisplayOutputProps) {
  return (
    <>
      <h2>{title}</h2>
      <p className="outline p-3">{output}</p>
    </>
  );
}

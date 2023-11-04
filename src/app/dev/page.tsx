"use client";

import React from "react";
import PostTasks from "./PostTasks";
import GetTasks from "./GetTasks";

export default function Dev() {
  const [responseBody, setResponseBody] = React.useState("");
  const [responseStatus, setResponseStatus] = React.useState("");
  const [requestBody, setRequestBody] = React.useState("");

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="col-span-1 flex flex-col space-y-3">
          <GetTasks
            setResponse={setResponseBody}
            setResponseStatus={setResponseStatus}
          />
          <PostTasks
            setRequest={setRequestBody}
            setResponseStatus={setResponseStatus}
            setResponse={setResponseBody}
          />
        </div>
        <div className="col-span-1">
          <DisplayOutput title="Last Request Body" output={requestBody} />
          <DisplayOutput title="Last Response Status" output={responseStatus} />
          <DisplayOutput title="Last Response" output={responseBody} />
        </div>
      </div>
    </>
  );
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

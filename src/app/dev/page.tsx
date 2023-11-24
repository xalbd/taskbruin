"use client";

import React from "react";
import PostTasks from "./PostTasks";
import GetTasks from "./GetTasks";
import NavBar from "./NavBar";
import DelTasks from "./DelTasks";
import Upload from "./Upload";
import AcceptTask from "./AcceptTask";
import GetUser from "./GetUser";

export default function Dev() {
  const [responseBody, setResponseBody] = React.useState("");
  const [responseStatus, setResponseStatus] = React.useState("");
  const [requestBody, setRequestBody] = React.useState("");

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-2">
        <div className="col-span-1 flex flex-col space-y-3">
          <GetTasks
            setResponse={setResponseBody}
            setResponseStatus={setResponseStatus}
          />
          <GetUser
            setResponse={setResponseBody}
            setResponseStatus={setResponseStatus}
          />
          <PostTasks
            setRequest={setRequestBody}
            setResponseStatus={setResponseStatus}
            setResponse={setResponseBody}
          />
          <DelTasks
            setResponseStatus={setResponseStatus}
            setResponse={setResponseBody}
          />
          <AcceptTask
            setResponseStatus={setResponseStatus}
            setResponse={setResponseBody}
          />
          <Upload />
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

export interface ResponseDisplayProps {
  setResponse: React.Dispatch<React.SetStateAction<string>>;
  setResponseStatus: React.Dispatch<React.SetStateAction<string>>;
}

export interface RequestResponseDisplayProps {
  setRequest: React.Dispatch<React.SetStateAction<string>>;
  setResponse: React.Dispatch<React.SetStateAction<string>>;
  setResponseStatus: React.Dispatch<React.SetStateAction<string>>;
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

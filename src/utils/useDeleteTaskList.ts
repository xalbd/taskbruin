import { useState } from "react";
import toast from "react-hot-toast";

export function useDeleteTaskList() {
  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  function deleteTask(id: number) {
    setDeletedIds([...deletedIds, id]);
    toast.success("Task deleted!", { id: "accepted" });
  }

  return [deletedIds, deleteTask] as const;
}

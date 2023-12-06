import { useState } from "react";
import toast from "react-hot-toast";

export function useDeleteTaskList() {
  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  function deleteTask(id: number, trueIfCompleting: boolean) {
    setDeletedIds([...deletedIds, id]);
    toast.success(`Task ${trueIfCompleting ? "completed" : "deleted"}!`, {
      id: "accepted",
    });
  }

  return [deletedIds, deleteTask] as const;
}

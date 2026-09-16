import { useState } from "react";
import type Task from "../types/task";

const useTaskEditor = () => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const startEditing = (task: Task) => {
    setEditingTask(task);
  };

  const finishEditing = () => {
    setEditingTask(null);
  };

  return { startEditing, finishEditing, editingTask };
};

export default useTaskEditor;

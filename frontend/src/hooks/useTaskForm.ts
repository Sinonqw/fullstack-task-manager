import { useEffect, useRef, useState } from "react";
import { addTask, editTask } from "../api/tasks";
import type Task from "../types/task";
import { addTaskAdded, onTaskUpdated } from "../redux/tasksSlice";
import { showNotification } from "../redux/notificationsSlice";
import useAppDispatch from "./useAppDispatch";

const useTaskForm = (
  editingTask: Task | null,
  onEditFinished: () => void
) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [day, setDay] = useState("");

  const titleInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDay(editingTask.day);

      titleInputRef.current?.focus();
    } else {
      setTitle("");
      setDescription("");
      setDay("");
    }
  }, [editingTask]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editingTask) {
        const updatedTask = await editTask(
          editingTask._id,
          title,
          description,
          day,
          editingTask.completed
        );

        dispatch(onTaskUpdated(updatedTask));

        dispatch(
          showNotification({
            message: "Task updated",
            type: "success",
          })
        );

        onEditFinished();
      } else {
        const newTask = await addTask(title, description, day);

        setTitle("");
        setDescription("");
        setDay("");

        dispatch(addTaskAdded(newTask));

        dispatch(
          showNotification({
            message: "Task added",
            type: "success",
          })
        );
      }
    } catch (error) {
      console.error(error);

      dispatch(
        showNotification({
          message: "Something went wrong",
          type: "error",
        })
      );
    }
  };

  return {
    title,
    description,
    day,
    setTitle,
    setDescription,
    setDay,
    titleInputRef,
    handleSubmit,
    isEditing: Boolean(editingTask),
  };
};

export default useTaskForm;
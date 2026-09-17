import useAppDispatch from "./useAppDispatch";
import { editTask, deleteTask } from "../api/tasks";
import { onTaskUpdated, onTaskDeleted } from "../redux/tasksSlice";
import type Task from "../types/task";

interface IUseTaskActions {
  task: Task;
}

export default function useTaskActions({ task }: IUseTaskActions) {
  const dispatch = useAppDispatch();

  const handleToggle = async () => {
    try {
      const updatedTask = await editTask(
        task._id,
        task.title,
        task.description,
        task.day,
        !task.completed
      );

      dispatch(onTaskUpdated(updatedTask));

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);

      dispatch(onTaskDeleted(task._id));

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {
    handleDelete,
    handleToggle,
  };
}
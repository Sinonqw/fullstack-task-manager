import { useEffect } from "react";
import { getTasks } from "../api/tasks";
import useAppDispatch from "./useAppDispatch";
import { setTasks } from "../redux/tasksSlice";

const useLoadTasks = (isAuthenticated: boolean) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadTasks = async () => {
      try {
        const data = await getTasks();

        dispatch(setTasks(data));
      } catch (error) {
        console.error(error);
      }
    };

    loadTasks();
  }, [dispatch]);
};

export default useLoadTasks;

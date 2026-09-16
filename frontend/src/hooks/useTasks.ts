import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export default function useTasks() {
  return useSelector((state: RootState) => state.tasks.tasks);
}

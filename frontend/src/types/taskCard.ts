import type Task from "./task";

export default interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

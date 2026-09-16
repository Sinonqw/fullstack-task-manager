import type Task from "./task";

export default interface TaskCardProps {
  _id: string;
  title: string;
  description: string;
  completed?: boolean;
  day: string;
  onEdit: (task: Task) => void;
}

import TaskCard from "./TaskCard";
import type Task from "../types/task";
import { useParams } from "react-router";
import useTasks from "../hooks/useTasks";

interface TasksListProps {
  onEdit: (task: Task) => void;
}

const TasksList = ({ onEdit }: TasksListProps) => {
  const { day } = useParams();
  const tasks = useTasks();

  const filteredTasks = tasks.filter(
    (task) => task.day.toLowerCase() === day?.toLowerCase(),
  );

  if (filteredTasks.length === 0)
    return (
      <div className="fixed left-[60%] max-w-md  top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-xl">
        <h1 className="text-2xl font-bold text-gray-800">
          No tasks for this day
        </h1>

        <p className="mt-3 text-gray-500">
          You don't have any tasks scheduled for {day}.
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Add a new task to get started.
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-3 justify-between  gap-4">
      {filteredTasks.map((task) => (
        <TaskCard key={task._id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TasksList;

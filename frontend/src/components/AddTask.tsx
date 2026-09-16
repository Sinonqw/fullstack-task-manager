import { useEffect, useState, useRef } from "react";
import { addTask, editTask } from "../api/tasks";
import type Task from "../types/task";
import { addTaskAdded, onTaskUpdated } from "../redux/tasksSlice";
import { showNotification } from "../redux/notificationsSlice";
import useAppDispatch from "../hooks/useAppDispatch";

interface AddTaskProps {
  editingTask: Task | null;
  onEditFinished: () => void;
}

const AddTask = ({ editingTask, onEditFinished }: AddTaskProps) => {
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
  return (
    <form
      className="
          group relative w-full max-w-[420px]
          overflow-hidden rounded-[18px]
          p-6
        "
      onSubmit={async (e) => {
        e.preventDefault();

        try {
          if (editingTask) {
            const updatedTask = await editTask(
              editingTask._id,
              title,
              description,
              day,
              editingTask.completed,
            );

            dispatch(onTaskUpdated(updatedTask));
            dispatch(
              showNotification({ message: "Task updated", type: "success" }),
            );
            onEditFinished();
          } else {
            const newTask = await addTask(title, description, day);

            setTitle("");
            setDescription("");
            setDay("");

            dispatch(addTaskAdded(newTask));
            dispatch(
              showNotification({ message: "Task added", type: "success" }),
            );
          }
        } catch (error) {
          console.error(error);
          dispatch(
            showNotification({
              message: "Something went wrong",
              type: "error",
            }),
          );
        }
      }}
    >
      <label
        htmlFor="task"
        className="
            mb-3 block
            text-xs font-semibold uppercase
            text-slate-400
          "
      >
        {editingTask ? "edit your task" : "add task"}
      </label>

      <div className="flex flex-col gap-3">
        <input
          ref={titleInputRef}
          id="task"
          type="text"
          placeholder="What needs to be done?"
          className="
              min-w-0 flex-1
              rounded-xl
              border border-slate-200
              bg-slate-50
              px-4 py-3
              text-sm text-slate-700
              outline-none
              placeholder:text-slate-400
              transition-all duration-200
              focus:ring-4
              focus:ring-[#4b35f5]/10
            "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label
          htmlFor="description"
          className="text-xs font-semibold uppercase text-slate-400"
        >
          Describe your task
        </label>

        <textarea
          id="description"
          name="description"
          placeholder="What needs to be done?"
          rows={4}
          className="
              min-h-[100px]
              w-full
              resize-none
              rounded-xl
              border border-slate-200
              bg-slate-50
              px-4 py-3
              text-sm text-slate-700
              outline-none
              placeholder:text-slate-400
              transition-all duration-200
              focus:ring-4
              focus:ring-[#4b35f5]/10
            "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label
          htmlFor="day"
          className="text-xs font-semibold uppercase text-slate-400"
        >
          Select day
        </label>

        <select
          id="day"
          name="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="
      w-full
      cursor-pointer
      rounded-xl
      border border-slate-200
      bg-slate-50
      px-4 py-3
      text-sm text-slate-700
      outline-none
      transition-all duration-200
      focus:ring-4
      focus:ring-[#4b35f5]/10
    "
        >
          <option value="" disabled>
            Select a day
          </option>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="
              shrink-0
              rounded-xl
              bg-[#4b35f5]
              px-5
              py-3
              text-sm font-semibold
              text-white
              transition-all duration-200
              hover:bg-[#402be8]
              uppercase
              cursor-pointer
            "
        >
          {editingTask ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default AddTask;

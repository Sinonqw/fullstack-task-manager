import { useState } from "react";
import type TaskCardProps from "../types/taskCard";
import useTaskActions from "../hooks/useTaskActions";

const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { handleDelete, handleToggle } = useTaskActions({ task });
  const { completed, day, description, title } = task;

  return (
    <article
      className={`group relative min-h-[210px] w-full max-w-[420px] overflow-hidden rounded-[18px] border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-[3px] hover:border-[#4b35f5]/25 hover:shadow-[0_12px_30px_rgba(45,55,75,0.08)] ${
        completed ? "bg-gradient-to-br from-white to-[#faf9ff]" : ""
      }`}
    >
      <div className="absolute inset-y-0 left-0 w-1 rounded-l-[18px] bg-gradient-to-b from-[#7c6cff] to-[#4b35f5]" />

      <div className="flex min-h-[210px] flex-col p-[22px] pl-[26px]">
        <div className="mb-[18px] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.02em] text-slate-400">
            <span
              className={`h-[7px] w-[7px] rounded-full ${
                completed
                  ? "bg-[#7464f8] shadow-[0_0_0_4px_rgba(116,100,248,0.1)]"
                  : "bg-[#4b35f5] shadow-[0_0_0_4px_rgba(75,53,245,0.1)]"
              }`}
            />

            <span>{completed ? "Completed" : "In progress"}</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              type="button"
              aria-label="Task menu"
              className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center gap-[3px] rounded-lg transition-colors hover:bg-slate-100"
            >
              <span className="h-[3px] w-[3px] rounded-full bg-slate-400" />
              <span className="h-[3px] w-[3px] rounded-full bg-slate-400" />
              <span className="h-[3px] w-[3px] rounded-full bg-slate-400" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-10 z-10 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_12px_30px_rgba(45,55,75,0.15)]">
                <button
                  onClick={async () => {
                    const success = await handleToggle();

                    if (success) {
                      setMenuOpen(false);
                    }
                  }}
                  type="button"
                  className="flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-[#4b35f5]/10 hover:text-[#4b35f5]"
                >
                  {completed ? "Mark as active" : "Mark as completed"}
                </button>

                <button
                  onClick={async () => {
                    const success = await handleDelete();

                    if (success) {
                      setMenuOpen(false);
                    }
                  }}
                  type="button"
                  className="flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                >
                  Delete task
                </button>
                <button
                  onClick={() => {
                    onEdit(task);
                    setMenuOpen(false);
                  }}
                  type="button"
                  className="flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-[#4b35f5]/10 hover:text-[#4b35f5]"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>

        <h3
          className={`mb-2 text-xl font-bold ${
            completed ? "text-slate-400 line-through" : "text-slate-800"
          }`}
        >
          {title}
        </h3>

        <p className="text-sm leading-6 text-slate-400">{description}</p>

        <span className="mt-auto pt-5 text-xs font-medium text-slate-400">
          {day}
        </span>
      </div>
    </article>
  );
};

export default TaskCard;

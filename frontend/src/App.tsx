import "./App.css";
import { Routes, Route } from "react-router";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TasksList from "./components/TasksList";
import useLoadTasks from "./hooks/useLoadTasks";
import useTaskEditor from "./hooks/useTaskEditor";
import Notification from "./components/Notification";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { startEditing, finishEditing, editingTask } = useTaskEditor();
  const { isAuthenticated } = useAuth0();

  useLoadTasks(isAuthenticated);

  return (
    <div className="flex flex-col gap-10">
      <Header />

      <Notification />

      {isAuthenticated ? (
        <div className="mt-23 pr-5 pl-5">
          <AddTask editingTask={editingTask} onEditFinished={finishEditing} />

          <hr className="mb-5 border-gray-300" />

          <Routes>
            <Route path="/:day" element={<TasksList onEdit={startEditing} />} />
          </Routes>
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-xl">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome to Task Manager
            </h1>

            <p className="mt-3 text-gray-500">
              Please log in to access your tasks.
            </p>

            <p className="mt-2 text-sm text-gray-400">
              You need to be authenticated to use this application.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

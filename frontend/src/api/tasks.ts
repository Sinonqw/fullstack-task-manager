import axios from "axios";
import type Task from "../types/task";

const API_URL = "http://localhost:5173/tasks";

//GET

export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get<Task[]>(API_URL);

  return res.data;
};

//POST

export const addTask = async (
  title: string,
  description: string,
  day: string,
): Promise<Task> => {
  const res = await axios.post<Task>(API_URL, {
    title,
    description,
    day,
  });

  return res.data;
};

//PUT

export const editTask = async (
  _id: string,
  title: string,
  description: string,
  day: string,
  completed: boolean,
): Promise<Task> => {
  const res = await axios.put<Task>(`${API_URL}/${_id}`, {
    title,
    description,
    day,
    completed,
  });

  return res.data;
};


//DELETE
export const deleteTask = async (_id: string): Promise<Task> => {
  const res = await axios.delete<Task>(`${API_URL}/${_id}`);
  return res.data;
};
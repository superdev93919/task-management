"use client";
const baseURL = process.env.NEXT_PUBLIC_BASE_CLIENT_SERVER_URL;
import { ITask } from "../../types/task";

export const fetchAllTasksAction = async () => {
  try {
    const res = await fetch(`${baseURL}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    return response.data; // Return the task data
  } catch (error) {
    console.log("Error", error);
    return []; // Return an empty array in case of error
  }
};

export const createTaskAction = async (task: ITask): Promise<ITask | null> => {
  try {
    const res = await fetch(`${baseURL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const response = await res.json();
    return response.data; // Return the created task data
  } catch (error) {
    console.log("Error", error);
    return null; // Return null in case of error
  }
};

export const updateTaskAction = async (task: ITask): Promise<ITask | null> => {
  try {
    const res = await fetch(`${baseURL}/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const response = await res.json();
    return response.data; // Return the updated task data
  } catch (error) {
    console.error("Error:", error);
    return null; // Return null in case of error
  }
};

export const removeTaskAction = async (_id: string): Promise<boolean> => {
  try {
    const res = await fetch(`${baseURL}/tasks/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    });

    await res.json();
    return true; // Return true if the deletion was successful
  } catch (error) {
    console.error("Error:", error);
    return false; // Return false in case of error
  }
};

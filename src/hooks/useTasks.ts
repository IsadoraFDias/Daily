import { useState, useEffect } from "react";

interface Task {
  task: string;
  time: string;
}

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Function to add a task and save it to localStorage
  const addTask = (task: string, time: string) => {
    if (task && time) {
      const newTask = { task, time };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);

      // Save tasks to localStorage with a timestamp
      const expirationDate = new Date();
      expirationDate.setHours(24, 0, 0, 0); // Set expiration to midnight
      localStorage.setItem(
        "tasks",
        JSON.stringify({ tasks: updatedTasks, expiresAt: expirationDate.getTime() })
      );
    }
  };

  // Function to check and clear expired tasks from localStorage
  const checkAndClearExpiredTasks = () => {
    const storedData = localStorage.getItem("tasks");
    if (storedData) {
      const { tasks, expiresAt } = JSON.parse(storedData);
      const now = new Date().getTime();
      if (now > expiresAt) {
        localStorage.removeItem("tasks");
        setTasks([]);
      } else {
        setTasks(tasks);
      }
    }
  };

  // Load tasks from localStorage on hook initialization
  useEffect(() => {
    checkAndClearExpiredTasks();
  }, []);

  return {
    tasks,
    addTask,
  };
}
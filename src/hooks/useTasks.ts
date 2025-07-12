import { useState, useEffect } from "react";

interface Task {
  task: string;
  time: string;
  checked: boolean;
}

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: string, time: string) => {
    if (task && time) {
      const newTask = { task, time, checked: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);

      const expirationDate = new Date();
      expirationDate.setHours(24, 0, 0, 0);
      localStorage.setItem(
        "tasks",
        JSON.stringify({
          tasks: updatedTasks,
          expiresAt: expirationDate.getTime(),
        })
      );
    }
  };

  const handleDelete = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify({ tasks: updatedTasks }));
  };

  
  const handleCheckboxChange = (index: number) => {
    const updatedTasks = tasks.map((task, i) => ({
      ...task,
      checked: i === index ? !task.checked : false, 
    }));
    setTasks(updatedTasks);  
  };

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


  useEffect(() => {
    checkAndClearExpiredTasks();
  }, []);

  return {
    tasks,
    addTask,
    handleDelete,
    handleCheckboxChange,
  };
}

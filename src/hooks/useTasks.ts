import { useState, useEffect } from "react";
import { formatInputTime } from "../utils/formatsTimer";

interface Task {
  task: string;
  time: string;
  checked: boolean;
}

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputTask, setInputTask] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [inputTime, setInputTime] = useState<string>("0:00:00");

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = event.target.value;
    const formattedInput = formatInputTime(rawInput);
    setInputTime(formattedInput);

    const [hours, minutes, seconds] = formattedInput.split(":").map(Number);
    const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
    setTime(timeInSeconds);
  };

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const task = event.target.value;
    setInputTask(task);
  }
  
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

      const storedData = JSON.parse(localStorage.getItem("tasks") || "{}");
  localStorage.setItem(
    "tasks",
    JSON.stringify({
      ...storedData,
      tasks: updatedTasks,
    })) 
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
    handleTimeChange,
    handleTaskChange,
    inputTask,
    inputTime,
    setInputTask,
    setInputTime,
    time,
    setTime,
  };
}

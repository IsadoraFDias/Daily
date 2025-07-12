import FormTask from "./components/FormTask/FormTask";
import styles from "./Tasks.module.css";
import Task from "./components/Task/Task";
import useTasks from "../../../../hooks/useTasks";

interface TasksProps {
  inputTime: string;
  inputTask: string;
  handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTaskChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePlay: () => void;
  handlePause: () => void;
  handleCheck: () => void;
}

export default function Tasks({
  inputTime,
  inputTask,
  handleTimeChange,
  handleTaskChange,
  handlePlay,
  handlePause,
  handleCheck,
}: TasksProps) {
  const { tasks, addTask, handleCheckboxChange, handleDelete } = useTasks();

  const handleAddTask = () => {
    addTask(inputTask, inputTime);
  };
  return (
    <div className={styles.columnForm}>
      <FormTask
        inputTime={inputTime}
        inputTask={inputTask}
        handleTimeChange={handleTimeChange}
        handleTaskChange={handleTaskChange}
        addTask={handleAddTask}
      />
      <div className={styles.boxTasks}>
        {tasks.length > 0 ? (
          tasks.map((t, index) => (
            <Task
              key={index}
              taskRegistered={`${t.task} - ${t.time}`}
              handleCheck={handleCheck}
              handlePause={handlePause}
              handlePlay={handlePlay}
              handleCheckboxChange={() => handleCheckboxChange(index)} 
              checked={t.checked}
              handleDelete={()=> handleDelete(index)}
            />
          ))
        ) : (
          <p className={styles.tasks}>Cadastre suas tarefas</p>
        )}
      </div>
    </div>
  );
}

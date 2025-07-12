import ButtonsCommands from "../ButtonsCommands/ButtonsCommands";
import styles from "./Task.module.css";

interface TaskProps {
  handlePlay: () => void;
  handlePause: () => void;
  handleCheck: () => void;
  taskRegistered?: string;
}
export default function Task({
  handleCheck,
  handlePause,
  handlePlay,
  taskRegistered,
}: TaskProps) {
  return (
    <div className={styles.boxTasks}>
      <p className={styles.tasks}>{taskRegistered}</p>
      <ButtonsCommands
        handleCheck={handleCheck}
        handlePause={handlePause}
        handlePlay={handlePlay}
      />
    </div>
  );
}

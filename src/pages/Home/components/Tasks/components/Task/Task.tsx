import ButtonsCommands from "../ButtonsCommands/ButtonsCommands";
import styles from "./Task.module.css";

interface TaskProps {
  handlePlay: () => void;
  handlePause: () => void;
  handleCheck: () => void;
  taskRegistered?: string;
  checked:boolean;
  handleCheckboxChange: () => void;
  handleDelete?: () => void;
}
export default function Task({
  handleCheck,
  handlePause,
  handlePlay,
  taskRegistered,
  checked,
  handleCheckboxChange,
  handleDelete,
}: TaskProps) {

  return (
    <div className={styles.boxTasks}>
      <button className={styles.buttonDelete} onClick={handleDelete}>
      <img src="/delete.png" className={styles.imageDelete} />
      </button>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          className={styles.selectionTask}
        />
        <p className={styles.tasks}>{taskRegistered}</p>
      </label>
      {checked && (
        <ButtonsCommands
          handleCheck={handleCheck}
          handlePause={handlePause}
          handlePlay={handlePlay}
        />
      )}
    </div>
  );
}

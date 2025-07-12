import styles from "./FormTask.module.css";

interface FormTaskProps {
  inputTime: string;
  inputTask: string;
  handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTaskChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void
}

export default function FormTask({
  inputTime,
  inputTask,
  handleTimeChange,
  handleTaskChange,
  addTask,
}: FormTaskProps) {
  return (
    <div className={styles.boxFormTask}>
      <div className={styles.boxInputTask}>
        <input
          value={inputTask}
          type="text"
          placeholder="Tarefa"
          className={styles.inputForm}
          onChange={handleTaskChange}
        />
      </div>
      <div className={styles.boxInputTime}>
        <input
          value={inputTime}
          type="text"
          placeholder="Tempo"
          className={styles.inputTime}
          onChange={handleTimeChange}
        />
      </div>
      <div className={styles.boxInputButton}>
        <button className={styles.buttonForm} onClick={addTask}>
          <img src="/checkCircle.png" className={styles.imageButton} />
        </button>
      </div>
    </div>
  );
}

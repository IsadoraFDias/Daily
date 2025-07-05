import styles from "./Counter.module.css";

export default function Counter() {
  return (
    <div className={styles.containerCounter}>
      <div id={styles.counter}>
        <p>11:45</p>
      </div>
      <div className={styles.commands}>
        <div className={styles.boxInput}>
          <input type="text" placeholder="Tempo" className={styles.inputTime} />
        </div>
        <div className={styles.boxButtons}>
          <button className={styles.buttonComands}><img src="/public/buttonPlay.png" className={styles.imageButton}/></button>
          <button className={styles.buttonComands}>Pausar</button>
          <button className={styles.buttonComands}>Parar</button>
        </div>
      </div>
    </div>
  );
}

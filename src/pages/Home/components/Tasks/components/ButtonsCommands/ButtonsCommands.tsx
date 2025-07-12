import styles from "./ButtonsCommands.module.css";

export default function ButtonsCommands({
  handlePlay,
  handlePause,
  handleCheck,
}: {
  handlePlay: () => void;
  handlePause: () => void;
  handleCheck: () => void;
}) {
  return (
    <div className={styles.boxButtons}>
      <button className={styles.buttonComands} onClick={handlePlay}>
        <img src="/buttonPlay.png" className={styles.imageButton} />
      </button>
      <button className={styles.buttonComands} onClick={handlePause}>
        <img src="/buttonPause.png" className={styles.imageButton} />
      </button>
      <button className={styles.buttonComands} onClick={handleCheck}>
        <img src="/check.png" className={styles.imageButton} />
      </button>
    </div>
  );
}

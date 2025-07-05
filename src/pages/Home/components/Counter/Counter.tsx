import { useState } from "react";
import styles from "./Counter.module.css";
import { formatInputTime, formatTime } from "../../../../utils/formatsTimer";

export default function Counter() {
  //contador e Timer
const [counter, setCounter] = useState(0);
const [time, setTime] = useState<number>(0)
const [inputTime, setInputTime] = useState<string>("0:00:00")
const [intervalId, setIntervalId] = useState<number | null>(null);


  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = event.target.value;
    const formattedInput = formatInputTime(rawInput);
    setInputTime(formattedInput);

    const [hours, minutes, seconds] = formattedInput.split(":").map(Number);
    const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
    setTime(timeInSeconds);
  };

//botões de controle
const handlePlay = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter < time) {
            return prevCounter + 1;
          } else {
            clearInterval(id);
            return prevCounter;
          }
        });
      }, 1000);
      setIntervalId(id);
    }
  };

const handlePause = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

const handleCheck = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setCounter(0);
    setTime(0);
    setInputTime("0:00:00");
};

  return (
    <div className={styles.containerCounter}>
      <div id={styles.counter}>
        <p>{formatTime(counter)}</p>
      </div>
      <div className={styles.commands}>
        <div className={styles.boxInput}>
          <input value={inputTime} type="text" placeholder="Tempo" className={styles.inputTime} onChange={handleTimeChange} />
        </div>
        <div className={styles.boxButtons}>
          <button className={styles.buttonComands} onClick={handlePlay}>
            <img src="/buttonPlay.png" className={styles.imageButton} />
          </button>
          <button className={styles.buttonComands} onClick={handlePause}>
            <img
              src="/buttonPause.png"
              className={styles.imageButton}
            />
          </button>
          <button className={styles.buttonComands} onClick={handleCheck}><img
              src="/check.png"
              className={styles.imageButton}
            /></button>
        </div>
      </div>
    </div>
  );
}

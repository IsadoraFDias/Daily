import { useCallback, useEffect, useState } from "react";
import styles from "./Counter.module.css";
import { formatInputTime, formatTime } from "../../../../utils/formatsTimer";
import './../../../../index.css';

export default function Counter() {
const [counter, setCounter] = useState(0);
const [time, setTime] = useState<number>(0)
const [inputTime, setInputTime] = useState<string>("0:00:00")
const [typeClick, setTypeClick] = useState<string>("");
const [intervalId, setIntervalId] = useState<number | null>(null);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = event.target.value;
    const formattedInput = formatInputTime(rawInput);
    setInputTime(formattedInput);

    const [hours, minutes, seconds] = formattedInput.split(":").map(Number);
    const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
    setTime(timeInSeconds);
  };

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
    setTypeClick("play");
  };

const handlePause = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTypeClick("pause");
  };

const handleCheck = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setCounter(0);
    setTime(0);
    setInputTime("0:00:00");
    setTypeClick("");
};

const borderStyleCounter = (command: string) => {
  switch (command) {
    case 'play':
      return { borderColor: "var(--alert-icon-color)" };
    case 'pause':
      return { borderColor: "var(--error-icon-color)" };
    case 'check':
      return { borderColor: "var(--success-icon-color)" };
    default:
      return { borderColor: "var(--text-color)" };
  }
};

const playAlertSound = () => {
  const alertSound = new Audio("/alertSound.wav"); 
  alertSound.play();
};

const checkCounterEnd = useCallback(() => {
  if (counter === time) {
    setTypeClick("check");
    playAlertSound();
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setTime(0);
    }
  }
}, [counter, time, intervalId]);




useEffect(() => {
  if (intervalId) {
    checkCounterEnd();
  }}, [counter, time, intervalId, checkCounterEnd]);


  return (
    <div className={styles.containerCounter}>
      <div id={styles.counter} style={borderStyleCounter(typeClick)}>
        <p>{formatTime(counter)}</p>
      </div>
      <div className={styles.commands}>
        <div className={styles.boxInput}>
          <input disabled={typeClick === "play" || typeClick === "pause"} value={inputTime} type="text" placeholder="Tempo" className={styles.inputTime} onChange={handleTimeChange} />
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

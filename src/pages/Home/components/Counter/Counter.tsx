import { useState } from "react";
import styles from "./Counter.module.css";
import { formatTime } from "../../../../utils/formatsTimer";

export default function Counter() {
  //contador e Timer
const [counter, setCounter] = useState(0);
const [time, setTime] = useState<number>(0)
const [inputTime, setInputTime] = useState<string>("")
const [intervalId, setIntervalId] = useState<number | null>(null);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
     const inputTime = event.target.value;
     const timeInSeconds = parseInt(inputTime, 10);
     setTime(timeInSeconds);
     setInputTime(inputTime);
     
  }

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
    setInputTime("");
};

  return (
    <div className={styles.containerCounter}>
      <div id={styles.counter}>
        <p>{formatTime(counter)}</p>
      </div>
      <div className={styles.commands}>
        <div className={styles.boxInput}>
          <input value={inputTime} type="text" placeholder="Tempo" className={styles.inputTime} onChange={handleTimeChange}/>
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

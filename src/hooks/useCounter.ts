import { useCallback, useEffect, useState } from "react";
import { convertTimeToSeconds } from "../utils/formatsTimer";

export default function useCounter() {
  const [typeClick, setTypeClick] = useState<string>("");
  const [counter, setCounter] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [time, setTime] = useState(0);

  const fetchCheckedTaskTime = useCallback((): number => {
    const storedData = JSON.parse(localStorage.getItem("tasks") || "{}");
    const checkedTask = storedData.tasks?.find(
      (task: { checked: boolean }) => task.checked
    );
    if (checkedTask) {
      return convertTimeToSeconds(checkedTask.time);
    }
    return 0;
  }, []);

  const resetCounter = useCallback(() => {
    setCounter(0);
    setTime(0);
    setTypeClick("");
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  const handlePlay = () => {
    const updatedTime = fetchCheckedTaskTime();

    if (updatedTime > 0 && !intervalId) {
      const id = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter < updatedTime) {
            return prevCounter + 1;
          } else {
            clearInterval(id);
            return prevCounter;
          }
        });
      }, 1000);
      setIntervalId(id);
    }
    setTime(updatedTime);
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
    resetCounter();
  };

  const borderStyleCounter = (command: string) => {
    switch (command) {
      case "play":
        return { borderColor: "var(--alert-icon-color)" };
      case "pause":
        return { borderColor: "var(--error-icon-color)" };
      case "check":
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
  }, [counter, time, intervalId, setTime]);

  useEffect(() => {
    if (intervalId) {
      checkCounterEnd();
    }
  }, [counter, time, intervalId, checkCounterEnd]);

  return {
    counter,
    typeClick,
    handlePlay,
    handlePause,
    handleCheck,
    borderStyleCounter,
    resetCounter,
  };
}

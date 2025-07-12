import Counter from "./components/Counter/Counter";
import Header from "../../components/Header/Header";
import styles from "./Home.module.css";
import useCounter from "../../hooks/useCounter";
import Tasks from "./components/Tasks/Tasks";

export default function Home() {
  const {
    counter,
    inputTime,
    inputTask,
    typeClick,
    handleTimeChange,
    handleTaskChange,
    handlePlay,
    handlePause,
    handleCheck,
    borderStyleCounter,
  } = useCounter();
  return (
    <>
      <Header currentPage="home" />
      <div className={styles.container}>
        <Counter
          counter={counter}
          typeClick={typeClick}
          borderStyleCounter={borderStyleCounter}
        />
        <Tasks
          inputTime={inputTime}
          inputTask={inputTask}
          handleTaskChange={handleTaskChange}
          handleTimeChange={handleTimeChange}
          handlePlay={handlePlay}
          handlePause={handlePause}
          handleCheck={handleCheck}
        />
      </div>
    </>
  );
}

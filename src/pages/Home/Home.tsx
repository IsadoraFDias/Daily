import Counter from "./components/Counter/Counter";
import Header from "../../components/Header/Header";
import styles from "./Home.module.css";
import useCounter from "../../hooks/useCounter";
import Tasks from "./components/Tasks/Tasks";

export default function Home() {
  const {
    counter,
    typeClick,
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
          handlePlay={handlePlay}
          handlePause={handlePause}
          handleCheck={handleCheck}
        />
      </div>
    </>
  );
}

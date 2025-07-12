import styles from "./Counter.module.css";
import { formatTime } from "../../../../utils/formatsTimer";
import './../../../../index.css';

interface CounterProps {
  counter: number;
  typeClick: string;
  borderStyleCounter: (type: string) => React.CSSProperties;
}

export default function Counter({counter, typeClick, borderStyleCounter}: CounterProps) {
  return (
        <div id={styles.counter} style={borderStyleCounter(typeClick)}>
          <p>{formatTime(counter)}</p>
      </div>
  );
}

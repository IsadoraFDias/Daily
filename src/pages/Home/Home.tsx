import styles from './Home.module.css';
import Counter from './components/Counter/Counter';

export default function Home(){
    return (
        <div>
        <h1 className={styles.title}>Diário de Tarefas</h1>
        <Counter />
        </div>
    )
}
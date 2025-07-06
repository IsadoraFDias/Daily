import Counter from './components/Counter/Counter';
import Header from '../../components/Header/Header';
import styles from './Home.module.css';

export default function Home(){
    return (
        <div className={styles.container}>
            <Header currentPage='home'/>
            <Counter />
        </div>
    )
}
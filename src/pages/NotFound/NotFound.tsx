import styles from './NotFound.module.css';

export default function NotFound() {
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Página não encontrada ou em construção</h1>
            <p>Desculpe, a página que você está procurando não existe ou está em construção.</p>
            <p>Por favor, volte mais tarde ou verifique a URL.</p>
            <button onClick={() => window.location.href = '/'} className={styles.button}>Ir para a página inicial</button>
        </div>
    )
}
import { Password } from "../Password/Password";
import styles from "./Form.module.css";

export function Form() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Register</h1>
        <form className={styles.form}>
          <label htmlFor="username" className={styles.label}>
            Nome:
            <input
              type="text"
              id="username"
              name="username"
              required
              className={styles.input}
            />
          </label>
          <label htmlFor="email" className={styles.label}>
            Email:
            <input
              type="email"
              id="email"
              name="email"
              required
              className={styles.input}
            />
          </label>
          <p className={styles.label}>Crie sua senha</p>
          <Password classNameLabel={styles.label} classNameInput={styles.input} />
          <button type="submit" className={styles.button}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 540);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 540);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.containerHeader}>
      <h1 className={styles.textHeader}>Diário de Tarefas</h1>
      <div
        className={styles.containerLinks}
        style={{ display: isMobile ? (isMenuOpen ? "flex" : "none") : "flex" }}
      >
        <h3>Login</h3>
        <h3>Cadastre-se</h3>
      </div>
      {isMobile && (
        <div className={styles.menuHamburger} onClick={toggleMenu}>
          ☰
        </div>
      )}
    </div>
  );
}
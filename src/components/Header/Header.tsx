import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
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

  const showOptions = () => {
    if (currentPage === "home") {
      return (
        <>
          <h3>Login</h3>
          <Link to="/register" className={styles.links}>
            <h3>Cadastre-se</h3>
          </Link>
        </>
      );
    } else if (currentPage === "login") {
      return (
        <>
          <Link to="/" className={styles.links}>
            <h3>Voltar</h3>
          </Link>
          <Link to="/register" className={styles.links}>
            <h3>Cadastre-se</h3>
          </Link>
        </>
      );
    } else if (currentPage === "register") {
      return (
        <>
          <Link to="/" className={styles.links}>
            <h3>Início</h3>
          </Link>
          <Link to="/login" className={styles.links}>
            <h3>Login</h3>
          </Link>
        </>
      );
    }
  };

  return (
    <div className={styles.containerHeader}>
      <h1 className={styles.textHeader}>Diário de Tarefas</h1>
      <div
        className={styles.containerLinks}
        style={{ display: isMobile ? (isMenuOpen ? "flex" : "none") : "flex" }}
      >
        {showOptions()}
      </div>
      {isMobile && (
        <div className={styles.menuHamburger} onClick={toggleMenu}>
          ☰
        </div>
      )}
    </div>
  );
}

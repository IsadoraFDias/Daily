import { useState } from "react";
import styles from "./Password.module.css";

interface PasswordProps {
  classNameLabel?: string;
  classNameInput?: string;
}

export function Password({ classNameLabel, classNameInput }: PasswordProps) {
  const [createPassword, setCreatePassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isConfirmPasswordBlurred, setIsConfirmPasswordBlurred] =
    useState<boolean>(false);

  const validatePasswords = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
    } else {
      setErrorMessage("");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setCreatePassword(newPassword);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    if (isConfirmPasswordBlurred) {
      validatePasswords(createPassword, newConfirmPassword);
    }
  };

  const handleConfirmPasswordBlur = () => {
    setIsConfirmPasswordBlurred(true);
    validatePasswords(createPassword, confirmPassword);
  };

  const intructionsLength = () => {
    if (createPassword.length >= 8) {
      return { color: "var(--success-icon-color)" };
    }
  };
  const intructionsUpperCase = () => {
    if (/[A-Z]/.test(createPassword)) {
      return { color: "var(--success-icon-color)" };
    }
  };
  const intructionsLowerCase = () => {
    if (/[a-z]/.test(createPassword)) {
      return { color: "var(--success-icon-color)" };
    }
  };
  const intructionsNumber = () => {
    if (/\d/.test(createPassword)) {
      return { color: "var(--success-icon-color)" };
    }
  };
  const intructionsSpecialCharacter = () => {
    if (/[\W_]/.test(createPassword)) {
      return { color: "var(--success-icon-color)" };
    }
  };

  return (
    <>
      <label htmlFor="password" className={classNameLabel}>
        Senha:
        <input
          value={createPassword}
          type="password"
          id="password"
          name="password"
          required
          className={classNameInput}
          onChange={handlePasswordChange}
        />
      </label>
      <label htmlFor="confirmPassword" className={classNameLabel}>
        Repita:
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          className={classNameInput}
          onChange={handleConfirmPasswordChange}
          onBlur={handleConfirmPasswordBlur}
        />
      </label>
      {isConfirmPasswordBlurred && errorMessage && (
        <p className={styles.error}>{errorMessage}</p>
      )}
      <div className={styles.container}>
        <p className={styles.text}>A senha deve conter:</p>
        <div>
          <p className={styles.textInstruction} style={intructionsLength()}>
            8 caracteres
          </p>
          <p className={styles.textInstruction} style={intructionsUpperCase()}>
            Letra maiuscula
          </p>
          <p className={styles.textInstruction} style={intructionsLowerCase()}>
            Letra minuscula
          </p>
          <p className={styles.textInstruction} style={intructionsNumber()}>
            Número
          </p>
          <p
            className={styles.textInstruction}
            style={intructionsSpecialCharacter()}
          >
            Caractere especial
          </p>
        </div>
      </div>
    </>
  );
}

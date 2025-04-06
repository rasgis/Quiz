import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>
            <Link to="/">Quiz App</Link>
          </h1>
          <nav className={styles.navigation}>
            <ul>
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/quiz">Пройти тест</Link>
              </li>
              <li>
                <Link to="/edit">Редактировать тест</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

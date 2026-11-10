import { Outlet, useLocation } from 'react-router-dom';
import styles from './AuthLayout.module.css';

export const AuthLayout = () => {

  const { pathname } = useLocation();

  // Detect if we are on the register page to make the card wider
  const isRegister = pathname.includes('/register');

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <div className={`${styles.card} ${isRegister ? styles.cardWide : ''}`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
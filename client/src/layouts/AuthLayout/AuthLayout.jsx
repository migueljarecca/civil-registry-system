import { Outlet} from 'react-router-dom';
import styles from './AuthLayout.module.css';

export const AuthLayout = () => {

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <div className={styles.card}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
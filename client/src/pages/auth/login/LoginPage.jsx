import { Link } from 'react-router-dom';
import { LoginForm } from '../../../components/auth/Login/LoginForm';
import styles from './LoginPage.module.css';
import { ArrowLeft } from '../../../assets/icons/Common/Common';

export const LoginPage = () => {
  return (
    <div className={styles.page}>

      <div className={styles.header}>

        <h1 className={styles.title}>Iniciar sesión</h1>
        <p className={styles.subtitle}>
          Ingresa con tu correo y contraseña para acceder al sistema.
        </p>

      </div>

      <LoginForm />

      <div className={styles.backHome}>
        <Link to="/" className={styles.backLink}>
          <ArrowLeft />
          <span>Volver al inicio</span>
        </Link>
      </div>
    </div>
  );
};
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, clearCurrentUser } from '../../../store/slices/usersSlice';
import { Spinner } from '../../../components/ui/Spinner/Spinner';
import { Alert } from '../../../components/ui/Alert/Alert';
import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { currentUser, loading, error } = useSelector((state) => state.users);

  const userId = user?.userId;

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
    return () => {
      dispatch(clearCurrentUser());
    };
  }, [dispatch, userId]);

  if (loading && !currentUser) {
    return <Spinner centered label="Cargando perfil..." />;
  }

  if (error) {
    return <Alert variant="error" title="Error al cargar el perfil">{error}</Alert>;
  }

  if (!currentUser) {
    return null;
  }

  // Format date to "12 of October of 2023"
  const formattedDate = new Date(currentUser.createdAt).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.page}>

      {/* Header Section (Only title) */}
      <div className={styles.header}>
        <h1 className={styles.title}>Mis datos personales</h1>
        <p className={styles.subtitle}>
          Información registrada en el sistema del Registro Civil.
        </p>
      </div>

      {/* Data Grid */}
      <div className={styles.card}>
        <dl className={styles.grid}>

          <div className={styles.dataGroup}>
            <dt className={styles.label}>Nombre</dt>
            <dd className={styles.value}>{currentUser.name}</dd>
          </div>

          <div className={styles.dataGroup}>
            <dt className={styles.label}>Apellido</dt>
            <dd className={styles.value}>{currentUser.lastname}</dd>
          </div>

          <div className={styles.dataGroup}>
            <dt className={styles.label}>DNI</dt>
            <dd className={styles.value}>{currentUser.dni}</dd>
          </div>

          <div className={styles.dataGroup}>
            <dt className={styles.label}>Correo electrónico</dt>
            <dd className={styles.value}>{currentUser.email}</dd>
          </div>

          <div className={`${styles.dataGroup} ${styles.fullWidth}`}>
            <dt className={styles.label}>Miembro desde</dt>
            <dd className={styles.value}>{formattedDate}</dd>
          </div>

        </dl>
      </div>

    </div>
  );
};
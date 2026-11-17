import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  fetchUserById,
  clearCurrentUser,
  clearUsersError,
  resetPasswordThunk,
  clearResetPasswordData
} from '../../../store/slices/usersSlice';
import { Card } from '../../../components/ui/Card/Card';
import { Badge } from '../../../components/ui/Badge/Badge';
import { Button } from '../../../components/ui/Button/Button';
import { Spinner } from '../../../components/ui/Spinner/Spinner';
import { Alert } from '../../../components/ui/Alert/Alert';
import { Modal } from '../../../components/ui/Modal/Modal';
import { Clipboard, Check } from '../../../assets/icons/Common/Common';

import styles from './UserDetailPage.module.css';


export const UserDetailPage = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentUser, loading, error, resetPasswordData } = useSelector((state) => state.users);

  // States for modals
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchUserById(id));
    return () => {
      dispatch(clearCurrentUser());
      dispatch(clearUsersError());
    };
  }, [id, dispatch]);

  // When the backend returns the password, we close the 
  // confirmation view and open the success view.
  useEffect(() => {
    if (resetPasswordData) {
      setIsConfirmOpen(false);
      setIsSuccessOpen(true);
    }
  }, [resetPasswordData]);

  // Function to copy to the clipboard
  const handleCopy = () => {
    if (resetPasswordData?.temporaryPassword) {
      navigator.clipboard.writeText(resetPasswordData.temporaryPassword);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Close success modal and clear data
  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
    dispatch(clearResetPasswordData());
  };

  const handleResetPassword = () => {
    dispatch(resetPasswordThunk(id));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && !currentUser) {
    return <Spinner centered label="Cargando detalles del usuario..." />;
  }

  if (error) {
    return <Alert variant="error" title="Error al cargar">{error}</Alert>;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <Link to="/admin/users" className={styles.backLink}>
            ← Volver al listado
          </Link>
          <h2 className={styles.title}>Detalle del Usuario</h2>
        </div>
        <div className={styles.headerActions}>
          {/* Botón de Reset Password */}
          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsConfirmOpen(true)}
            disabled={loading}
          >
            Resetear contraseña
          </Button>

          <Link to={`/admin/users/${currentUser.id}/edit`}>
            <Button variant="primary" size="md">Editar Usuario</Button>
          </Link>
        </div>
      </div>

      <div className={styles.gridContainer}>

        {/* Personal Information */}
        <div className={styles.mainColumn}>
          <Card title="Información Personal">
            <div className={styles.dataGrid}>
              <div className={styles.dataGroup}>
                <span className={styles.label}>Nombre</span>
                <span className={styles.value}>{currentUser.name}</span>
              </div>
              <div className={styles.dataGroup}>
                <span className={styles.label}>Apellido</span>
                <span className={styles.value}>{currentUser.lastname}</span>
              </div>
              <div className={styles.dataGroup}>
                <span className={styles.label}>DNI</span>
                <span className={styles.value}>{currentUser.dni}</span>
              </div>
              <div className={styles.dataGroup}>
                <span className={styles.label}>Correo electrónico</span>
                <span className={styles.value}>{currentUser.email}</span>
              </div>
              <div className={styles.dataGroup}>
                <span className={styles.label}>Estado de la cuenta</span>
                <div>
                  <Badge variant={currentUser.enabled ? 'success' : 'danger'} dot>
                    {currentUser.enabled ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
              </div>
              <div className={styles.dataGroup}>
                <span className={styles.label}>Roles asignados</span>
                <div className={styles.badgeGroup}>
                  {currentUser.roles.map((role) => (
                    <Badge key={role} variant={role === 'ROLE_ADMIN' ? 'primary' : 'neutral'}>
                      {role.replace('ROLE_', '')}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className={styles.sideColumn}>
          <Card title="Información del Sistema" padding="md">
            <div className={styles.auditList}>
              <div className={styles.auditItem}>
                <span className={styles.auditLabel}>ID de Usuario</span>
                <span className={styles.auditValue}>#{currentUser.id}</span>
              </div>
              <div className={styles.auditItem}>
                <span className={styles.auditLabel}>Creado el</span>
                <span className={styles.auditValue}>{formatDate(currentUser.createdAt)}</span>
              </div>
              <div className={styles.auditItem}>
                <span className={styles.auditLabel}>Creado por</span>
                <span className={styles.auditValue}>{currentUser.createdBy || 'Sistema'}</span>
              </div>
              <div className={styles.auditDivider}></div>
              <div className={styles.auditItem}>
                <span className={styles.auditLabel}>Última modificación</span>
                <span className={styles.auditValue}>{formatDate(currentUser.updatedAt)}</span>
              </div>
              <div className={styles.auditItem}>
                <span className={styles.auditLabel}>Modificado por</span>
                <span className={styles.auditValue}>{currentUser.updatedBy || '—'}</span>
              </div>
            </div>
          </Card>
        </div>

      </div>

      {/* ============ CONFIRMATION MODAL ============ */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="¿Resetear contraseña?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsConfirmOpen(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleResetPassword} loading={loading}>
              Sí, resetear
            </Button>
          </>
        }
      >
        <p>
          Estás a punto de generar una nueva contraseña temporal para <strong>{currentUser.email}</strong>.
        </p>
        <p style={{ marginTop: 'var(--space-md)', color: 'var(--color-danger)' }}>
          La contraseña actual dejará de funcionar inmediatamente.
        </p>
      </Modal>

      {/* ============ SUCCESS MODAL (Displays the key) ============ */}
      <Modal
        isOpen={isSuccessOpen}
        onClose={handleCloseSuccess}
        title="Contraseña generada"
        footer={
          <Button variant="primary" onClick={handleCloseSuccess}>Entendido</Button>
        }
      >
        <Alert variant="warning" title="¡Importante!">
          Esta contraseña no se volverá a mostrar. Copiala y envíasela al usuario.
        </Alert>

        <div className={styles.passwordBox}>
          <span className={styles.passwordText}>
            {resetPasswordData?.temporaryPassword}
          </span>

          <button
            type="button"
            className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
            onClick={handleCopy}
            title="Copiar contraseña"
          >
            {copied ? <Check /> : <Clipboard />}
          </button>
        </div>
      </Modal>

    </div>
  );
};
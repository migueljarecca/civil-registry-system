import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsers, deleteUserThunk, clearUsersError } from '../../../store/slices/usersSlice';
import { Button } from '../../../components/ui/Button/Button';
import { Alert } from '../../../components/ui/Alert/Alert';
import { Badge } from '../../../components/ui/Badge/Badge';
import { Spinner } from '../../../components/ui/Spinner/Spinner';
import { Eye, Pencil, Plus, Trash } from '../../../assets/icons/Common/Common';
import styles from './UserListPage.module.css';
import { Modal } from '../../../components/ui/Modal/Modal';

export const UserListPage = () => {

  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  // States for the deletion modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Open confirmation modal
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUserThunk(userToDelete.id));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  if (loading && users.length === 0) {
    return <Spinner centered label="Cargando usuarios..." />;
  }

  return (
    <div className={styles.page}>

      {/* Data Table Header */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Listado de Usuarios</h2>
          <p className={styles.subtitle}>Gestiona las cuentas y roles del sistema.</p>
        </div>
        <Link to="/admin/users/new">
          <Button variant="primary" size="md">
            <Plus />
            Nuevo Usuario
          </Button>
        </Link>
      </div>

      {/* Error Banner */}
      {error && (
        <Alert variant="error" title="Error" onClose={() => dispatch(clearUsersError())}>
          {error}
        </Alert>
      )}

      {/* Data Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>DNI</th>
              <th>Roles</th>
              <th>Estado</th>
              <th className={styles.textRight}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>

                {/* User (Name + Email) */}
                <td>
                  <div className={styles.userCell}>
                    <span className={styles.userName}>{u.name} {u.lastname}</span>
                    <span className={styles.userEmail}>{u.email}</span>
                  </div>
                </td>

                {/* DNI */}
                <td className={styles.cellText}>{u.dni}</td>

                {/* Roles */}
                <td>
                  <div className={styles.badgeGroup}>
                    {u.roles.map((role) => (
                      <Badge key={role} variant={role === 'ROLE_ADMIN' ? 'primary' : 'neutral'}>
                        {role.replace('ROLE_', '')}
                      </Badge>
                    ))}
                  </div>
                </td>

                {/* State*/}
                <td>
                  <Badge variant={u.enabled ? 'success' : 'danger'} dot>
                    {u.enabled ? 'Activo' : 'Inactivo'}
                  </Badge>
                </td>

                {/* Actions */}
                <td>
                  <div className={styles.actions}>
                    <Link to={`/admin/users/${u.id}`} title="Ver detalle">
                      <button className={styles.actionBtn}><Eye /></button>
                    </Link>
                    <Link to={`/admin/users/${u.id}/edit`} title="Editar">
                      <button className={styles.actionBtn}><Pencil /></button>
                    </Link>
                    <button
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() => handleDeleteClick(u)}
                      title="Eliminar"
                    >
                      <Trash />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ============ ELIMINATION MODAL ============ */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Eliminar usuario"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete} loading={loading}>
              Sí, eliminar
            </Button>
          </>
        }
      >
        <p>
          ¿Estás seguro de que deseas eliminar al usuario <strong>{userToDelete?.name} {userToDelete?.lastname}</strong>?
        </p>
        <p style={{ marginTop: 'var(--space-md)', color: 'var(--color-danger)', fontWeight: 'bold' }}>
          Esta acción no se puede deshacer.
        </p>
      </Modal>
    </div>
  );
};
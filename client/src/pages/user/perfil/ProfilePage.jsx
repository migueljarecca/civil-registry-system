import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchUserById,
  clearCurrentUser,
} from '../../../store/slices/usersSlice';

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
    return <p>Cargando perfil...</p>;
  }

  if (error) {
    return <div className="error-banner">{error}</div>;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <h1>Mi perfil</h1>

      <dl>
        <dt>Nombre</dt>
        <dd>{currentUser.name} {currentUser.lastname}</dd>

        <dt>DNI</dt>
        <dd>{currentUser.dni}</dd>

        <dt>Email</dt>
        <dd>{currentUser.email}</dd>

        <dt>Roles</dt>
        <dd>{currentUser.roles.join(', ')}</dd>

        <dt>Estado</dt>
        <dd>{currentUser.enabled ? 'Activo' : 'Inactivo'}</dd>

        <dt>Miembro desde</dt>
        <dd>{new Date(currentUser.createdAt).toLocaleString()}</dd>
      </dl>

      <Link to="/profile/edit">Editar perfil</Link>
      {' | '}
      <Link to="/profile/change-password">Cambiar contraseña</Link>
    </div>
  );
};
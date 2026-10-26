// src/pages/users/UserDetailPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { clearCurrentUser, 
  fetchUserById, 
  resetPasswordThunk, 
  clearResetPasswordData 
} from '../../../store/slices/usersSlice';

export const UserDetailPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser, loading, error, resetPasswordData } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserById(id));
    return () => {
      dispatch(clearCurrentUser());
    };
  }, [dispatch, id]);


  // Mostrar el password temporal cuando llegue
  useEffect(() => {
    if (resetPasswordData) {
      window.alert(
        `Contraseña temporal para ${resetPasswordData.email}:\n\n${resetPasswordData.temporaryPassword}\n\nGuárdala y compártela con el usuario.`
      );
      dispatch(clearResetPasswordData());
    }
  }, [resetPasswordData, dispatch]);

  const handleResetPassword = () => {
    if (window.confirm('¿Resetear la contraseña de este usuario? Se generará una nueva temporal.')) {
      dispatch(resetPasswordThunk(id));
    }
  };


  if (loading && !currentUser) {
    return <p>Cargando usuario...</p>;
  }

  if (error) {
    return (
      <div>
        <div className="error-banner">{error}</div>
        <Link to="/admin/users">Volver a la lista</Link>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <h1>{currentUser.name} {currentUser.lastname}</h1>

      <dl>
        <dt>ID</dt>
        <dd>{currentUser.id}</dd>

        <dt>DNI</dt>
        <dd>{currentUser.dni}</dd>

        <dt>Email</dt>
        <dd>{currentUser.email}</dd>

        <dt>Roles</dt>
        <dd>{currentUser.roles?.join(', ') || 'Sin roles'}</dd>

        <dt>Estado</dt>
        <dd>{currentUser.enabled ? 'Activo' : 'Inactivo'}</dd>

        <dt>Creado</dt>
        <dd>{new Date(currentUser.createdAt).toLocaleString()}</dd>

        <dt>Creado por</dt>
        <dd>{currentUser.createdBy}</dd>
      </dl>


      <div>
        <button onClick={() => navigate(`/admin/users/${id}/edit`)}>Editar</button>

        <button onClick={handleResetPassword} disabled={loading}>
          {loading ? 'Reseteando...' : 'Reset password'}
        </button>

        <Link to="/admin/users">Volver a la lista</Link>
      </div>

    </div>

  );
};
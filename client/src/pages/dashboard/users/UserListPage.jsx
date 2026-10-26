import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsers, deleteUserThunk, clearUsersError } from '../../../store/slices/usersSlice';

export const UserListPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      dispatch(deleteUserThunk(id));
    }
  };

  if (loading && users.length === 0) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div>
      <h1>Usuarios</h1>

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => dispatch(clearUsersError())}>X</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name} {u.lastname}</td>
              <td>{u.email}</td>
              <td>{u.roles.join(', ')}</td>
              <td>{u.enabled ? 'Activo' : 'Inactivo'}</td>
              <td>
                <Link to={`/admin/users/${u.id}`}>Ver</Link>
                {' | '}
                <Link to={`/admin/users/${u.id}/edit`}>Editar</Link>
                {' | '}
                <button onClick={() => handleDelete(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/admin/users/new">Crear usuario</Link>
    </div>
  );
};
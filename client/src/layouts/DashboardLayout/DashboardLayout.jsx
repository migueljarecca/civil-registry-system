// src/layouts/DashboardLayout/DashboardLayout.jsx
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

export const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  };

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <span>Admin - {user?.sub}</span>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>

      <div className="admin-body">
        <aside className="admin-sidebar">
          <nav>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/users">Usuarios</Link>
            {/* más opciones de admin */}
          </nav>
        </aside>

        <main className="admin-main">
          <Outlet />   {/* ← Aquí se renderiza DashboardPage, UserListPage, etc. */}
        </main>
      </div>

      <footer className="admin-footer">
        <p>© 2026 Civil Registry System - Admin</p>
      </footer>
    </div>
  );
};
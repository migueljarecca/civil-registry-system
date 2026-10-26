// src/layouts/UserLayout/UserLayout.jsx
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

import './UserProfileLayout.css';

export const UserLayout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  };

  return (
    <div className="user-layout">
      {/* Header */}
      <header className="user-header">
        <span>Hola, {user?.sub}</span>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>

      {/* Contenedor principal con sidebar izquierdo, main y sidebar derecho */}
      <div className="user-body">
        {/* Sidebar izquierdo */}
        <aside className="user-sidebar-left">
          <nav>
            <Link to="/profile">Mi perfil</Link>
            <Link to="/profile/edit">Editar perfil</Link>
            <Link to="/profile/change-password">Cambiar contraseña</Link>
          </nav>
        </aside>

        {/* Main: aquí cambia el contenido */}
        <main className="user-main">
          <Outlet />   {/* ← Aquí se renderiza ProfilePage, ProfileEditPage, etc. */}
        </main>

        {/* Sidebar derecho */}
        <aside className="user-sidebar-right">
          {/* Widgets, info adicional, etc. */}
        </aside>
      </div>

      {/* Footer */}
      <footer className="user-footer">
        <p>© 2026 Civil Registry System</p>
      </footer>
    </div>
  );
};
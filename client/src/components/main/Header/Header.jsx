import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';
import { Clock, Phone, User, Bars3, XMark } from '../../../assets/icons/Common/Common';

import { Facebook, Twitter } from '../../../assets/icons/Social/Social';
import { Button } from '../../ui/Button/Button';
import styles from './Header.module.css';
import { Logo } from '../../../assets/icons/Logo/Logo';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = user?.roles?.includes('ROLE_ADMIN');
  const userEmail = user?.sub;

  const handleLogout = () => {
    dispatch(logout());
    setMobileOpen(false);
    navigate('/');
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={styles.header}>
      {/* ============ TOP BAR ============ */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.topInfo}>
            <div className={styles.topItem}>
              <Clock />
              <span>Lun - Vie, 8am - 12pm y 3pm - 8pm</span>
            </div>
            <div className={styles.topItem}>
              <Phone />
              <span>970 449 496</span>
            </div>
          </div>
          <div className={styles.topSocial}>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter />
            </a>
          </div>
        </div>
      </div>

      {/* ============ MAIN BAR ============ */}
      <div className={styles.mainBar}>
        <div className={styles.container}>
          <Link to="/" className={styles.brand} onClick={closeMobile}>
            <div className={styles.logoWrapper}>
              <Logo />
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>Registro Civil</span>
              <span className={styles.brandSubtitle}>Distrito de Huanuara</span>
            </div>
          </Link>

          {/* Desktop actions */}
          <nav className={styles.desktopActions}>
            {!isAuthenticated ? (
              <>
                <Link to="/auth/login" className={styles.authLink}>
                  Iniciar sesión
                </Link>
                <Link to="/auth/register">
                  <Button variant="primary" size="md">
                    Registrarse
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {isAdmin && (
                  <Link to="/admin" className={styles.authLink}>
                    Dashboard
                  </Link>
                )}
                <Link to="/profile" className={styles.authLink}>
                  <span className={styles.userIcon}>
                    <User />
                  </span>
                  Mi perfil
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={styles.authLink}
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <XMark /> : <Bars3 />}
          </button>
        </div>
      </div>

      {/* ============ NAV ============ */}
      <nav
        className={`${styles.navBar} ${mobileOpen ? styles.navBarOpen : ''}`}
      >
        <div className={styles.container}>
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                }
                onClick={closeMobile}
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                }
                onClick={closeMobile}
              >
                Servicios
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                }
                onClick={closeMobile}
              >
                Contacto
              </NavLink>
            </li>
          </ul>

          {/* Mobile auth actions */}
          {mobileOpen && (
            <div className={styles.mobileAuth}>
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/auth/login"
                    className={styles.authLink}
                    onClick={closeMobile}
                  >
                    Iniciar sesión
                  </Link>
                  <Link to="/auth/register" onClick={closeMobile}>
                    <Button variant="primary" size="md" fullWidth>
                      Registrarse
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className={styles.authLink}
                      onClick={closeMobile}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className={styles.authLink}
                    onClick={closeMobile}
                  >
                    <span className={styles.userIcon}>
                      <User />
                    </span>
                    {userEmail || 'Mi perfil'}
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={styles.authLink}
                  >
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
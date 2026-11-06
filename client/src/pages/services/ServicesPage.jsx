import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './ServicesPage.module.css';

const sidebarServices = [
  { to: '/services', label: 'Todos los servicios', end: true },
  { to: '/services/birth', label: 'Inscripción de nacimiento' },
  { to: '/services/marriage', label: 'Matrimonio civil' },
  { to: '/services/death', label: 'Inscripción de defunción' },
  { to: '/services/certificates', label: 'Solicitud de partidas digitales' },
];

export const ServicesPage = () => {
  const { pathname } = useLocation();

  // scroll to the top when the page changes (e.g., from birth to marriage)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className={styles.page}>
      {/* ============ HERO ============ */}
      <header className={styles.hero}>
        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/" className={styles.breadcrumbLink}>Inicio</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>Servicios</span>
          </nav>

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Servicios</h1>
          </div>
        </div>
      </header>

      {/* ============ GRID: SIDEBAR + OUTLET ============ */}
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <nav className={styles.sidebarNav} aria-label="Navegación de servicios">
              <ul className={styles.sidebarList}>
                {sidebarServices.map((service) => (
                  <li key={service.to}>
                    <NavLink
                      to={service.to}
                      end={service.end}
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.sidebarLink} ${styles.sidebarLinkActive}`
                          : styles.sidebarLink
                      }
                    >
                      {service.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <main className={styles.content}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
import { NavLink, Outlet } from 'react-router-dom';
import { ProfileHeader } from '../../components/main/Header/ProfileHeader';
import { Footer } from '../../components/main/Footer/Footer';
import styles from './UserProfileLayout.module.css';

const menuItems = [
  { to: '/profile', label: 'Mi perfil', end: true },
  { to: '/profile/edit', label: 'Editar perfil' },
  { to: '/profile/change-password', label: 'Cambiar contraseña' },
];

export const UserProfileLayout = () => {
  return (
    <div className={styles.layout}>
      <ProfileHeader />

      <div className={styles.mainWrapper}>
        <div className={styles.container}>

          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Mi cuenta</h2>
            <nav className={styles.nav} aria-label="Navegación de perfil">
              <ul className={styles.navList}>
                {menuItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        isActive
                          ? `${styles.navLink} ${styles.navLinkActive}`
                          : styles.navLink
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className={styles.content}>
            <Outlet />
          </main>

        </div>
      </div>

      <Footer />
    </div>
  );
};
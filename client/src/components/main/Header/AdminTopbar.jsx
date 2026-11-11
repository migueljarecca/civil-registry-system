import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Bars3, GlobeAlt, UserCircle } from '../../../assets/icons/Common/Common';
import styles from './AdminTopbar.module.css';

// Function to get the title based on the route
const getPageTitle = (pathname) => {
    if (pathname.includes('/admin/dashboard')) return 'Dashboard';
    if (pathname.includes('/admin/users')) return 'Gestión de Usuarios';
    if (pathname.includes('/admin/citizens')) return 'Gestión de Ciudadanos';
    return 'Panel de Administración';
};

export const AdminTopbar = ({ onMenuClick }) => {

    const location = useLocation();
    const { user } = useSelector((state) => state.auth);

    const title = getPageTitle(location.pathname);

    return (
        <header className={styles.topbar}>

            {/* Left Side: Menu + Title*/}
            <div className={styles.left}>
                <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Abrir menú">
                    <Bars3 />
                </button>
                <h1 className={styles.pageTitle}>{title}</h1>
            </div>

            {/* Right Side: Actions + Profile */}
            <div className={styles.right}>
                <Link to="/" target="_blank" rel="noopener noreferrer" className={styles.siteLink}>
                    <GlobeAlt />
                    <span>Ver sitio web</span>
                </Link>

                <div className={styles.divider}></div>

                <div className={styles.userProfile}>
                    <span className={styles.avatar}>
                        <UserCircle />
                    </span>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>Administrador</span>
                        <span className={styles.userEmail}>{user?.sub}</span>
                    </div>
                </div>
            </div>

        </header>
    );
};
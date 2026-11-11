import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';
import { Logo } from '../../../assets/icons/Logo/Logo';
import {
    Squares2X2,
    Users,
    Identification,
    ArrowRightOnRectangle
} from '../../../assets/icons/Common/Common';
import styles from './AdminSidebar.module.css';

const menuSections = [
    {
        title: 'Principal',
        items: [
            { to: '/admin/dashboard', label: 'Dashboard', icon: <Squares2X2 /> },
        ]
    },
    {
        title: 'Gestión',
        items: [
            { to: '/admin/users', label: 'Usuarios', icon: <Users /> },
            { to: '/admin/citizens', label: 'Ciudadanos', icon: <Identification /> },
        ]
    }
];

// We receive the props isOpen and onClose from the layout .
export const AdminSidebar = ({ isOpen, onClose }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>

            {/* Brand */}
            <div className={styles.brand}>
                <Link to="/admin/dashboard" className={styles.brandLink} onClick={onClose}>
                    <span className={styles.logoWrapper}>
                        <Logo />
                    </span>
                    <span className={styles.brandText}>
                        <span className={styles.brandTitle}>Registro Civil</span>
                        <span className={styles.brandSubtitle}>Panel Admin</span>
                    </span>
                </Link>
            </div>

            {/* Section Navigation */}
            <nav className={styles.nav}>
                {menuSections.map((section, index) => (

                    <div key={index} className={styles.navSection}>

                        <h3 className={styles.sectionTitle}>{section.title}</h3>
                        <ul className={styles.navList}>

                            {section.items.map((item) => (
                                <li key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        onClick={onClose}
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${styles.navLink} ${styles.navLinkActive}`
                                                : styles.navLink
                                        }
                                    >
                                        <span className={styles.navIcon}>{item.icon}</span>
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>

            {/* Sidebar Footer*/}
            <div className={styles.footer}>
                <div className={styles.userInfo}>
                    <span className={styles.userEmail}>{user?.sub}</span>
                    <span className={styles.userRole}>Administrador</span>
                </div>

                <button type="button" onClick={handleLogout} className={styles.logoutBtn}>
                    <ArrowRightOnRectangle />
                    Cerrar sesión
                </button>
            </div>

        </aside>
    );
};
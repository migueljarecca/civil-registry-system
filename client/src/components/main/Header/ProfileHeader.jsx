import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';
import { Logo } from '../../../assets/icons/Logo/Logo';
import { User, ArrowRightOnRectangle } from '../../../assets/icons/Common/Common';
import { Button } from '../../ui/Button/Button';
import styles from './ProfileHeader.module.css';

export const ProfileHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>

                {/* Brand */}
                <Link to="/" className={styles.brand}>
                    <span className={styles.logoWrapper}>
                        <Logo />
                    </span>
                    <span className={styles.brandText}>
                        <span className={styles.brandTitle}>Registro Civil</span>
                        <span className={styles.brandSubtitle}>Mi cuenta</span>
                    </span>
                </Link>

                {/* User Actions */}
                <div className={styles.actions}>

                    <span className={styles.userEmail}>
                        <User /> {user?.sub}
                    </span>

                    <Button variant="secondary" size="sm" onClick={handleLogout}>
                        <ArrowRightOnRectangle />
                        Cerrar sesión
                    </Button>

                </div>
            </div>
        </header>
    );
};
import { CheckCircle, ExclamationTriangle, InformationCircle, XMark } from '../../../assets/icons/Alert/Alert';
import styles from './Alert.module.css';

const defaultIcons = {
  error: <ExclamationTriangle />,
  success: <CheckCircle />,
  warning: <ExclamationTriangle />,
  info: <InformationCircle />,
};

export const Alert = ({
  children,
  variant = 'info',
  title,
  icon,
  onClose,
  className = '',
  ...rest
}) => {
  const classes = [
    styles.alert,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const role = variant === 'error' || variant === 'warning' ? 'alert' : 'status';
  const showIcon = icon !== false;
  const iconContent = icon || defaultIcons[variant];

  return (
    <div className={classes} role={role} {...rest}>
      {showIcon && (
        <span className={styles.icon} aria-hidden="true">
          {iconContent}
        </span>
      )}

      <div className={styles.content}>
        {title && <strong className={styles.title}>{title}</strong>}
        {children && <div className={styles.message}>{children}</div>}
      </div>

      {onClose && (
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Cerrar"
        >
          <XMark />
        </button>
      )}
    </div>
  );
};
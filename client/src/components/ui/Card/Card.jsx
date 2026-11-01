import styles from './Card.module.css';

export const Card = ({
  children,
  title,
  subtitle,
  actions,
  footer,
  padding = 'md',
  interactive = false,
  className = '',
  ...rest
}) => {
  const classes = [
    styles.card,
    styles[`padding-${padding}`],
    interactive ? styles.interactive : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasHeader = title || subtitle || actions;

  return (
    <div className={classes} {...rest}>
      {hasHeader && (
        <div className={styles.header}>
          <div className={styles.headerText}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}

      <div className={styles.body}>{children}</div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};
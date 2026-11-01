import styles from './Spinner.module.css';

export const Spinner = ({
  size = 'md',
  color = 'current',
  centered = false,
  label,
  className = '',
}) => {
  const spinnerClasses = [
    styles.spinner,
    styles[size],
    color !== 'current' ? styles[color] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const spinnerEl = (
    <>
      <span className={spinnerClasses} aria-hidden="true" />
      {label && <span className={styles.label}>{label}</span>}
      <span className="srOnly" role="status" aria-live="polite">
        {label || 'Cargando...'}
      </span>
    </>
  );

  if (centered) {
    return <div className={styles.centered}>{spinnerEl}</div>;
  }

  return spinnerEl;
};
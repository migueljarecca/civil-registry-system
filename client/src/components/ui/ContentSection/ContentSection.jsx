import styles from './ContentSection.module.css';

export const ContentSection = ({ id, title, children, className = '' }) => {
  return (
    <section id={id} className={`${styles.section} ${className}`}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
};
import styles from './StepList.module.css';

export const StepList = ({ steps }) => {
  return (
    <ol className={styles.list}>
      {steps.map((step, index) => (
        <li key={index} className={styles.step}>
          <div className={styles.number}>{index + 1}</div>
          <div className={styles.text}>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.description}>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
};
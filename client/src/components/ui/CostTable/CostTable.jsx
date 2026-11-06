import styles from './CostTable.module.css';

export const CostTable = ({ items }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className={styles.label}>{item.label}</td>
              <td className={styles.price}>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
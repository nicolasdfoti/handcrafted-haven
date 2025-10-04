import styles from '../sellers/styles/sellers.module.scss';

export function FormControl(props) {
  const { id, label, className, ...rest } = props;
  return (
    <div className={styles.control}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input id={id} className={`${styles.input} ${className ?? ""}`} {...rest} />
    </div>
  );
}
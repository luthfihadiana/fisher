import styles from './index.module.scss';

export default function pageHeader({
  left = null,
  right= null,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.section}>{left}</div>
      <div className={styles.section}>{right}</div>
    </div>
  );
}
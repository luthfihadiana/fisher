import styles from './index.module.scss';

export default function Button({
  variant = null,
  ...props
}) {
  return (
    <button
      className={`${styles.button} ${variant ? styles[variant]: ''}`}
      {...props}
    >
      {props.children}
    </button>
  );
}
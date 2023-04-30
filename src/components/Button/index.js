import styles from './index.module.scss';
import cn from 'classnames';

export default function Button({
  variant = null,
  icons=null,
  className,
  outline,
  ...props
}) {
  return (
    <button
      className={cn(styles.button, {
        [styles[variant]]: !!variant,
        [styles.outline]: outline,
      }, className)}
      {...props}
    >
      {icons && <span className="material-icons">{icons}</span>}
      {props.children}
    </button>
  );
}
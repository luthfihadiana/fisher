import styles from './index.module.scss';
import cn from 'classnames';


export default function Input({
  className,
  ...props
}) {
  return <input {...props} className={cn(styles.input, className)} />;
}
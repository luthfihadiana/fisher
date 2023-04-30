import styles from './index.module.scss';
import Image from 'next/image';


export default function LoadingIndicator() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingSpinner}>
        <figure>
          <Image
            width={10}
            height={10}
            loading="lazy"
            src={'/fishery.png'}
            alt="loading-indicator"
          />
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </figure>
      </div>
    </div>
  );
}

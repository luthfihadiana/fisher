import '@/styles/globals.scss';
import {Navbar} from '@/components';
import styles from '@/styles/app.module.scss';


export default function App({ Component, pageProps }) {
  return (
    <div className={styles.app}>
      <Navbar/>
      <div className={styles.pageContainer}>
        <div className={styles.page}>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

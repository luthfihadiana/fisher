import React from 'react';
import { Controller as RHFController } from "react-hook-form";
import styles from './index.module.scss';

const Controller = ({
  control,
  children,
  name,
}) =>(
  <RHFController
    control={control}
    render={({ field: { onChange, value } , fieldState: {error}}) => (
      <div className={styles.item}>
        {React.cloneElement(
          children,
          {value, onChange}
        )}
        {error?.message && <span className={styles.error}>{error?.message}</span>}
      </div>
    )}
    name={name}
  />
);

export default Controller;

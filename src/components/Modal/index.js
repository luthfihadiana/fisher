import React, { useState, forwardRef, useImperativeHandle } from "react";

import cn from 'classnames';

import styles from './index.module.scss';

const Index = ({
  bigger,
  title,
  headless,
  noneCancel,
  fullscreen,
  children,
  actButton,
}, ref) => {
  const [show, setShowModal] = useState(false);
  const showModal = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  useImperativeHandle(ref, () => {
    return {
      showModal: showModal,
      hideModal: hideModal,
      status: show
    };
  });
  return (
    <div className={cn(styles.modalBackdrop,{[styles.hide]: !show})}>
      <div className={cn(styles.modal, {[styles.modalBigger]:bigger})}>
        <div
          className={cn(styles.header, {[styles.headerHeadless]:headless})}
        >
          {!headless && <p className={styles.title}>{title}</p>}
          {!noneCancel && (
            <span className={styles.cancelButton} onClick={() => hideModal()}>
              <span className="material-icons">clear</span>
            </span>
          )}
        </div>
        {!headless && <hr className={styles.separator}/>}
        <div
          className={cn(styles.content,{[styles.contentFullscreen]: fullscreen})}
        >
          {children}
        </div>
        <div className={styles.submit}>{actButton}</div>
      </div>
    </div>
  );
};

export default forwardRef(Index);

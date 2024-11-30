import React from 'react';
import styles from './modal.module.css';

const AlertModal = ({ open, onClose, title, message }) => {
  if (!open) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.modalButtonArea}>
          <button onClick={onClose} className={styles.modalButtonConfirm}>
            확인
          </button>
          <button onClick={onClose} className={styles.modalButtonConfirm}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;

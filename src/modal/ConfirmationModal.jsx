import React from 'react'
import styles from './modal.module.css';
import { Modal } from '@mui/material';
const ConfirmationModal = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Modal open={open} onClose={onClose} className={styles.modal}>
    <div className={styles.modalContent}>
      <h2>{title}</h2>
      <p>{message}</p>
      <div className={styles.modalButtonArea}>
        <button onClick={onConfirm} className={styles.modalButtonConfirm}>
          확인
        </button>
        <button onClick={onClose} className={styles.modalButtonCancel}>
          취소
        </button>
      </div>
    </div>
  </Modal>
  )
}

export default ConfirmationModal

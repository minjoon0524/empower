import React from 'react'
import Modal from "react-modal";
import styles from "./modal.module.css"


const customStyles = {
    overlay: {
      backgroundColor: 'transparent',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'flex-start', // 위쪽 정렬
      justifyContent: 'center', // 수평 중앙 정렬
    },
    content: {
      top: '20px', // 원하는 위치로 조정
      padding: '16px',
      borderRadius: '8px',
      backgroundColor: 'white',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      border: '1px solid #e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // 수평 중앙 정렬
      gap: '12px',
      position: 'relative', // 상대 위치 설정
      margin: '0 auto', // 수평 중앙 정렬
    }
  };
const ToastModal = ({isToastVisible,setIsToastVisible,toastMessage}) => {

    // Modal 스타일 설정

  return (
    <Modal
    isOpen={isToastVisible}
    onRequestClose={() => setIsToastVisible(false)}
    style={customStyles}
    closeTimeoutMS={200}
  >
    {toastMessage === "거절되었습니다." ? (
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" fill="#F44336"/>
        <path 
          d="M8 8L16 16M16 8L8 16" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" fill="#4CAF50"/>
        <path 
          d="M8 12L11 15L16 9" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    )}
    <span>
      {toastMessage}
    </span>
  </Modal>
  )
}

export default ToastModal

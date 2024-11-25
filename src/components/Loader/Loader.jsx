import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = () => {
  return (
<div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }}>
        
      <ClipLoader color="#36D7B7" size={50} />
    </div>
  )
}

export default Loader

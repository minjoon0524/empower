import React from 'react'
import style from"./Login.module.css"
import LoginComponent from '../../components/Login/LoginComponent'
const LoginPage = () => {
  return (
    <div className={style.container}>
      <LoginComponent/>
    </div>
  )
}

export default LoginPage

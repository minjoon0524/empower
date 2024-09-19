import React from 'react'
import style from "./JoinComponent.module.css"
import { useNavigate } from 'react-router-dom'
const JoinComponent = () => {
  const navigate=useNavigate();

  const goToLogin=()=>{
    navigate('/login');
  }

  return (
    <div className={style.container}>
    <div className={style.contents}>
      <div className={style.contents_box}>
        {/* 첫번째 */}
        <div className={style.logo}>
          <h1>EMPOWER</h1>
          <h2 className={style.title}>회원가입을 통해, EMPOWER와 함께해요.</h2>
        </div>

        {/* 두번째 */}
        <div className={style.logo}>
          <div className={style.input_cover}>
            <input
              type="text"
              className={style.input}
              placeholder="사번"
            />
          </div>
          <div className={style.input_cover}>
           
            <input
              className={style.input}
              type='password'
              placeholder="비밀번호"
            />
          </div>

          <div className={style.input_cover}>
           <input
             className={style.input}
             placeholder="이름"
           />
         </div>

         <div className={style.input_cover}>
           <input
             className={style.input}
             placeholder="소속"
           />
         </div>

         <div className={style.input_cover}>
           <input
           type='text'
             className={style.input}
             placeholder="직급"
           />
         </div>
         
         <div className={style.input_cover}>
           <input
           type='email'
             className={style.input}
             placeholder="이메일"
           />
         </div>

    
          <button className={style.btn_submit}>가입요청</button>
       
       <div className={style.back_login} onClick={goToLogin}>로그인 페이지로 돌아가시겠어요?</div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default JoinComponent

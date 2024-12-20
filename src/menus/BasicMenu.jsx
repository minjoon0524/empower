import React, { useEffect } from "react";
import style from "./Menu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/loginSlice";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../hooks/useCustomLogin";
const BasicMenu = () => {
  // BasicMenu가 관심있는 것은 로그인 됐는지 안 됐는지에 대한 상태
  //=>로그인 Slices의 상태
  const disPatch = useDispatch();
  const navigate=useNavigate();
  const {loginState,doLogout}=useCustomLogin();
  //const loginState = useSelector((state) => state.loginSlice);
  const handleClickLogout = (event) => {
    event.preventDefault(); // 기본 동작 방지
    doLogout()
    navigate('/')
  };



  console.log("loginState Test---------", loginState);
  return (
    <nav className={style.container} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex:1}}>
      <div className={style.nav_item}>
        <a className={style.title}>Empower</a>
        <div className={style.profile_container}>
          <div className={style.user_profile}>
            <button type="button" className={style.profile_thumbnail}>
              <img
             className={style.profile_thumbnail}
                // src="https://static.worksmobile.net/static/pwe/wm/common/ic80_nomember.png"
                    src={loginState.profileName?`http://localhost/member/profile/${loginState.profileName}`:`https://static.worksmobile.net/static/pwe/wm/common/ic80_nomember.png`}
                width="32"
                height="32"
                alt="사용자 정보"
              />
            </button>
          </div>
          <div className={style.user_area}>
              <span className={style.user_name}>{loginState.department}{" "}{loginState.name}</span>
              <a className={style.logout_button} onClick={handleClickLogout}>로그아웃</a>
            </div>

        </div>
      </div>
    </nav>
  );
};

export default BasicMenu;

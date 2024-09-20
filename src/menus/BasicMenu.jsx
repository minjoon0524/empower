import React from "react";
import style from "./Menu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/loginSlice";
import { useNavigate } from "react-router-dom";
const BasicMenu = () => {
  // BasicMenu가 관심있는 것은 로그인 됐는지 안 됐는지에 대한 상태
  //=>로그인 Slices의 상태
  const disPatch = useDispatch();
  const navigate=useNavigate();
  const loginState = useSelector((state) => state.loginSlice);
  const handleClickLogout = (event) => {
    event.preventDefault(); // 기본 동작 방지
    disPatch(logout());
    navigate('/login')
  };
  console.log("loginState Test---------", loginState);
  return (
    <nav className={style.container}>
      <div className={style.nav_item}>
        <a className={style.title}>Empower</a>
        <div className={style.profile_container}>
          <div className={style.user_profile}>
            <button type="button" className={style.profile_thumbnail}>
              <img
                src="https://static.worksmobile.net/static/pwe/wm/common/ic80_nomember.png"
                width="32"
                height="32"
                alt="사용자 정보"
              />
            </button>
          </div>
          <div className={style.user_area}>
              <span className={style.user_name}>개발1팀 홍길동</span>
              <a className={style.logout_button} onClick={handleClickLogout}>로그아웃</a>
            </div>

        </div>
      </div>
    </nav>
  );
};

export default BasicMenu;

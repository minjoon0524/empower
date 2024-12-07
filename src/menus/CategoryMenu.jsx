import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faPlane, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import style from "./Menu.module.css";
import useCustomLogin from "../hooks/useCustomLogin";

const TreeItem = ({ label, children, isOpen, onToggle, icon, isActive }) => {
  return (
    <div className={`${style.treeItem} ${isActive ? style.active : ''}`}>
      <div className={style.treeLabel} onClick={onToggle}>
        {icon} {/* 아이콘 렌더링 */}
        <span className={style.labelText}>{label}</span>
        <span className={style.chevronIcon}>
          {isOpen ? (
            <FontAwesomeIcon icon={faChevronDown} className={style.icon} />
          ) : (
            <FontAwesomeIcon icon={faChevronRight} className={style.icon} />
          )}
        </span>
      </div>
      {isOpen && <div className={style.subMenu}>{children}</div>}
    </div>
  );
};

const CategoryMenu = () => {
  const location = useLocation();
  const [openItems, setOpenItems] = useState({
    hrManagement: false,
    attendanceManagement: false,
    vacationManagement: false,
  });
  const {loginState}=useCustomLogin()

  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    // 현재 URL에 따라 activeItem 및 openItems 설정
    const path = location.pathname;

    if (path.includes("/member/search")) {
      setActiveItem("hrManagement");
      setOpenItems((prev) => ({ ...prev, hrManagement: true }));
    } else if (path.includes("/member/attendance")) {
      setActiveItem("attendanceManagement");
      setOpenItems((prev) => ({ ...prev, attendanceManagement: true }));
    } else if (path.includes("/vacation")) {
      setActiveItem("vacationManagement");
      setOpenItems((prev) => ({ ...prev, vacationManagement: true }));
    } else {
      setActiveItem(null);
    }
  }, [location]);

  const toggleItem = (key) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setActiveItem(key);
  };

  return (
    <div className={style.categoryContainer}>
      <div className={style.categoryItem}>
        <ul className={style.menuList}>
          <li className={style.item}>
            <TreeItem
              label="인사관리"
              isOpen={openItems.hrManagement}
              onToggle={() => toggleItem("hrManagement")}
              icon={<FontAwesomeIcon icon={faUser} className={style.icon} />}
              isActive={activeItem === "hrManagement"}
            >
             
              <Link to="/member/search" className={`${style.subItem} ${activeItem === "hrManagement" ? style.activeSubItem : ''}`}>
                직원조회
              </Link>
            </TreeItem>
          </li>
          <li className={style.item}>
            <TreeItem
              label="근태관리"
              isOpen={openItems.attendanceManagement}
              onToggle={() => toggleItem("attendanceManagement")}
              icon={<FontAwesomeIcon icon={faCalendar} className={style.icon} />}
              isActive={activeItem === "attendanceManagement"}
            >
               {loginState?.roleNames[0] === "ADMIN" ? (
                 <>
                   <Link to="/member/attendance/list" className={`${style.subItem} ${activeItem === "attendanceManagement" ? style.activeSubItem : ''}`}>
                     근태관리(관리자)
                   </Link>
                   <Link to="/member/attendance/read" className={`${style.subItem} ${activeItem === "attendanceManagement" ? style.activeSubItem : ''}`}>
                     근태관리
                   </Link>
                 </>
               ) : (
                 <>
            
                   <Link to="/member/attendance/read" className={`${style.subItem} ${activeItem === "attendanceManagement" ? style.activeSubItem : ''}`}>
                     근태관리
                   </Link>
                 </>
               )}
            </TreeItem>
          </li>
          <li className={style.item}>
            <TreeItem
              label="휴가관리"
              isOpen={openItems.vacationManagement}
              onToggle={() => toggleItem("vacationManagement")}
              icon={<FontAwesomeIcon icon={faPlane} className={style.icon} />}
              isActive={activeItem === "vacationManagement"}
            >

{loginState?.roleNames[0] === "ADMIN" ? (
                 <>
     <Link to="/vacation/form" className={`${style.subItem} ${activeItem === "vacationManagement" ? style.activeSubItem : ''}`}>
                휴가신청
              </Link>
              <Link to="/vacation/list" className={`${style.subItem} ${activeItem === "vacationManagement" ? style.activeSubItem : ''}`}>
                휴가신청내역(관리자)
              </Link>
              <Link to="/vacation/myList" className={`${style.subItem} ${activeItem === "vacationManagement" ? style.activeSubItem : ''}`}>
                휴가신청내역
              </Link>
                 </>
               ) : (
                 <>
                 <Link to="/vacation/form" className={`${style.subItem} ${activeItem === "vacationManagement" ? style.activeSubItem : ''}`}>
                휴가신청
              </Link>
            <Link to="/vacation/myList" className={`${style.subItem} ${activeItem === "vacationManagement" ? style.activeSubItem : ''}`}>
                휴가신청내역
              </Link>
                 </>
               )}

             
            </TreeItem>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CategoryMenu;

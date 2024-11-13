import React, { useEffect, useState } from 'react'
import style from './MyVacationDetailComponent.module.css'
import { getMemberVacation } from '../../api/vacationApi';
const initState = {
  eid: "", // 사원 ID
  memberName: "", // 추가
  department: "", // 추가
  position: "", // 추가
  vacType: "", // 휴가 유형
  vacStatus: "", // 승인 상태
  vacStartDate: "", // 시작일
  vacEndDate: "", // 종료일
  vacDescription: "", // 사유
};
const MyVacationDetailComponent = ({ vacId }) => {
    const {vacation,setVacation}=useState()
    useEffect(() => {
    
        getMemberVacation(vacId).then((data) => {
          console.log(data);
          setVacation(data);
      
        });
      }, [vacId]);
  return (
    <div></div>
    // <div className={style.container}>
    //   <h2 className={style.title}>휴가 상세 정보</h2>
    //   <div className={style.detailGroup}>
    //     <div className={style.rowItem}>
    //       {/* <span className={style.itemText}><strong>사원 ID:</strong> {vacationData.eid}</span> */}
    //     </div>
    //     <div className={style.rowItem}>
    //       <span className={style.itemText}><strong>휴가 유형:</strong> {vacationData.vacType}</span>
    //     </div>
    //     <div className={style.rowItem}>
    //       <span className={style.itemText}><strong>시작일:</strong> {vacationData.vacStartDate}</span>
    //     </div>
    //     <div className={style.rowItem}>
    //       <span className={style.itemText}><strong>종료일:</strong> {vacationData.vacEndDate}</span>
    //     </div>
    //     <div className={style.rowItem}>
    //       <span className={style.itemText}><strong>사유:</strong> {vacationData.vacDescription}</span>
    //     </div>
    //   </div>
    // </div>
  )
}

export default MyVacationDetailComponent

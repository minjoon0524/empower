import React, { useEffect,useState } from 'react'
import { getMember } from '../../../api/memberApi';
import styles from './MemberReadComponent.module.css';



const initState={
    eid:"",
    name:"",
    department:"",
    email:"",
    phone:"",
    address:"",
    position:"",
    hireDate:""
}
const MemberReadComponent = ({eid}) => {
    const [member, setMember] = useState(initState);
    
    useEffect(()=>{
        getMember(eid).then((data)=>{
            console.log(data);
            setMember(data)
        })
    },[eid])
    return (
      <div className={styles.memberCard}>
        <h2>회원 정보</h2>
        <p className={styles.memberInfo}>
          <span className={styles.label}>사원번호:</span> {member.eid}
        </p>
        <p className={styles.memberInfo}>
          <span className={styles.label}>주소:</span> {member.address}
        </p>
        <p className={styles.memberInfo}>
          <span className={styles.label}>이메일:</span> {member.email}
        </p>
        <p className={styles.memberInfo}>
          <span className={styles.label}>전화번호:</span> {member.phone}
        </p>
        <p className={styles.memberInfo}>
          <span className={styles.label}>직책:</span> {member.position}
        </p>
      </div>
    );
  };


export default MemberReadComponent

import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import MyVacationListComponent from '../../components/Vacation/MyVacationListComponent'
import useCustomLogin from '../../hooks/useCustomLogin'

const MyVacationListPage = () => {
    const {loginState}=useCustomLogin()
    const title= `${loginState.name}님 휴가신청내역` 
    return (
      <BasicLayout title={title}>
       <MyVacationListComponent />
      </BasicLayout>
    )
}

export default MyVacationListPage

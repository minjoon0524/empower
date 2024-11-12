import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import VacationList from '../../components/Vacation/VacationList'

const AdminVacationList = () => {
    const title= "휴가 신청 내역"
    return (
      <BasicLayout title={title}>
       <VacationList />
      </BasicLayout>
    )
}

export default AdminVacationList

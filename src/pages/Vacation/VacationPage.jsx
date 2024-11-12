import React from 'react'
import VacationFormComponent from '../../components/Vacation/VacationFormComponent'
import BasicLayout from '../../layouts/BasicLayout'

const VacationPage = () => {
    const title= "휴가신청"
    return (
      <BasicLayout title={title}>
       <VacationFormComponent />
      </BasicLayout>
    )
}

export default VacationPage

import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { useParams } from 'react-router-dom'
import UpdateVacationComponent from '../../components/Vacation/UpdateVacationComponent'

const UpdateVacationPage = () => {
    const {vacId} =useParams()
    const title="휴가 수정"
  return (
    <BasicLayout title={title}>
      <UpdateVacationComponent vacId={vacId}/>
    </BasicLayout>
  )
}

export default UpdateVacationPage

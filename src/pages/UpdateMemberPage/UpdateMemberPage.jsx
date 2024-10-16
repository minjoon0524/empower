import React from 'react'
import UpdateMemberComponent from '../../components/Main/UpdateMemberComponent/UpdateMemberComponent'
import BasicLayout from '../../layouts/BasicLayout'
import { useParams } from 'react-router-dom'

const UpdateMemberPage = () => {
    const title= "인적사항 수정"
    const { eid } = useParams();
    return (
      <BasicLayout title={title}>
       <UpdateMemberComponent eid={eid}/>
      </BasicLayout>
    )
}

export default UpdateMemberPage

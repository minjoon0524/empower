import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import MemberSearchComponent from '../../components/Main/MemberSearchComponent/MemberSearchComponent'

const MemberSearchPage = () => {
    const title= "인사조회"
    return (
      <BasicLayout title={title}>
       <MemberSearchComponent/>
      </BasicLayout>
    )
}

export default MemberSearchPage

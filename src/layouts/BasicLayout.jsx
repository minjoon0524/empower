import React from 'react'
import BasicMenu from '../menus/BasicMenu'
import style from './BasicLayout.module.css'
import CategoryMenu from '../menus/CategoryMenu'

const BasicLayout = () => {
  return (
    <div>
      <BasicMenu/>
      <div>
      <CategoryMenu/>
      </div>
    </div>
  )
}

export default BasicLayout

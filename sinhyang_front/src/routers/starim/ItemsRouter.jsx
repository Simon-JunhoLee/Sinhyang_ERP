import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_ItemsListPage from '../../components/starim/erp_items/ERP_ItemsListPage'
import ERP_ItemsInsertPage from '../../components/starim/erp_items/ERP_ItemsInsertPage'

const ItemsRouter = () => {
  return (
    <Routes>
        <Route path='list' element={<ERP_ItemsListPage/>}/>
        <Route path='insert' element={<ERP_ItemsInsertPage/>}/>
    </Routes>
  )
}

export default ItemsRouter
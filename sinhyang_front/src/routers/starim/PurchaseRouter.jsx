import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_Purchase_ListPage from '../../components/starim/erp_purchase/ERP_Purchase_ListPage'
import ERP_Purchase_InsertPage from '../../components/starim/erp_purchase/ERP_Purchase_InsertPage'

const PurchaseRouter = () => {
  return (
    <Routes>
        <Route path='list' element={<ERP_Purchase_ListPage/>}/>
        <Route path='insert' element={<ERP_Purchase_InsertPage/>}/>
    </Routes>
  )
}

export default PurchaseRouter
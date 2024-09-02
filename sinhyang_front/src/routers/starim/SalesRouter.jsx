import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_Sales_ListPage from '../../components/starim/erp_sales/ERP_Sales_ListPage'
import ERP_Sales_InsertPage from '../../components/starim/erp_sales/ERP_Sales_InsertPage'

const SalesRouter = () => {
  return (
    <Routes>
        <Route path='list' element={<ERP_Sales_ListPage/>}/>
        <Route path='insert' element={<ERP_Sales_InsertPage/>}/>
    </Routes>
  )
}

export default SalesRouter
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_Vendor_ListPage from '../../components/starim/erp_vendor/ERP_Vendor_ListPage'
import ERP_Vendor_InsertPage from '../../components/starim/erp_vendor/ERP_Vendor_InsertPage'




const VendorRouter = () => {
  return (
    <Routes>
      <Route path='list' element={<ERP_Vendor_ListPage/>}/>
      <Route path='insert' element={<ERP_Vendor_InsertPage/>}/>
    </Routes>
  )
}

export default VendorRouter
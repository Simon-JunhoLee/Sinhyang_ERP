import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_EmployBBSPage from '../../components/bj/erp_employ/ERP_EmployBBSPage'
import ERP_EmployBBSInsertPage from '../../components/bj/erp_employ/ERP_EmployBBSInsertPage'
import ERP_EmployBBSReadPage from '../../components/bj/erp_employ/ERP_EmployBBSReadPage'
import ERP_EmployBBSUpdatePage from '../../components/bj/erp_employ/ERP_EmployBBSUpdatePage'

const EmployBBSRouter = () => {
  return (
    <Routes>
        <Route path='' element={<ERP_EmployBBSPage/>}/>
        <Route path='/insert' element={<ERP_EmployBBSInsertPage/>}/>
        <Route path='/read/:employ_bbs_id' element={<ERP_EmployBBSReadPage/>}/>
        <Route path='/update/:employ_bbs_id' element={<ERP_EmployBBSUpdatePage/>}/>
    </Routes>
  )
}

export default EmployBBSRouter
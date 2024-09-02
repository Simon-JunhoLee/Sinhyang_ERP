import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_Client_ListPage from '../../components/starim/erp_client/ERP_Client_ListPage'
import ERP_Client_InsertPage from '../../components/starim/erp_client/ERP_Client_InsertPage'

const ClientRouter = () => {
  return (
    <Routes>
        <Route path='list' element={<ERP_Client_ListPage/>}/>
        <Route path='insert' element={<ERP_Client_InsertPage/>}/>
    </Routes>
  )
}

export default ClientRouter
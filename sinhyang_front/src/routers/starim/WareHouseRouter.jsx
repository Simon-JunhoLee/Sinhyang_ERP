import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_WareHouseListPage from '../../components/starim/erp_warehouse/ERP_WareHouseListPage'
import ERP_WareHouseInsertPage from '../../components/starim/erp_warehouse/ERP_WareHouseInsertPage'

const WareHouseRouter = () => {
  return (
    <Routes>
        <Route path='list' element={<ERP_WareHouseListPage/>}/>
        <Route path='insert' element={<ERP_WareHouseInsertPage/>}/>
    </Routes>
  )
}

export default WareHouseRouter
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WEB_EmployProcedurePage from '../../components/bj/web_empoly/WEB_EmployProcedurePage'
import WEB_EmployBBSPage from '../../components/bj/web_empoly/WEB_EmployBBSPage'
import WEB_EmployBBSReadPage from '../../components/bj/web_empoly/WEB_EmployBBSReadPage'

const EmployRouter = () => {
  return (
   
    <Routes>
        <Route path='procedure' element={<WEB_EmployProcedurePage/>}/>
        <Route path='bbs' element={<WEB_EmployBBSPage/>}/>
        <Route path='bbs/read/:employ_bbs_id' element={<WEB_EmployBBSReadPage/>}/>
    </Routes>

  )
}

export default EmployRouter
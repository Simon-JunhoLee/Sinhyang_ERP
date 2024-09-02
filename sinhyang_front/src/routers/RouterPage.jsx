import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../common/HomePage'
import Web_RouterPage from './Web_RouterPage'
import ERP_RouterPage from './ERP_RouterPage'

const RouterPage = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/web/*' element={<Web_RouterPage/>}/>
        <Route path='/erp/*' element={<ERP_RouterPage/>}/>
    </Routes>
  )
}

export default RouterPage
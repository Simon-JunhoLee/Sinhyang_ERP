import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_FAQPage from '../../components/jay/erp_faq/ERP_FAQPage'
import ERP_FAQInsertPage from '../../components/jay/erp_faq/ERP_FAQInsertPage'

const ERP_FAQRouterPage = () => {
  return (
    <Routes>
        <Route path='' element={<ERP_FAQPage/>}/>
        <Route path='/insert' element={<ERP_FAQInsertPage/>}/>
    </Routes>
  )
}

export default ERP_FAQRouterPage
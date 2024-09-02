import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WEB_FAQPage from '../../components/jay/web_bbs/WEB_FAQPage'
import WEB_FAQReadPage from '../../components/jay/web_bbs/WEB_FAQReadPage'
import WEB_BBSPage from '../../components/jay/web_bbs/WEB_BBSPage'
import WEB_BBSReadPage from '../../components/jay/web_bbs/WEB_BBSReadPage'
import WEB_BBSInsertPage from '../../components/jay/web_bbs/WEB_BBSInsertPage'
import WEB_BBSUpdatePage from '../../components/jay/web_bbs/WEB_BBSUpdatePage'




const Web_BBSRouterPage = () => {
  return (
    <Routes>
    
    <Route path='faq' element={<WEB_FAQPage/>}/>
    <Route path='bbs/read/:bbs_id' element={<WEB_BBSReadPage/>}/>
    <Route path='bbs/insert' element={<WEB_BBSInsertPage/>}/>
    <Route path='bbs' element={<WEB_BBSPage/>}/>
    <Route path='/bbs/update/:bbs_id' element={<WEB_BBSUpdatePage/>}/>
    
    </Routes>
  )
}

export default Web_BBSRouterPage
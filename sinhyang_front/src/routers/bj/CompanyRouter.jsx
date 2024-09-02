import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WEB_CompanyViewPage from '../../components/bj/web_company/WEB_CompanyViewPage'
import WEB_CompanyHistoryPage from '../../components/bj/web_company/WEB_CompanyHistoryPage'
import WEB_CompanyCEO from '../../components/bj/web_company/WEB_CompanyCEO'

const CompanyRouter = () => {
  return (
    <>
    <img src='/images/menupage/comi.png' className='image-no-space'/>

        <div className='web-image-text'>
          <h1>회사 소개</h1>
          <p>신향에 대한 정보를 알려드립니다</p>
        </div>
    <Routes>
        <Route path='/view' element={<WEB_CompanyViewPage/>}/>
        <Route path='/history' element={<WEB_CompanyHistoryPage/>}/>
        <Route path='/ceo' element={<WEB_CompanyCEO/>}/>
    </Routes>
    </>
  )
}

export default CompanyRouter

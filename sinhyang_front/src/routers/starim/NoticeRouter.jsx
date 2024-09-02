import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERPNoticeInsertPage from '../../components/starim/erp_notice/ERPNoticeInsertPage'
import ERPNoticeListPage from '../../components/starim/erp_notice/ERPNoticeListPage'
import ERPNoticeReadPage from '../../components/starim/erp_notice/ERPNoticeReadPage'
import ERPNoticeUpdatePage from '../../components/starim/erp_notice/ERPNoticeUpdatePage'
import ERPEventTestPage from '../../components/starim/erp_notice/ERPEventTestPage'


const NoticeRouter = () => {
  return (
    <Routes>
        <Route path='insert' element={<ERPNoticeInsertPage/>}/>
        <Route path='list' element={<ERPNoticeListPage/>}/>
        <Route path=':notice_id' element={<ERPNoticeReadPage/>}/>
        <Route path='update/:notice_id' element={<ERPNoticeUpdatePage/>}/>
        <Route path='event' element={<ERPEventTestPage/>}/>
       
    </Routes>
  )
}

export default NoticeRouter
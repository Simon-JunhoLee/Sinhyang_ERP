import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WEB_NewsDomesticPage from '../../components/bj/web_news/WEB_NewsDomesticPage'
import WEB_NewsOverseasPage from '../../components/bj/web_news/WEB_NewsOverseasPage'

const NewsRouter = () => {
  return (
    <>
    <img src='/images/menupage/news.png' className='image-no-space'/>

        <div className='web-image-text'>
          <h1>신향뉴스</h1>
          <p>행복하고 희망찬 내일을 위한 새롭고 활기찬 <br/>
          (주)신향이 새로운 소식을 가장 먼저 전해드립니다</p>
        </div>
    <Routes>
        <Route path='/domestic' element={<WEB_NewsDomesticPage/>}/>
        <Route path='/overseas' element={<WEB_NewsOverseasPage/>}/>
    </Routes>
    </>
  )
}

export default NewsRouter
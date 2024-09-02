import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WEB_OrganizationPage from '../../components/bj/web_person/WEB_OrganizationPage'

const PersonRouter = () => {
  return (
    <>
    <img src='/images/menupage/org.png' className='image-no-space'/>

        <div className='web-image-text'>
          <h1>인물소개</h1>
          <p>신향의 임원들은 각기 다른 전문성과 독립성을 갖춘
          임원들로 구성되어 있습니다.</p>
        </div>
    <Routes>
        <Route path='/organization' element={<WEB_OrganizationPage/>}/>
    </Routes>

    </>
  )
}

export default PersonRouter
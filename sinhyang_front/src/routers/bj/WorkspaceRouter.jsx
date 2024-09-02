import React from 'react'
import { Route, Routes } from 'react-router-dom'

import WEB_WorkspacePage from '../../components/bj/web_workspace/WEB_WorkspacePage'

const WorkspaceRouter = () => {
  return (
    <>
    <img src='/images/menupage/cmap.jpg' className='image-no-space'/>

        <div className='web-image-text'>
          <h1>사업장소개</h1>
          <p>국내 회외 지사를 확인 할 수 있습니다</p>
        </div>
    <Routes>
        <Route path='/world' element={<WEB_WorkspacePage/>}/>
    </Routes>
    </>
  )
}

export default WorkspaceRouter
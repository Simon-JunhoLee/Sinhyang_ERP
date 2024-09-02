import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_ReceiveMessagePage from '../../components/bj/erp_message/ERP_ReceiveMessagePage'
import ERP_SendMessagePage from '../../components/bj/erp_message/ERP_SendMessagePage'
import ERP_insertMessagePage from '../../components/bj/erp_message/ERP_insertMessagePage'
import ERP_DeleteMessagePage from '../../components/bj/erp_message/ERP_DeleteMessagePage'
import ERP_ReadReceivePage from '../../components/bj/erp_message/ERP_ReadReceivePage'
import ERP_ReadSendPage from '../../components/bj/erp_message/ERP_ReadSendPage'



const MessageRouter = () => {
  return (
    <>
        
        <Routes>
            <Route path='/send' element={<ERP_SendMessagePage/>}/>
            <Route path='/receive' element={<ERP_ReceiveMessagePage/>}/>
            <Route path='/insert' element={<ERP_insertMessagePage/>}/>
            <Route path='/delete' element={<ERP_DeleteMessagePage/>}/>
            <Route path='/receive/:message_id' element={<ERP_ReadReceivePage/>}/>
            <Route path='/send/:message_id' element={<ERP_ReadSendPage/>}/>
        </Routes>   
    </>
  )
}

export default MessageRouter
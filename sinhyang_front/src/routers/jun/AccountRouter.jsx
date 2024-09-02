import React from 'react'
import ERP_Account_ListPage from '../../components/jun/erp_account/ERP_Account_ListPage'
import { Route, Routes } from 'react-router-dom'

const AccountRouter = () => {
    return (
        <Routes>
            <Route path='list' element={<ERP_Account_ListPage />} />
        </Routes>
    )
}

export default AccountRouter
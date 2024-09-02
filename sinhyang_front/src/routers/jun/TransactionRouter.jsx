import React from 'react'
import ERP_Transaction_ListPage from '../../components/jun/erp_transaction/ERP_Transaction_ListPage'
import ERP_Transaction_PayList from '../../components/jun/erp_transaction/ERP_Transaction_PayList'
import { Route, Routes } from 'react-router-dom'
import ERP_Transaction_Salary from '../../components/jun/erp_transaction/ERP_Transaction_Salary'

const TransactionRouter = () => {
    return (
        <Routes>
            <Route path='list' element={<ERP_Transaction_ListPage />} />
            <Route path='pay' element={<ERP_Transaction_PayList />} />
            <Route path='salary' element={<ERP_Transaction_Salary />} />
        </Routes>
    )
}

export default TransactionRouter
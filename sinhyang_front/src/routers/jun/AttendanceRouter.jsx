import React from 'react'
import ERP_Attendance_ListPage from '../../components/jun/erp_attendance/ERP_Attendance_ListPage'
import { Route, Routes } from 'react-router-dom'

const AttendanceRouter = () => {
    return (
        <Routes>
            <Route path='list' element={<ERP_Attendance_ListPage />} />
        </Routes>
    )
}

export default AttendanceRouter
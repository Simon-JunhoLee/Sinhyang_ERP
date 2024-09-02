import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import Calendar from 'react-calendar';
import '../../../common/assets/erp/css/Customize.css';

const ERP_Member_AttendancePage = () => {

    const member_info_key = sessionStorage.getItem("member_info_key");
    const member_info_name = sessionStorage.getItem('member_info_name');
    const member_info_id = sessionStorage.getItem("member_info_id");


    const [attendanceList, setAttendanceList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const callAttendanceList = async () => {
        const url = `/erp/attendance/listMember/${member_info_key}`;
        const res = await axios.get(url);
        setAttendanceList(res.data.listMember);
    }

    useEffect(() => {
        callAttendanceList();
    }, []);

    const getTileContent = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = moment(date).format('YYYY-MM-DD');
            const attendanceToday = attendanceList.find(({ member_attendance_date }) => member_attendance_date === formattedDate);
            if (attendanceToday) {
                return (
                    <div className="tile-attended">
                        <div className="attendance-dot"></div>출근
                    </div>
                );
            } else {
                return <div className="tile-absent">&nbsp;</div>;
            }
        }
    }

    return (
        <Row>
            <div className="erp-calendar-container text-center mt-5">
                <h1 className="h4 text-gray-900 mb-3">근태 내역</h1>
            </div>
            <div className="px-5 calendar-container">
                <Calendar
                    tileContent={getTileContent}
                    onChange={setSelectedDate}
                    value={selectedDate}
                    calendarType="gregory"
                    view="month"
                    prev2Label={null}
                    next2Label={null}
                    showNeighboringMonth={false}
                />
            </div>
        </Row>
    )
}

export default ERP_Member_AttendancePage
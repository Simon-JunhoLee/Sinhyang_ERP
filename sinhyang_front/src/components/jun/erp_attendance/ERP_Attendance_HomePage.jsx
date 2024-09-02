import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa6';

const ERP_Attendance_HomePage = () => {

    const [currentTime, setCurrentTime] = useState(moment());
    const [member, setMember] = useState({});
    const member_info_id = sessionStorage.getItem("member_info_id");

    const callMember = async () => {
        const url = `/erp/member/${member_info_id}`;
        const res = await axios.get(url);
        setMember(res.data);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        callMember();
    }, []);

    const onAttendance = () => {
        window.location.href = '/erp/attendance/list';
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="text-center mb-4">
                <h4>{currentTime.format('YYYY-MM-DD')}</h4>
                <h4>{currentTime.format('HH:mm:ss')}</h4>
            </div>
            <div className="mb-3">
                {member.member_info_photo ?
                    (<img src={member.member_info_photo} width="150" height="150" />)
                    :
                    (<FaUser size={100} />)
                }
            </div>
            <div className="mb-3">
                {member.member_info_name ? member.member_info_name + "님" : "-"}
            </div>
            <div className="mb-3">
                <Button variant="primary" size="lg" block onClick={onAttendance}>근태확인</Button>
            </div>
        </div>
    )
}

export default ERP_Attendance_HomePage
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Col, Dropdown, Row, Table } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const ERP_Attendance_ListPage = () => {
    const member_info_key = sessionStorage.getItem("member_info_key");
    const member_info_name = sessionStorage.getItem('member_info_name');
    const member_info_id = sessionStorage.getItem("member_info_id");

    useEffect(() => {
        if (!member_info_key) {
            window.location.href = '/erp/member/login';
            sessionStorage.setItem('target', '/erp/attendance/list');
        }
    }, [member_info_key]);

    const [member, setMember] = useState({});
    
    const callMember = async () => {
        const url = `/erp/member/${member_info_id}`;
        const res = await axios.get(url);
        setMember(res.data);
    }

    const [currentDate, setCurrentDate] = useState(moment());
    const [attendance, setAttendance] = useState({});
    const [list, setList] = useState([]);
    const [currentTime, setCurrentTime] = useState(moment());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const callAttendance = async (date) => {
        const formattedDate = date.format('YYYY-MM-DD');
        const url = `/erp/attendance/member?member_info_key=${member_info_key}&member_attendance_date=${formattedDate}`;
        const res = await axios.get(url);
        setAttendance(res.data);
    }

    useEffect(() => {
        callAttendance(currentDate);
    }, [currentDate]);

    const callAttendanceList = async () => {
        const url = `/erp/attendance/listMember/${member_info_key}`;
        const res = await axios.get(url);
        setList(res.data.listMember);
    }

    useEffect(() => {
        callAttendanceList();
        callMember();
    }, []);

    // 출근
    const onShift = async () => {
        if (!attendance) {
            const url = '/erp/attendance';
            await axios.post(url, { member_info_key });
            Swal.fire({
                title: "출근 완료!",
                text: "",
                icon: "success"
            }).then(() => {
                callAttendanceList(); // 출근 후 목록을 다시 불러옴
                window.location.reload();
            });

        } else {
            Swal.fire({
                title: "이미 출근하셨습니다.",
                text: "",
                icon: "warning"
            });
            return;
        }
    }

    // 퇴근
    const onLeave = async () => {
        if (!attendance.member_attendance_end) {
            Swal.fire({
                title: `퇴근하시겠습니까?`,
                text: "한 번 퇴근 이후에는 다시 퇴근할 수 없습니다.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirm"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const url = '/erp/attendance';
                    await axios.put(url, { member_info_key });
                    Swal.fire({
                        title: "퇴근 완료!",
                        text: "",
                        icon: "success"
                    }).then(() => {
                        callAttendanceList(); // 퇴근 후 목록을 다시 불러옴
                    });
                }
            });
        } else {
            Swal.fire({
                title: "이미 퇴근하셨습니다.",
                text: "",
                icon: "warning"
            });
            return;
        }
    }

    const handlePreviousMonth = () => {
        setCurrentDate(currentDate.clone().subtract(1, 'months'));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.clone().add(1, 'months'));
    };

    const getWeeksInMonth = (date) => {
        const startOfMonth = date.clone().startOf('month');
        const endOfMonth = date.clone().endOf('month');
        const weeks = [];
        let currentWeek = startOfMonth.clone().startOf('isoWeek');

        while (currentWeek.isSameOrBefore(endOfMonth, 'day')) {
            const startOfWeek = currentWeek.clone();
            const endOfWeek = currentWeek.clone().endOf('isoWeek').isBefore(endOfMonth) ? currentWeek.clone().endOf('isoWeek') : endOfMonth.clone();

            weeks.push({
                start: startOfWeek.clone(),
                end: endOfWeek.clone(),
                days: getDaysInWeek(startOfWeek, endOfWeek),
            });

            currentWeek.add(1, 'week');
        }

        return weeks;
    };

    const getDaysInWeek = (startOfWeek, endOfWeek) => {
        const days = [];
        let currentDay = startOfWeek.clone();

        while (currentDay.isSameOrBefore(endOfWeek, 'day')) {
            days.push(currentDay.clone());
            currentDay.add(1, 'day');
        }

        return days;
    };

    const weeksInMonth = getWeeksInMonth(currentDate);
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    // 이번 주 근무 초과시간 계산
    const calculateOvertimeThisWeek = (week) => {
        const weeklyWorkHours = 45;
        let totalWorkedHours = 0;
        let totalWorkedMinutes = 0;

        week.days.forEach((day) => {
            const attendanceToday = list.find(({ member_attendance_date }) => moment(member_attendance_date).isSame(day, 'day'));
            if (attendanceToday) {
                const start = moment(attendanceToday.member_attendance_start);
                const end = moment(attendanceToday.member_attendance_end);
                const workedHours = end.diff(start, 'hours');
                const workedMinutes = end.diff(start, 'minutes') % 60;

                totalWorkedHours += workedHours;
                totalWorkedMinutes += workedMinutes;
            }
        });

        const totalWorkedMinutesCombined = totalWorkedHours * 60 + totalWorkedMinutes;
        const overtimeMinutes = Math.max(totalWorkedMinutesCombined - weeklyWorkHours * 60, 0);
        const overtimeHours = Math.floor(overtimeMinutes / 60);
        const overtimeMinutesRemainder = overtimeMinutes % 60;

        return { overtimeHours, overtimeMinutes: overtimeMinutesRemainder };
    };

    // 이번 주 근무 잔여시간 계산
    const calculateRemainingTimeThisWeek = (week) => {
        const weeklyWorkHours = 45;
        let totalWorkedHours = 0;
        let totalWorkedMinutes = 0;

        week.days.forEach((day) => {
            const attendanceToday = list.find(({ member_attendance_date }) => moment(member_attendance_date).isSame(day, 'day'));
            if (attendanceToday) {
                totalWorkedHours += attendanceToday.hours_worked;
                totalWorkedMinutes += attendanceToday.minutes_worked;
            }
        });

        const totalWorkedMinutesCombined = totalWorkedHours * 60 + totalWorkedMinutes;
        const remainingMinutes = Math.max(weeklyWorkHours * 60 - totalWorkedMinutesCombined, 0);
        const remainingHours = Math.floor(remainingMinutes / 60);
        const remainingMinutesRemainder = remainingMinutes % 60;

        return { remainingHours, remainingMinutes: remainingMinutesRemainder };
    };

    // 이번주 누적 근무 시간 계산
    const calculateAccumulatedTimeThisWeek = (week) => {
        let totalWorkedHours = 0;
        let totalWorkedMinutes = 0;

        week.days.forEach((day) => {
            const attendanceToday = list.find(({ member_attendance_date }) => moment(member_attendance_date).isSame(day, 'day'));
            if (attendanceToday) {
                totalWorkedHours += attendanceToday.hours_worked;
                totalWorkedMinutes += attendanceToday.minutes_worked;
            }
        });

        const totalWorkedMinutesCombined = totalWorkedHours * 60 + totalWorkedMinutes;
        const workedHoursThisWeek = Math.floor(totalWorkedMinutesCombined / 60);
        const workedMinutesThisWeek = totalWorkedMinutesCombined % 60;

        return { workedHoursThisWeek, workedMinutesThisWeek };
    };

    const getAttendanceForDate = (date) => {
        return list.find(({ member_attendance_date }) => moment(member_attendance_date).isSame(date, 'day'));
    };

    const getCurrentWeekData = () => {
        const today = moment();
        return weeksInMonth.find(week => today.isBetween(week.start, week.end, null, '[]'));
    };

    const currentWeekData = getCurrentWeekData();

    return (
        <Row>
            <Col md={2} className='bg-light p-5'>
                <div className="d-flex flex-column align-items-center">
                    <div className='mb-5'>
                        <h2>근태관리</h2>
                    </div>
                    <div className="text-center mb-3">
                        <h4>{currentTime.format('YYYY-MM-DD HH:mm:ss')}</h4>
                    </div>
                    <div className="mb-3">
                        {member.member_info_photo ?
                            (<img src={member.member_info_photo} width="150" height="150" />)
                        :
                            (<FaUser size={70} />)
                        }
                    </div>
                    <div className="mb-3">
                        {member_info_name ? member_info_name + "님" : "-"}
                    </div>
                    <div className="mb-3">
                        <Button variant="primary" size="lg" block onClick={onShift}>출근하기</Button>
                    </div>
                    <div className="mb-3">
                        <Button variant="secondary" size="lg" block onClick={onLeave}>퇴근하기</Button>
                    </div>
                </div>
            </Col>
            <Col md={10} className='p-5'>
                <div className='mb-5'>
                    <h2>근태현황</h2>
                </div>
                <div className='text-center mb-5'>
                    <Row className='justify-content-center'>
                        <Col>
                            <Button onClick={handlePreviousMonth}>&lt;</Button>
                        </Col>
                        <Col>
                            {currentDate.format('YYYY-MM')}
                        </Col>
                        <Col>
                            <Button onClick={handleNextMonth}>&gt;</Button>
                        </Col>
                    </Row>
                </div>
                {currentWeekData && (
                    <Card className="mb-3">
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Card.Text>기본근무 (09:00 - 18:00)</Card.Text>
                                </Col>
                                <Col md={8} className="text-right">
                                    <Card.Text>
                                        이번주 초과 :
                                        {calculateOvertimeThisWeek(currentWeekData).overtimeMinutes ?
                                            ` ${calculateOvertimeThisWeek(currentWeekData).overtimeHours}h ${calculateOvertimeThisWeek(currentWeekData).overtimeMinutes}m`
                                            : " 0h 0m"}
                                    </Card.Text>
                                    <Card.Text>
                                        이번주 잔여 :
                                        {calculateRemainingTimeThisWeek(currentWeekData).remainingMinutes ?
                                            ` ${calculateRemainingTimeThisWeek(currentWeekData).remainingHours}h ${calculateRemainingTimeThisWeek(currentWeekData).remainingMinutes}m`
                                            : " 0h 0m"}
                                    </Card.Text>
                                    <Card.Text>
                                        이번주 누적 :
                                        {calculateAccumulatedTimeThisWeek(currentWeekData).workedMinutesThisWeek ?
                                            ` ${calculateAccumulatedTimeThisWeek(currentWeekData).workedHoursThisWeek}h ${calculateAccumulatedTimeThisWeek(currentWeekData).workedMinutesThisWeek}m`
                                            : " 0h 0m"}
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                )}

                <Accordion defaultActiveKey={currentWeekData ? weeksInMonth.findIndex(week => moment().isBetween(week.start, week.end, null, '[]')).toString() : '0'}>
                    {weeksInMonth.map((week, index) => (
                        <Accordion.Item eventKey={index.toString()} key={index}>
                            <Accordion.Header>
                                <div>
                                    <span>{`${index + 1}주차 (${week.start.format('MM월 DD일')} - ${week.end.format('MM월 DD일')})`}</span>
                                </div>
                                <div className="ms-auto text-end">
                                    <span>
                                        누적 : {calculateAccumulatedTimeThisWeek(week).workedMinutesThisWeek ?
                                            `${calculateAccumulatedTimeThisWeek(week).workedHoursThisWeek}시간 ${calculateAccumulatedTimeThisWeek(week).workedMinutesThisWeek}분`
                                            : "0시간 0분"}
                                    </span>
                                    <span className="ms-3">
                                        초과 : {calculateOvertimeThisWeek(week).overtimeMinutes ?
                                            `${calculateOvertimeThisWeek(week).overtimeHours}시간 ${calculateOvertimeThisWeek(week).overtimeMinutes}분`
                                            : "0시간 0분"}
                                    </span>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>일자</th>
                                            <th>업무시작</th>
                                            <th>업무종료</th>
                                            <th>총 근무시간</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {week.days.map((day, dayIndex) => {
                                            const { member_attendance_start, member_attendance_end, hours_worked, minutes_worked } = getAttendanceForDate(day) || {};

                                            const startTime = member_attendance_start ? moment(member_attendance_start).format('HH:mm') : '-';
                                            const endTime = member_attendance_end ? moment(member_attendance_end).format('HH:mm') : '-';
                                            const totalWorked = minutes_worked ? `${hours_worked}h ${minutes_worked}m` : '-';
                                            const dayOfWeek = daysOfWeek[day.day()];

                                            return (
                                                <tr key={dayIndex} className={day.isSame(moment(), 'day') ? 'table-active' : ''}>
                                                    <td>{day.format('MM.DD')} ({dayOfWeek})</td>
                                                    <td>{startTime}</td>
                                                    <td>{endTime}</td>
                                                    <td>{totalWorked}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Col>
        </Row>
    )
}

export default ERP_Attendance_ListPage;

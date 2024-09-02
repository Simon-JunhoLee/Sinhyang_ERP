import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Button } from 'react-bootstrap';

const ERP_Member_SalaryPage = () => {

    const member_info_key = sessionStorage.getItem('member_info_key');
    const member_info_name = sessionStorage.getItem('member_info_name');

    const [salaryList, setSalaryList] = useState([]);
    const [groupedSalaries, setGroupedSalaries] = useState({});
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const callSalary = async () => {
        const url = `/erp/salary/${member_info_key}`;
        const res = await axios.get(url);
        setSalaryList(res.data);
        groupSalariesByYear(res.data);
    };

    useEffect(() => {
        callSalary();
    }, []);

    // 금액에 천 단위 구분 기호를 추가하는 함수
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // 날짜 포맷팅 함수 추가
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dayOfWeek = date.toLocaleDateString('ko-KR', { weekday: 'short' });
        return `${year}-${month}-${day} (${dayOfWeek})`;
    };

    // 연도별로 급여를 그룹화하는 함수
    const groupSalariesByYear = (salaries) => {
        const grouped = salaries.reduce((acc, salary) => {
            const year = new Date(salary.member_salary_date).getFullYear();
            if (!acc[year]) acc[year] = [];
            acc[year].push(salary);
            return acc;
        }, {});
        setGroupedSalaries(grouped);
    };

    const handlePreviousYear = () => {
        setSelectedYear(prevYear => prevYear - 1);
    };

    const handleNextYear = () => {
        setSelectedYear(prevYear => prevYear + 1);
    };

    return (
        <Row>
            <div className="text-center mt-5">
                <h1 className="h4 text-gray-900 mb-3">급여 내역</h1>
            </div>
            <div className="px-5">
                <div className="text-center my-3">
                    <Button variant="outline-primary" onClick={handlePreviousYear}>&lt;</Button>
                    <span className="mx-5">{selectedYear}년</span>
                    <Button variant="outline-primary" onClick={handleNextYear}>&gt;</Button>
                </div>
                {groupedSalaries[selectedYear] && (
                    <Table striped bordered hover className="my-5">
                        <thead>
                            <tr>
                                <th>급여 일자</th>
                                <th>사원명</th>
                                <th>금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedSalaries[selectedYear].map(salary => (
                                <tr key={salary.member_salary_key}>
                                    <td>{formatDate(salary.member_salary_date)}</td>
                                    <td>{member_info_name}</td>
                                    <td>{formatNumber(salary.member_salary_money)}원</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
                {!groupedSalaries[selectedYear] && (
                    <div className="text-center my-5">
                        <p>해당 연도의 급여 내역이 없습니다.</p>
                    </div>
                )}
            </div>
        </Row>
    );
}

export default ERP_Member_SalaryPage;

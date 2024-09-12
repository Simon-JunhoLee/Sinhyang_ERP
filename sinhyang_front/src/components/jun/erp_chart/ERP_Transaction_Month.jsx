import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineFall, AiOutlineRise } from 'react-icons/ai';

const ERP_Transaction_Month = () => {
    const [transactionData, setTransactionData] = useState([]);
    const [key, setKey] = useState('');
    const [availableMonths, setAvailableMonths] = useState([]);
    const [currentMonthNetEarnings, setCurrentMonthNetEarnings] = useState(0);
    const [previousMonthNetEarnings, setPreviousMonthNetEarnings] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('');

    const callAllTransactions = async () => {
        const url = `/erp/transaction/data`;
        const res = await axios.get(url);
        const transactions = res.data;

        // 월별 데이터를 그룹화하고 각 월의 deposit과 withdraw 합산을 계산
        const monthlyData = transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.transaction_date);
            const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            if (!acc[monthYear]) {
                acc[monthYear] = { withdraw: 0, deposit: 0 };
            }
            acc[monthYear].withdraw += transaction.transaction_withdraw;
            acc[monthYear].deposit += transaction.transaction_deposit;
            return acc;
        }, {});

        // 월별 데이터를 정렬하여 오래된 데이터가 왼쪽에 오도록 설정
        const sortedMonthYears = Object.keys(monthlyData).sort().reverse();

        const data = sortedMonthYears.map(monthYear => ({
            monthYear,
            withdraw: monthlyData[monthYear].withdraw,
            deposit: monthlyData[monthYear].deposit,
            difference: monthlyData[monthYear].deposit - monthlyData[monthYear].withdraw
        }));

        setTransactionData(data);

        // 중복 없는 monthYear 배열 생성
        const uniqueMonths = sortedMonthYears;
        setAvailableMonths(uniqueMonths);
    };

    useEffect(() => {
        callAllTransactions();  // 컴포넌트가 마운트되면 모든 월의 데이터를 호출

        // 현재 날짜의 월을 기본으로 설정
        const currentDate = new Date();
        const currentMonthYear = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
        setSelectedMonth(currentMonthYear);
    }, []);

    useEffect(() => {
        if (selectedMonth) {
            const monthData = transactionData.find(d => d.monthYear === selectedMonth) || { withdraw: 0, deposit: 0 };
            const monthEarnings = monthData.deposit - monthData.withdraw;
            setCurrentMonthNetEarnings(monthEarnings);

            // Calculate previous month earnings
            const monthIndex = availableMonths.indexOf(selectedMonth);
            const previousMonth = monthIndex >= 0 ? availableMonths[monthIndex + 1] : '';
            const previousMonthData = transactionData.find(d => d.monthYear === previousMonth) || { withdraw: 0, deposit: 0 };
            const previousMonthEarnings = previousMonthData.deposit - previousMonthData.withdraw;
            setPreviousMonthNetEarnings(previousMonthEarnings);
            console.log(monthIndex);
            console.log("현재월", selectedMonth);
            console.log("지난월", previousMonth);
        }
    }, [selectedMonth, transactionData, availableMonths]);

    // 금액에 천 단위 구분 기호를 추가하는 함수
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // 퍼센트 차이 계산 함수
    const calculatePercentageChange = (current, previous) => {
        console.log("현재값", current);
        console.log("이전값", previous);
        if (previous === 0) return "∞";
        const change = ((current - previous) / previous) * 100;
        return `${change.toFixed(2)}%`;
    };

    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-body">
                    <div className="row align-items-start">
                        <div className="col-8">
                            <h5 className="card-title mb-9 fw-semibold">월별 수익</h5>
                            <h4 className="fw-semibold mb-3">
                                {`￦${formatNumber(currentMonthNetEarnings)}`}
                            </h4>
                            <div className="d-flex align-items-center pb-1">
                                <span
                                    className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                                    {currentMonthNetEarnings >= previousMonthNetEarnings ? (
                                        <AiOutlineRise style={{ color: "red" }} />
                                    ) : (
                                        <AiOutlineFall style={{ color: "blue" }} />
                                    )}
                                </span>
                                <p className="text-dark me-1 fs-3 mb-0">
                                    {calculatePercentageChange(currentMonthNetEarnings, previousMonthNetEarnings)}
                                </p>
                                <p className="fs-3 mb-0">지난달 대비</p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="d-flex justify-content-end">
                                <select
                                    id="monthSelect"
                                    className="form-select"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                >
                                    <option value="">월 선택</option>
                                    {availableMonths.map(month => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="earning"></div>
            </div>
        </div>
    );
}

export default ERP_Transaction_Month;

import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, BarElement, plugins, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react'
import { Chart, Line } from 'react-chartjs-2';

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, plugins, Tooltip);

const ERP_Transaction_Chart = () => {
    const [transactionData, setTransactionData] = useState([]);
    const [key, setKey] = useState(''); // 선택된 년도
    const [availableYears, setAvailableYears] = useState([]);
    const [availableMonths, setAvailableMonths] = useState([]);

    const callTransaction = async () => {
        const url = `/erp/transaction/data`;
        const res = await axios.get(url);
        const transactions = res.data;

        // 중복 없는 year 배열 생성
        const uniqueYears = [...new Set(transactions.map(transaction => {
            const date = new Date(transaction.transaction_date);
            return `${date.getFullYear()}`;
        }))];

        setAvailableYears(uniqueYears);
    }


    useEffect(() => {
        callTransaction();
    }, []);


    const callSelectTransaction = async () => {
        const url = `/erp/transaction/selectData?key=${key}`;
        const res = await axios.get(url);
        const selectTransactions = res.data;

        // 월별 데이터를 그룹화하고 각 월의 deposit과 withdraw 합산을 계산
        const monthlyData = selectTransactions.reduce((acc, transaction) => {
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
        const sortedMonthYears = Object.keys(monthlyData).sort();

        const data = sortedMonthYears.map(monthYear => ({
            monthYear,
            withdraw: monthlyData[monthYear].withdraw,
            deposit: monthlyData[monthYear].deposit,
            difference: monthlyData[monthYear].deposit - monthlyData[monthYear].withdraw
        }));

        setTransactionData(data);

        // 중복 없는 monthYear 배열 생성
        const uniqueMonths = [...new Set(selectTransactions.map(transaction => {
            const date = new Date(transaction.transaction_date);
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        }))];

        setAvailableMonths(uniqueMonths);
    };

    useEffect(() => {
        callTransaction();
        // setKey(new Date().getFullYear().toString()); // 현재 년도로 설정
        setKey("2023")
    }, []);

    useEffect(() => {
        if (key) {
            callSelectTransaction();
        }
    }, [key]);

    // 금액에 천 단위 구분 기호를 추가하는 함수
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // 데이터가 없으면 빈 배열을 반환
    const labels = transactionData.length ? transactionData.map(item => item.monthYear) : [];
    const salesData = transactionData.length ? transactionData.map(item => item.difference) : [];
    const withdrawData = transactionData.length ? transactionData.map(item => item.withdraw) : [];
    const depositData = transactionData.length ? transactionData.map(item => item.deposit) : [];

    const data = {
        labels,
        datasets: [
            {
                type: 'line',
                label: '총수입',
                data: salesData,
                fill: false,
                borderColor: '#90EE90',
                tension: 0.1,
            },
            {
                type: 'bar',
                label: '지출',
                data: withdrawData,
                backgroundColor: '#FFB6C1',
            },
            {
                type: 'bar',
                label: '수입',
                data: depositData,
                backgroundColor: '#ADD8E6',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += `${formatNumber(context.parsed.y)}원`;
                        }
                        return label;
                    },
                    title: function (context) {
                        return `Month: ${context[0].label}`;
                    },
                    footer: function (context) {
                        return '';
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: false,
                    text: 'Month',
                },
            },
            y: {
                title: {
                    display: false,
                    text: 'Sales',
                },
            },
        },
    };

    const onChange = (e) => {
        setKey(e.target.value); // 선택된 년도를 상태에 저장
    }

    return (
        <>
            <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
                <div className="mb-3 mb-sm-0">
                    <h5 className="card-title fw-semibold">Sales Overview</h5>
                </div>
                <div>
                    <select className="form-select" value={key} onChange={onChange}>
                        <option value="">Select Year</option>
                        {availableYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>
            <Chart type='bar' data={data} options={options} />
        </>
    );
}

export default ERP_Transaction_Chart;

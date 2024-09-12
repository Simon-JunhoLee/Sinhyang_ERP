import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import Pagination from 'react-js-pagination';

const ERP_Transaction_ListPage = ({ account_number, transactions, setTransactions }) => {

    const [key, setKey] = useState('');
    const [word, setWord] = useState('');
    const [selectedDate, setSelectedDate] = useState();
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [salaryDate, setSalaryDate] = useState('');

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일  ${hours}시 ${minutes}분 ${seconds}초`;
    };

    const callTransaction = async () => {
        let url = `/erp/transaction?page=${page}&size=${size}&account_number=${account_number}`;
        if (key !== '') {
            if (key !== 'transaction_date_str') {
                url += `&key=${key}&word=${word}`;
            }
            if (selectedDate && key === 'transaction_date_str') {
                const formattedDate = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000))
                    .toISOString()
                    .split('T')[0]; // 한국 시간으로 변환
                url += `&key=${key}&transaction_date_str=${formattedDate}`;
            }
        }      
        const res = await axios.get(url);
        setTransactions(res.data.list);
        setTotal(res.data.total);
        // console.log(res.data.list);

        // 거래날짜에서 월만 추출하여 salary_date 상태에 저장
        if (res.data.list.length > 0) {
            const firstTransactionDate = new Date(res.data.list[0].transaction_date);
            const monthYear = `${firstTransactionDate.getFullYear()}년 ${String(firstTransactionDate.getMonth() + 1).padStart(2, '0')}월`;
            setSalaryDate(monthYear);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        callTransaction();
    }

    useEffect(() => {
        callTransaction();
    }, [account_number, page, key]);

    // 금액에 천 단위 구분 기호를 추가하는 함수
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>거래목록</h1>
            <Row className='mb-3'>
                <Col className='col-5'>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Col className='col-4 me-3'>
                                <Form.Select value={key} onChange={(e) => setKey(e.target.value)}>
                                    <option value="">검색어 선택</option>
                                    <option value="transaction_date_str">거래날짜</option>
                                    {transactions.some(transaction => transaction.member_info_key) ? (
                                        <option value="member_info_key">급여사원</option>
                                    ) : (
                                        <>
                                            <option value="client_id">판매처</option>
                                            <option value="vendor_id">구매처</option>
                                        </>
                                    )}
                                </Form.Select>
                            </Col>
                            <Col>
                                <InputGroup>
                                    {key === '' && (
                                        <></>
                                    )}
                                    {key === 'transaction_date_str' && (
                                        <>
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={date => setSelectedDate(date)}
                                                dateFormat="yyyy-MM-dd"
                                                className="form-control"
                                                placeholderText="날짜 선택"
                                                isClearable
                                            />
                                            <Button variant='dark' type='submit'>검색</Button>
                                        </>
                                    )}
                                    {key !== '' && key !== 'transaction_date_str' && (
                                        <>
                                            <Form.Control placeholder='검색어' value={word} onChange={(e) => setWord(e.target.value)} />
                                            <Button variant='dark' type='submit'>검색</Button>
                                        </>
                                    )}
                                </InputGroup>
                            </Col>
                        </InputGroup>
                    </form>
                </Col>
                <Col className='text-end mt-2'>
                    검색수 : {total}건
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover className="my-4">
                    <thead>
                        <tr>
                            <th>거래날짜</th>
                            <th>내용</th>
                            <th>거래금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction =>
                            <tr key={transaction.transaction_id}>
                                <td>{formatDate(new Date(transaction.transaction_date))}</td>
                                <td>{transaction.member_info_key && `${salaryDate} ${transaction.member_info_name} 월급`}
                                    {transaction.client_id !== 0 && transaction.client_name}
                                    {transaction.vendor_id !== 0 && transaction.vendor_name}
                                </td>
                                <td>
                                    {transaction.transaction_deposit !== 0 && `+${formatNumber(transaction.transaction_deposit)}`}
                                    {transaction.transaction_withdraw !== 0 && `-${formatNumber(transaction.transaction_withdraw)}`}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                {total > size &&
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={size}
                        totalItemsCount={total}
                        pageRangeDisplayed={5}
                        prevPageText={"‹"}
                        nextPageText={"›"}
                        onChange={(e) => setPage(e)} />
                }
            </Row>
        </div>
    )
}

export default ERP_Transaction_ListPage
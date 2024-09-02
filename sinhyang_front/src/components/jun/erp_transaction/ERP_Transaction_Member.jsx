import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import Pagination from 'react-js-pagination';
import Swal from 'sweetalert2';

const ERP_Transaction_Member = ({ account_number, callAccount }) => {

    const [page, setPage] = useState(1);
    const [size] = useState(30);
    const [key, setKey] = useState("");
    const [word, setWord] = useState("");
    const [total, setTotal] = useState(0);
    const [selectedDate, setSelectedDate] = useState();
    const [chk, setChk] = useState(0);

    // 사원 불러오기
    const [memberList, setMemberList] = useState([]);
    const callMember = async () => {
        let url = `/erp/salary/member?key=${key}&page=${page}&size=${size}`;
        if (key !== 'member_info_hiredate') {
            url += `&word=${word}`;
        }
        if (selectedDate && key === 'member_info_hiredate') {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            url += `&member_info_hiredate=${formattedDate}`;
            // console.log(`${formattedDate}`);
        }
        const res = await axios.get(url);

        setMemberList(res.data.list);
        setTotal(res.data.total);
        // console.log(res.data.list);
        // console.log(res.data.total);
    }

    // 부서 불러오기
    const [deptList, setDeptList] = useState([]);
    const callDept = async () => {
        const url = '/erp/dept';
        const res = await axios.get(url);
        setDeptList(res.data);
    }

    useEffect(() => {
        callMember();
        callDept();
    }, [page]);

    useEffect(() => {
        let cnt = 0;
        memberList.map(member => member.checked && cnt++);
        setChk(cnt);
    }, [memberList]);

    const onSubmit = (e) => {
        e.preventDefault();
        callMember();
        setPage(1);
    }

    const onCheckAll = (e) => {
        const data = memberList.map(member => member && { ...member, checked: e.target.checked });
        setMemberList(data);
    }

    const onCheckSingle = (e, member_info_key) => {
        setMemberList(memberList.map(member => member.member_info_key === member_info_key ? { ...member, checked: e.target.checked } : member));
    }

    const onCheckedPay = async () => {
        if (chk === 0) {
            Swal.fire({
                title: "",
                text: "급여를 송금할 사원을 선택하세요!",
                icon: "error"
            });
            return;
        }

        Swal.fire({
            title: `${chk}명의 급여를 송금하시겠습니까?`,
            text: "",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "송금"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    for (let member of memberList) {
                        if (member.checked) {
                            const salary = Math.round(member.member_info_salary / 12);
                            const transactionData = {
                                account_number,
                                transaction_withdraw: salary,
                                member_info_key: member.member_info_key
                            };
                            await axios.post('/erp/transaction', transactionData);
                        }
                    }
                    await callMember();
                    await callAccount();
                    Swal.fire({
                        title: "송금완료!",
                        text: "",
                        icon: "success"
                    });
                } catch (error) {
                    if (error.response && error.response.status === 409) {
                        Swal.fire({
                            title: "에러 발생",
                            text: "송금 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
                            icon: "error"
                        });
                    } else {
                        Swal.fire({
                            title: "에러 발생",
                            text: "송금 중 문제가 발생했습니다.",
                            icon: "error"
                        });
                    }
                }
            }
        });
    }
    
    // 금액에 천 단위 구분 기호를 추가하는 함수
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    return (
        <div className='my-5'>
            <h3 className='text-center mb-3'>사원목록</h3>
            <Row className='mb-4'>
                <Col className='col-5'>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Col className='col-4 me-3'>
                                <Form.Select value={key} onChange={(e) => setKey(e.target.value)}>
                                    <option value="">검색어 선택</option>
                                    <option value="member_info_key">사원번호</option>
                                    <option value="member_info_name">사원명</option>
                                    <option value="dept_key">부서</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <InputGroup>
                                    {key === '' && (
                                        <></>
                                    )}
                                    {key === 'member_info_hiredate' && (
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
                                    {key === 'dept_key' && (
                                        <>
                                            <Form.Select value={word} onChange={(e) => setWord(e.target.value)}>
                                                <option value="">부서선택</option>
                                                {deptList && deptList.map(dept =>
                                                    <option key={dept.dept_key} value={dept.dept_key}>
                                                        {dept.dept_name}
                                                    </option>
                                                )}
                                            </Form.Select>
                                            <Button variant='dark' type='submit'>검색</Button>
                                        </>
                                    )}
                                    {key !== '' && key !== 'member_info_hiredate' && key !== 'dept_key' && (
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
                {chk !== 0 &&
                    <Col lg={4}>
                        <Button onClick={onCheckedPay}>송금하기</Button>
                    </Col>
                }
                <Table striped bordered hover className="my-4">
                    <thead>
                        <tr>
                            <th className='text-center'>
                                <input type="checkbox" className='form-check-input' onChange={onCheckAll} checked={memberList.length === chk} />
                            </th>
                            <th>사원번호</th>
                            <th>사원명</th>
                            <th>부서</th>
                            <th>직책</th>
                            <th>입사일</th>
                            <th>연봉</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberList.map(member =>
                            <tr key={member.member_info_key}>
                                <td className='text-center'>
                                    <input type="checkbox" className='form-check-input' checked={member.checked} onChange={(e) => { onCheckSingle(e, member.member_info_key) }} />
                                </td>
                                <td>{member.member_info_key}</td>
                                <td>{member.member_info_name}</td>
                                <td>{member.dept_name}</td>
                                <td>{member.member_info_job}</td>
                                <td>{member.member_info_hiredate}</td>
                                <td>{formatNumber(member.member_info_salary)}원</td>
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

export default ERP_Transaction_Member
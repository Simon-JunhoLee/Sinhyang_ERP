import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Pagination from 'react-js-pagination';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ERP_Member_ListPage = () => {

    const member_info_key = sessionStorage.getItem("member_info_key");
    const session_member_info_auth = sessionStorage.getItem("member_info_auth");

    useEffect(() => {
        if (!member_info_key) {
            window.location.href = '/erp/member/login';
            sessionStorage.setItem('target', '/erp/member/list');
        }
    }, [member_info_key]);

    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [key, setKey] = useState("");
    const [word, setWord] = useState("");
    const [total, setTotal] = useState(0);
    const [selectedDate, setSelectedDate] = useState();
    const navigate = useNavigate();

    // 사원 불러오기
    const [memberList, setMemberList] = useState([]);
    const callMember = async () => {
        let url = `/erp/member?key=${key}&page=${page}&size=${size}`;
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

    const onSubmit = (e) => {
        e.preventDefault();
        callMember();
        setPage(1);
    }

    // 금액에 천 단위 구분 기호를 추가하는 함수
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const onRowClick = (member_info_id) => {
        {session_member_info_auth == "관리자" ?
            navigate(`/erp/member/read/${member_info_id}`)
        :
            Swal.fire({
                title: "권한부족",
                text: "관리자 권한만 열람 가능합니다!",
                icon: "error"
            }).then(()=>{
                return;
            })
        }
    };

return (
    <div className='my-5'>
        <h1 className='text-center mb-5'>사원목록</h1>
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
                                <option value="member_info_job">직책</option>
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
                                {key === 'member_info_job' && (
                                    <>
                                        <Form.Select value={word} onChange={(e) => setWord(e.target.value)}>
                                            <option value="">직책선택</option>
                                            <option value="인턴">인턴</option>
                                            <option value="사원">사원</option>
                                            <option value="주임">주임</option>
                                            <option value="대리">대리</option>
                                            <option value="과장">과장</option>
                                            <option value="차장">차장</option>
                                            <option value="팀장">팀장</option>
                                            <option value="임원">임원</option>
                                            <option value="퇴사">퇴사</option>
                                        </Form.Select>
                                        <Button variant='dark' type='submit'>검색</Button>
                                    </>
                                )}
                                {key !== '' && key !== 'member_info_hiredate' && key !== 'dept_key' && key !== 'member_info_job' && (
                                    <>
                                        <Form.Control placeholder='검색어' value={word} onChange={(e) => setWord(e.target.value)} />
                                        <Button variant='dark' type='submit'>검색</Button>
                                    </>
                                )}
                            </InputGroup>
                        </Col>
                    </InputGroup>
                </form>
            </Col >
            <Col className='text-end mt-2'>
                검색수 : {total}건
            </Col>
        </Row >
        <Row>
            <Table striped bordered hover className="my-4">
                <thead>
                    <tr>
                        <th>사원번호</th>
                        <th>사원명</th>
                        <th>부서</th>
                        <th>직책</th>
                        <th>입사일</th>
                        {session_member_info_auth == "관리자" &&
                            <th>연봉</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {memberList.map(member =>
                        <tr key={member.member_info_key} onClick={() => onRowClick(member.member_info_id)} style={{ cursor: 'pointer' }}>
                            <td>{member.member_info_key}</td>
                            <td>{member.member_info_name}</td>
                            <td>{member.dept_name}</td>
                            <td>{member.member_info_job}</td>
                            <td>{member.member_info_hiredate}</td>
                            {session_member_info_auth == "관리자" &&
                                <td>{formatNumber(member.member_info_salary)}원</td>
                            }
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
    </div >
)
}

export default ERP_Member_ListPage
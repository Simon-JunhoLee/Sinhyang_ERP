import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import { FaUser } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../common/assets/erp/css/Customize.css';
import ERP_Member_SalaryPage from './ERP_Member_SalaryPage';
import ERP_Member_AttendancePage from './ERP_Member_AttendancePage';

const ERP_Member_MyPage = () => {
    const member_info_id = sessionStorage.getItem('member_info_id');
    const member_info_key = sessionStorage.getItem('member_info_key');
    const member_info_name = sessionStorage.getItem('member_info_name');
    const [member, setMember] = useState({});
    const { member_info_resident, member_info_phone, member_info_address1, member_info_address2, member_info_email,
        member_info_hiredate, member_info_account, member_info_job, member_info_photo, dept_name } = member;
    const navigate = useNavigate('');

    const onUpdateInfo = () => {
        navigate('/erp/member/updateInfo');
    }

    const callMember = async () => {
        const url = `/erp/member/${member_info_id}`;
        const res = await axios.get(url);
        setMember(res.data);
    }

    useEffect(() => {
        callMember();
    }, []);

    return (
        <Row className="justify-content-center readPage">
            <Col className="col-xl-11 col-lg-12 col-md-9">
                <Card className="o-hidden border-0 shadow-lg my-5">
                    <Card.Body className="p-0">
                        <Row>
                            <div className="text-center mt-5 mb-3">
                                <h1 className="h4 text-gray-900 mb-4">My Page</h1>
                            </div>
                            <div className='text-end my-3 px-5'>
                                <Button className='px-3' variant='dark' onClick={onUpdateInfo}>비밀번호 변경</Button>
                            </div>
                            <div className='px-5 text-center'>
                                <Table bordered className='mb-5'>
                                    <tbody>
                                        <tr className='text-center'>
                                            <td rowSpan={6} className='text-center align-middle'>
                                                {!member_info_photo && <FaUser className="member-photo" />}
                                                {member_info_photo && <img src={member_info_photo} className="member-photo" />}
                                            </td>
                                            <td className='text-center table-dark'>사원번호</td>
                                            <td>{member_info_key}</td>
                                            <td className='text-center table-dark'>사원명</td>
                                            <td>{member_info_name}</td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td className='text-center table-dark'>부서</td>
                                            <td>{dept_name}팀</td>
                                            <td className='text-center table-dark'>직급</td>
                                            <td>{member_info_job}</td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td className='text-center table-dark'>입사일</td>
                                            <td>{member_info_hiredate}</td>
                                            <td className='text-center table-dark'>생년월일</td>
                                            <td>{member_info_resident ? `${member_info_resident}` : '-'}</td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td className='text-center table-dark'>연락처</td>
                                            <td>{member_info_phone ? `${member_info_phone}` : '-'}</td>
                                            <td className='text-center table-dark'>이메일</td>
                                            <td>{member_info_email ? `${member_info_email}` : '-'}</td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td className='text-center table-dark'>주소</td>
                                            <td colSpan={3}>{member_info_address1 ? `${member_info_address1} ${member_info_address2}` : '-'}</td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td className='text-center table-dark'>계좌번호</td>
                                            <td colSpan={3}>{member_info_account ? `${member_info_account}` : '-'}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Row>
                        <ERP_Member_AttendancePage />
                        <ERP_Member_SalaryPage />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default ERP_Member_MyPage
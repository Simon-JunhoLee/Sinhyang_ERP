import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ERP_Member_RegisterPage = () => {
    const session_member_info_auth = sessionStorage.getItem("member_info_auth");
    const session_member_info_key = sessionStorage.getItem("member_info_key");
    useEffect(() => {
        if (!session_member_info_key) {
            window.location.href = '/erp/member/login';
            sessionStorage.setItem('target', '/erp/attendance/list');
        }
        if (session_member_info_auth !== '관리자') {
            Swal.fire({
                title: "권한 부족",
                text: "해당 페이지의 권한이 없습니다.",
                icon: "error"
            }).then(()=>{
                window.location.href = '/erp';
            })
        }
    }, [session_member_info_key]);
    
    const [form, setForm] = useState({});
    const [dept, setDept] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [member_info_key, setMember_info_key] = useState();
    const { member_info_id, member_info_pass, member_info_name, member_info_resident, dept_key } = form;
    const navigate = useNavigate('');

    const callMemberKey = async () => {
        const url = '/erp/member/memberKey';
        const res = await axios.get(url);
        setMember_info_key(res.data);
    }

    const callDept = async () => {
        const url = '/erp/dept';
        const res = await axios.get(url);
        setDept(res.data);
    }

    const onChangeForm = (e) => {
        let { name, value } = e.target;
        if (name === 'member_info_resident') {
            value = value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자를 제거
            if (value.length > 13) {
                value = value.slice(0, 13); // 최대 13자리로 제한
            }
            if (value.length > 6) {
                value = value.slice(0, 6) + '-' + value.slice(6, 13); // 6자리 이후에 '-' 추가
            }
        }
        setForm({ ...form, [name]: value });
        setFormErrors({ ...formErrors, [name]: '' }); // 입력 시 에러 메시지 제거
    }

    const validateForm = () => {
        const errors = {};
        if (!member_info_id) errors.member_info_id = 'ID를 입력해야 합니다.';
        if (!member_info_resident) errors.member_info_resident = '주민등록번호를 입력해야 합니다.';
        if (!member_info_name) errors.member_info_name = '사원명을 입력해야 합니다.';
        if (!member_info_pass) errors.member_info_pass = '패스워드를 입력해야 합니다.';
        if (!dept_key) errors.dept_key = '부서를 선택해야 합니다.';
        return errors;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            await axios.post('/erp/member', form);
            navigate('/erp/member/list');
        } else {
            setFormErrors(errors);
        }
    }

    useEffect(() => {
        callMemberKey();
        callDept();
    }, []);

    return (
        <Row className="justify-content-center">
            <Col className="col-xl-10 col-lg-12 col-md-9">
                <Card className="o-hidden border-0 shadow-lg my-5">
                    <Card.Body className="p-0">
                        <Form className='p-5' onSubmit={onSubmit}>
                            <Row className='d-flex justify-content-center align-items-center'>
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Register</h1>
                                </div>
                                <Col lg={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Control name="member_info_key" value={member_info_key} placeholder="Member Key" disabled style={{ backgroundColor: 'white' }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control name="member_info_id" value={member_info_id} placeholder="ID(초기설정 : 사원번호)" onChange={onChangeForm} />
                                        {formErrors.member_info_id && <div style={{ color: 'red' }}>{formErrors.member_info_id}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control name="member_info_resident" value={member_info_resident} placeholder="주민등록번호('-' 빼고 입력)" onChange={onChangeForm} />
                                        {formErrors.member_info_resident && <div style={{ color: 'red' }}>{formErrors.member_info_resident}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control name="member_info_name" value={member_info_name} placeholder="사원명" onChange={onChangeForm} />
                                        {formErrors.member_info_name && <div style={{ color: 'red' }}>{formErrors.member_info_name}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="password" name="member_info_pass" value={member_info_pass} placeholder="패스워드" onChange={onChangeForm} />
                                        {formErrors.member_info_pass && <div style={{ color: 'red' }}>{formErrors.member_info_pass}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Select name="dept_key" value={dept_key} onChange={onChangeForm}>
                                            <option value="">부서를 선택하세요</option>
                                            {dept.map(d =>
                                                <option value={d.dept_key} key={d.dept_key}>{d.dept_name}</option>
                                            )}
                                        </Form.Select>
                                        {formErrors.dept_key && <div style={{ color: 'red' }}>{formErrors.dept_key}</div>}
                                    </Form.Group>
                                    <div className='mb-3 mt-3'>
                                        <Button className="btn btn-dark w-100" type="submit">Register</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default ERP_Member_RegisterPage
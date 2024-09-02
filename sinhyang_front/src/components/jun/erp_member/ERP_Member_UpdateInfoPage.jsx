import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ERP_Member_UpdateInfoPage = () => {
    const member_info_id = sessionStorage.getItem('member_info_id');
    const member_info_key = sessionStorage.getItem('member_info_key');
    const [form, setForm] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [storedPass, setStoredPass] = useState('');

    const callMember = async () => {
        const url = `/erp/member/${member_info_id}`;
        const res = await axios.get(url);
        setStoredPass(res.data.member_info_pass);
    }

    const onChangeForm = (e) => {
        let { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setFormErrors({ ...formErrors, [name]: '' });
    }

    const validateForm = () => {
        const errors = {};
        if (!form.member_info_pass) errors.member_info_pass = '기존 비밀번호를 입력해야 합니다.';
        if (!form.member_info_pass_new) errors.member_info_pass_new = '새 비밀번호를 입력해야 합니다.';
        if (!form.member_info_pass_check) errors.member_info_pass_check = '비밀번호 확인을 입력해야 합니다.';
        if (form.member_info_pass_new !== form.member_info_pass_check) errors.member_info_pass_check = '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.';
        return errors;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            const res = await axios.post('/erp/member/login', { member_info_id, member_info_pass: form.member_info_pass });
            // console.log(res.data);
            if (res.data == 2) {
                Swal.fire({
                    title: "비밀번호 변경 에러",
                    text: "기존 비밀번호가 일치하지 않습니다!",
                    icon: "error"
                });
                return;
            } else {
                Swal.fire({
                    title: `비밀번호를 변경하시겠습니까?`,
                    text: "",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        // 비밀번호 변경
                        await axios.put('/erp/member/login', {
                            member_info_id: member_info_id,
                            member_info_pass: form.member_info_pass_new,
                            member_info_key: member_info_key
                        });
                        Swal.fire({
                            title: "비밀번호 변경 완료!",
                            text: "",
                            icon: "success"
                        }).then(() => {
                            sessionStorage.clear();
                            window.location.href = '/erp/member/login';
                        });
                    }
                });
            }
        } else {
            setFormErrors(errors);
        }
    }

    useEffect(() => {
        callMember();
    }, [])

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
                                        <Form.Control name="member_info_id" value={member_info_id} readOnly style={{ backgroundColor: 'white' }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control name="member_info_pass" type='password' placeholder="기존 비밀번호" onChange={onChangeForm} />
                                        {formErrors.member_info_pass && <div style={{ color: 'red' }}>{formErrors.member_info_pass}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control name="member_info_pass_new" type='password' placeholder="새비밀번호" onChange={onChangeForm} />
                                        {formErrors.member_info_pass_new && <div style={{ color: 'red' }}>{formErrors.member_info_pass_new}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="password" name="member_info_pass_check" placeholder="비밀번호확인" onChange={onChangeForm} />
                                        {formErrors.member_info_pass_check && <div style={{ color: 'red' }}>{formErrors.member_info_pass_check}</div>}
                                    </Form.Group>
                                    <div className='mb-3 mt-3'>
                                        <Button className="btn btn-dark w-100" type="submit">비밀번호 변경</Button>
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

export default ERP_Member_UpdateInfoPage
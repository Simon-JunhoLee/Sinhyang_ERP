import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import Swal from 'sweetalert2';

const ERP_Member_LoginPage = () => {
    const [form, setForm] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const { member_info_id, member_info_pass } = form;

    const onChangeForm = (e) => {
        let { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setFormErrors({ ...formErrors, [name]: '' });
    }

    const validateForm = () => {
        const errors = {};
        if (!member_info_id) errors.member_info_id = 'ID를 입력해야 합니다.';
        if (!member_info_pass) errors.member_info_pass = '패스워드를 입력해야 합니다.';
        return errors;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            const res = await axios.post('/erp/member/login', {member_info_id, member_info_pass});
            // console.log(res.data);
            if (res.data == 0) {
                Swal.fire({
                    title: "로그인 에러",
                    text: "아이디가 존재하지 않습니다!",
                    icon: "error"
                });
                return;
            } else if (res.data == 2) {
                Swal.fire({
                    title: "로그인 에러",
                    text: "비밀번호가 일치하지 않습니다!",
                    icon: "error"
                });
                return;
            } else {
                Swal.fire({
                    title: "로그인 성공",
                    text: "",
                    icon: "success"
                }).then(async () => {
                    const res = await axios.get(`/erp/member/${member_info_id}`);
                    sessionStorage.setItem('member_info_id', res.data.member_info_id);
                    sessionStorage.setItem('member_info_key', res.data.member_info_key);
                    sessionStorage.setItem('member_info_name', res.data.member_info_name);
                    sessionStorage.setItem('member_info_auth', res.data.member_info_auth);
                    if (sessionStorage.getItem('target')) {
                        window.location.href = sessionStorage.getItem('target');
                    } else {
                        window.location.href = '/erp';
                    }
                });
            }
        } else {
            setFormErrors(errors);
        }
    }

    return (
        <Row className="justify-content-center">
            <Col className="col-xl-10 col-lg-12 col-md-9">
                <Card className="o-hidden border-0 shadow-lg my-5">
                    <Card.Body className="p-0">
                        <Row>
                            <Col lg={6}>
                                <img src="/images/logo/shlogi3.png" width="100%" alt="Login" />
                            </Col>
                            <Col lg={6} className="d-flex flex-column justify-content-center">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Login</h1>
                                    </div>
                                    <Form onSubmit={onSubmit}>
                                        <Form.Group className="mb-2">
                                            <Form.Control name="member_info_id" placeholder="ID" onChange={onChangeForm} />
                                            {formErrors.member_info_id && <div style={{ color: 'red' }}>{formErrors.member_info_id}</div>}
                                        </Form.Group>
                                        <Form.Group className="mb-2">
                                            <Form.Control type="password" name="member_info_pass" placeholder="Password" onChange={onChangeForm} />
                                            {formErrors.member_info_pass && <div style={{ color: 'red' }}>{formErrors.member_info_pass}</div>}
                                        </Form.Group>
                                        <Button className="btn btn-dark w-100" type="submit">Login</Button>
                                        <hr />
                                    </Form>
                                    
                                    
                                    <div className="text-center">
                                        <a className="small" href="#">Forgot Password?</a>
                                    </div>
                                    <div className="text-center">
                                        <a className="small" href="#">Create an Account!</a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default ERP_Member_LoginPage
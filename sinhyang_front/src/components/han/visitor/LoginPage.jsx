import React, { useContext, useState } from 'react'
import { Row, Col, Card, Form, InputGroup, Button, ButtonToolbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { RiEyeLine } from "react-icons/ri";
import { RiEyeOffLine } from "react-icons/ri";

const LoginPage = () => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const [visitor_id, setVisitor_id] = useState('');
    const [visitor_pass, setVisitor_pass] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onChangeVisitor_id = (e) => {
        setVisitor_id(e.target.value);
    };

    const onChangeVisitor_pass = (e) => {
        setVisitor_pass(e.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!visitor_id || !visitor_pass) {
            alert("ID와 비밀번호를 모두 입력해주세요.");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post('/web/visitor/login', { visitor_id, visitor_pass });
            if (res.data === 1) {
                alert("로그인성공");
                console.log(res.data);
                sessionStorage.setItem('visitor_id', visitor_id);
                window.location.href = '/web';
            } else if (res.data === 2) {
                alert("비밀번호가 틀렸습니다.")
            } else if (res.data === 3) {
                alert("탈퇴한 회원입니다.")
            }
            else { alert("존재하지 않는 ID입니다.") }
        } catch (error) {
            console.error("로그인중 오류 : ", error)
        }

        setLoading(false);
    }

    const onClickJoin = () => {
        window.location.href = '/web/visitor/insert';
    }

    return (
        <Row className="justify-content-center">
            <Col xs={8} md={6} lg={4}>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-4 text-center">로그인</Card.Title>
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3" controlId="formVisitor_id">
                                <InputGroup>
                                    <InputGroup.Text style={{ width: '90px' }}>아이디</InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="visitor_id"
                                        value={visitor_id}
                                        onChange={onChangeVisitor_id}
                                        placeholder="아이디를 입력하세요."
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formVisitor_pass">
                                <InputGroup>
                                    <InputGroup.Text style={{ width: '90px' }}>비밀번호</InputGroup.Text>
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        name="visitor_pass"
                                        value={visitor_pass}
                                        onChange={onChangeVisitor_pass}
                                        placeholder="비밀번호를 입력하세요."
                                    />
                                    <InputGroup.Text onClick={toggleShowPassword} style={{ cursor: 'pointer' }}>
                                        {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            <div className='text-center'>
                                <Button variant="outline-dark" type="submit" disabled={loading} style={{ width: '90px' }}>
                                    로그인
                                </Button>
                                <Button variant='outline-dark ms-3' style={{ width: '90px' }} onClick={onClickJoin}>
                                    회원가입
                                </Button>
                            </div>
                            <div className='text-end mt-2' style={{ fontSize: '15px' }}>
                                <a href='/web/visitor/searchid'>아이디찾기</a>
                                /
                                <a href='/web/visitor/searchpass'>비밀번호찾기</a>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default LoginPage
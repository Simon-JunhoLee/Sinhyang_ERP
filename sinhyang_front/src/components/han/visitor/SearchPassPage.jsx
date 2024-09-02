import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';

const SearchPassPage = () => {
    const [visitor_email, setVisitor_email] = useState('');
    const [visitor_id, setVisitor_id] = useState('');
    const onChangeVisitor_email = (e) => {
        setVisitor_email(e.target.value);
    };
    const onChangeVisitor_id = (e) => {
        setVisitor_id(e.target.value);
    };

    const onClickSend = async () => {
        if (!visitor_email || !visitor_id) {
            alert("아이디와 이메일을 모두 입력해주세요.");
            return;
        }
        try {
            //없는 아이디와 이메일 입력했을때 거르는 기능 추가
            const response = await axios.post("/web/visitor/searchpass", { visitor_email: visitor_email, visitor_id: visitor_id }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )
            alert("등록된 이메일로 임시비밀번호가 전송되었습니다.")
            console.log(response.data)
        } catch (error) {
            alert("해당 아이디와 이메일로 검색되는 결과가 없습니다.")
            console.error('에러!!!!!', error);
        }
    }

    return (
        <Row className="justify-content-center">
            <Col xs={8} md={6} lg={4}>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-4 text-center">비밀번호찾기</Card.Title>
                        <Form>
                            <Form.Group controlId='visitor_id' className='mb-2'>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        name="visitor_id"
                                        value={visitor_id}
                                        onChange={onChangeVisitor_id}
                                        placeholder="아이디를 입력하세요."
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId='visitor_email'>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        name="visitor_email"
                                        value={visitor_email}
                                        onChange={onChangeVisitor_email}
                                        placeholder="이메일을 입력하세요."
                                    />
                                </InputGroup>
                            </Form.Group>
                            <div className='mt-2'>
                                <h6>가입 시 입력한 이메일로 임시비밀번호를 보내드립니다.</h6>
                            </div>
                            <div className='text-center mt-3'>
                                <Button variant='outline-dark' onClick={onClickSend}>이메일전송</Button>
                            </div>
                            <div className='text-end'>
                                <a href='/web/visitor/login'>로그인하러가기</a>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default SearchPassPage
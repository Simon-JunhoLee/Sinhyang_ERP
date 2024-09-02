import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import moment from 'moment/moment';
const MyPage = () => {
    // 기본 폼 관련
    const vid = sessionStorage.getItem("visitor_id");
    const [photoUrl, setPhotoUrl] = useState('');
    const [form, setForm] = useState({
        visitor_id: vid,
        visitor_pass: '',
        visitor_name: '',
        visitor_birthday: '',
        visitor_phone: '',
        visitor_photo: '',
        visitor_email: '',
        visitor_address1: '',
        visitor_address2: ''
    });

    const { visitor_id, visitor_pass, visitor_name, visitor_birthday,
        visitor_phone, visitor_photo, visitor_email,
        visitor_address1, visitor_address2 } = form;
    const fbirth = moment(visitor_birthday).format('YYYY-MM-DD');
    // API 호출
    const callAPI = async () => {
        try {
            const url = `/web/visitor/mypage/${vid}`;
            const res = await axios.get(url);
            setForm(res.data);
        } catch (error) {
            console.log("마이페이지 로딩 중 오류", error);
        }
    };

    useEffect(() => {
        callAPI();



    }, []);


    // 수정 페이지로 이동
    const onClickGo = () => {
        window.location.href = '/web/visitor/update';
    };


    //회원탈퇴
    const onClickDelete = () => {
        if (!window.confirm("회원탈퇴를 진행하시겠습니까?")) return;
        const visitor_id = sessionStorage.getItem("visitor_id");
        try {
            axios.put(`/web/visitor/delete/${visitor_id}`)
            sessionStorage.clear();
            alert("회원탈퇴 완료. 홈으로 이동합니다.")
            window.location.href = '/web';
        } catch (error) {
            alert("회원탈퇴 중 오류, 다시 시도해주세요.")
        }

    };

    return (
        <Row className='justify-content-center'>
            <Col sm={8} md={6} lg={4}>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-4 text-center">마이페이지</Card.Title>
                        <Form>
                            <Form.Group controlId="visitor_id" className='mb-4'>
                                <Form.Label>아이디</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="visitor_id"
                                    value={visitor_id}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="visitor_name" className='mb-4'>
                                <Form.Label>이름</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="visitor_name"
                                    value={visitor_name}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="visitor_email" className='mb-4'>
                                <Form.Label>이메일</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="visitor_email"
                                    value={visitor_email}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="visitor_birthday" className='mb-4'>
                                <Form.Label className='me-3'>생년월일</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="visitor_birthday"
                                    value={fbirth}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="visitor_phone" className='mb-4'>
                                <Form.Label>연락처</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="visitor_phone"
                                    value={visitor_phone}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="visitor_address1" className='mb-1'>
                                <Form.Label>주소</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="visitor_address1"
                                    value={visitor_address1}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="visitor_address2" className='mb-4'>
                                <Form.Control
                                    type="text"
                                    name="visitor_address2"
                                    value={visitor_address2}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="visitor_photo" className='mb-4'>
                                <Form.Label>프로필사진</Form.Label>

                                <div>
                                    {visitor_photo ?
                                        (<img src={`${process.env.PUBLIC_URL}/images/visitor/${visitor_id}.jpg`}
                                            alt="프로필사진" style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }} />)
                                        :
                                        (<h6>프로필 사진이 없습니다.</h6>)
                                    }
                                </div>
                            </Form.Group>
                            <div className='text-center'>
                                <Button style={{ width: '35%' }} variant='outline-dark' onClick={onClickGo}>내 정보 수정</Button>
                            </div>
                            <div className='text-end'>
                                <a href='#' onClick={onClickDelete}>회원탈퇴</a>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default MyPage;

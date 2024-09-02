import React, { useState } from 'react';
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AddressModal from '../visitor/AddressModal';

const JoinPage = () => {
    // 기본 폼 관련
    const [form, setForm] = useState({
        visitor_id: '',
        visitor_pass: '',
        visitor_name: '',
        visitor_birthday: '1991-01-01',
        visitor_phone: '',
        visitor_photo: '',
        visitor_email: '',
        visitor_address1: '',
        visitor_address2: ''
    });
    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const { visitor_id, visitor_pass, visitor_name, visitor_birthday,
        visitor_phone, visitor_photo, visitor_email,
        visitor_address1, visitor_address2 } = form;


    // 생일관련    
    const today = new Date();
    const handleDateChange = (date) => {
        setForm({ ...form, visitor_birthday: date });
    };


    //정규식 관련
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        const vidRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
        const vpassRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const vemailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!vidRegex.test(visitor_id)) {
            newErrors.visitor_id = "아이디는 8글자 이상의 영문과 숫자가 포함되어야 합니다.";
        }
        if (!vpassRegex.test(visitor_pass)) {
            newErrors.visitor_pass = "비밀번호는 8글자 이상의 영문자, 숫자, 특수문자가 모두 포함되어야 합니다.";
        }
        if (!vemailRegex.test(visitor_email)) {
            newErrors.visitor_email = "이메일 형식에 맞게 작성해주세요.";
        }
        return newErrors;
    };


    //사진관련
    const [visitorPhoto, setVisitorPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setVisitorPhoto(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };


    // 아이디 중복체크 관련
    const [check, setCheck] = useState(false);
    const handleIdChange = (e) => {
        onChangeForm(e);
        setCheck(false);
        setErrors(prevErrors => ({ ...prevErrors, visitor_id: '' }));
    };
    const handleCheck = () => {
        const vidRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
        if (!vidRegex.test(visitor_id)) {
            setErrors(prevErrors => ({ ...prevErrors, visitor_id: "아이디는 8글자 이상의 영문과 숫자가 포함되어야 합니다." }));
            return;
        }
        if (visitor_id === '') {
            alert('아이디를 입력하세요');
            return;
        }
        try {
            axios.get(`/web/visitor/check/${visitor_id}`)
                .then(response => {
                    console.log(response.data.visitor_id);
                    if (response.data.visitor_id === "0") {
                        alert("사용가능한 아이디입니다.");
                        setCheck(true);
                    } else {
                        alert("이미 사용중인 아이디입니다.");
                    }
                })
        } catch (error) {
            console.error("아이디 중복체크 중 오류", error);
        };
    };


    //최종가입관련
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!check) {
            alert("아이디 중복체크를 해야합니다.");
            return;
        }
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        if (!window.confirm("가입하시겠습니까?")) return;
        try {
            console.log(form)
            await axios.post('/web/visitor/insert', form);
            alert("가입완료! 로그인페이지로 이동합니다.");
            window.location.href = '/web/visitor/login';
        } catch (error) {
            console.error("회원가입중 오류", error);
        }
    };


    return (
        <Row className='justify-content-center'>
            <Col sm={8} md={6} lg={4}>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-4 text-center">회원가입</Card.Title>
                        <h6 className='mb-2'>(*)은 필수 입력 사항입니다.</h6>
                        <Form onSubmit={onSubmit}>
                            <Form.Group controlId="visitor_id" className='mb-4'>
                                <Form.Label>아이디(*) (8자 이상의 영문)</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        name="visitor_id"
                                        value={visitor_id}
                                        onChange={handleIdChange}
                                        isInvalid={!!errors.visitor_id}
                                    />
                                    <Button onClick={handleCheck} variant='outline-dark'>중복체크</Button>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.visitor_id}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="visitor_pass" className='mb-4'>
                                <Form.Label>비밀번호(*) (8자 이상의 영문,숫자,특수문자 조합)</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="visitor_pass"
                                    value={visitor_pass}
                                    onChange={onChangeForm}
                                    isInvalid={!!errors.visitor_pass}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.visitor_pass}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="visitor_name" className='mb-4'>
                                <Form.Label>이름(*)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="visitor_name"
                                    value={visitor_name}
                                    onChange={onChangeForm}
                                />
                            </Form.Group>
                            <Form.Group controlId="visitor_email" className='mb-4'>
                                <Form.Label>이메일(*)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="visitor_email"
                                    value={visitor_email}
                                    onChange={onChangeForm}
                                    isInvalid={!!errors.visitor_email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.visitor_email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="visitor_birthday" className='mb-4'>
                                <Form.Label className='me-3'>생년월일 (아래의 날짜를 클릭해서 선택)</Form.Label>
                                <div>
                                    <DatePicker
                                        selected={visitor_birthday}
                                        onChange={handleDateChange}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Select a date"
                                        className="form-control"
                                        name="visitor_birthday"
                                        showYearDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={90}
                                        minDate={new Date("1901-01-01")}
                                        maxDate={today}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group controlId="visitor_phone" className='mb-4'>
                                <Form.Label>연락처</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="visitor_phone"
                                    value={visitor_phone}
                                    onChange={onChangeForm}
                                />
                            </Form.Group>
                            <Form.Group controlId="visitor_address1" className='mb-1'>
                                <Form.Label>주소</Form.Label>
                                <InputGroup>

                                    <Form.Control
                                        type="text"
                                        name="visitor_address1"
                                        value={visitor_address1}
                                        onChange={onChangeForm}
                                        readOnly
                                        placeholder='주소검색을 이용하세요.'
                                    />
                                    <AddressModal setForm={setForm} form={form} />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="visitor_address2" className='mb-4'>
                                <Form.Control
                                    type="text"
                                    name="visitor_address2"
                                    value={visitor_address2}
                                    onChange={onChangeForm}
                                    placeholder='상세주소를 입력하세요.'
                                />
                            </Form.Group>
                            <div className='text-center'>
                                <Button type="submit" style={{ width: '30%' }} variant='outline-dark'>가 입</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default JoinPage;

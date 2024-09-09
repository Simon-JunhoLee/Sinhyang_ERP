import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AddressModal from '../visitor/AddressModal';
import { RiEyeLine } from "react-icons/ri";
import { RiEyeOffLine } from "react-icons/ri";

const UpdatePage = () => {
    const [vid, setVid] = useState(sessionStorage.getItem("visitor_id"));
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        visitor_id: '',
        visitor_pass: '',
        visitor_name: '',
        visitor_birthday: '1991-01-01',
        visitor_phone: '',
        visitor_photo: null,
        visitor_email: '',
        visitor_address1: '',
        visitor_address2: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        callAPI();
    }, []);

    const callAPI = async () => {
        try {
            const url = `/web/visitor/mypage/${vid}`;
            const res = await axios.get(url);
            const { visitor_pass, ...rest } = res.data;
            setForm(rest);
        } catch (error) {
            console.log("마이페이지 로딩 중 오류", error);
        }
    };

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setForm({ ...form, visitor_birthday: date });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        const vidRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
        const vpassRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const vemailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!vidRegex.test(form.visitor_id)) {
            newErrors.visitor_id = "아이디는 8글자 이상의 영문과 숫자가 포함되어야 합니다.";
        }
        if (form.visitor_pass && !vpassRegex.test(form.visitor_pass)) {
            newErrors.visitor_pass = "비밀번호는 8글자 이상의 영문자, 숫자, 특수문자가 모두 포함되어야 합니다.";
        }
        if (!vemailRegex.test(form.visitor_email)) {
            newErrors.visitor_email = "이메일 형식에 맞게 작성해주세요.";
        }
        setErrors(newErrors);
        return newErrors;
    };

    const today = new Date();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            return;
        }
        if (!window.confirm("저장하시겠습니까?")) return;

        // vid와 selectedFile이 제대로 설정되었는지 확인
        const vid = sessionStorage.getItem("visitor_id");
        console.log('Visitor ID:', vid);
        console.log('Selected File:', selectedFile);


        const formData = { ...form, visitor_id: vid }; // visitor_id를 formData에 추가
        //새비밀번호를 작성했을때만 보냄
        if(!form.visitor_pass){
            delete formData.visitor_pass;
        }
        setLoading(true)
        //텍스트 정보 업데이트
        try {
            await axios.post('/web/visitor/update', formData);
            setLoading(false)

        } catch (error) {
            console.log("텍스트정보 업데이트중 오류", error);
        }
        //이미지 업데이트
        if (selectedFile) {
            try {
                const photoData = new FormData();
                photoData.append('visitor_id', vid);
                photoData.append('visitor_photo', selectedFile);

                // FormData 내용 출력
                for (let [key, value] of photoData.entries()) {
                    console.log(`${key}:`, value);
                }

                setLoading(true);
                await axios.post('/web/visitor/updatePhoto', photoData);
                setLoading(false);
            } catch (error) {
                console.error("정보수정중 오류", error);
            }
        }
        alert("저장완료! 마이페이지로 이동합니다.");
        window.location.href = '/web/visitor/mypage';
    };

    const onClickReset = () => {
        callAPI();
    };

    return (
        <Row className='justify-content-center'>
            <Col sm={8} md={6} lg={4}>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-4 text-center">정보수정</Card.Title>
                        <h6 className='mb-2'>(*)은 필수 입력 사항입니다.</h6>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="visitor_pass" className='mb-4'>
                                <Form.Label>
                                    새비밀번호 (8자 이상의 영문,숫자,특수문자 조합)<br/>
                                    (현재 비밀번호를 유지하려면 비워두세요)
                                </Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        name="visitor_pass"
                                        value={form.visitor_pass}
                                        onChange={onChangeForm}
                                        isInvalid={!!errors.visitor_pass}
                                    />
                                    <InputGroup.Text onClick={toggleShowPassword} style={{ cursor: 'pointer' }}>
                                        {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                                    </InputGroup.Text>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.visitor_pass}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="visitor_name" className='mb-4'>
                                <Form.Label>이름(*)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="visitor_name"
                                    value={form.visitor_name}
                                    onChange={onChangeForm}
                                />
                            </Form.Group>
                            <Form.Group controlId="visitor_email" className='mb-4'>
                                <Form.Label>이메일(*)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="visitor_email"
                                    value={form.visitor_email}
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
                                        selected={new Date(form.visitor_birthday)}
                                        onChange={handleDateChange}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Select a date"
                                        className="form-control"
                                        name="visitor_birthday"
                                        showYearDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={200}
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
                                    value={form.visitor_phone}
                                    onChange={onChangeForm}
                                />
                            </Form.Group>
                            <Form.Group controlId="visitor_address1" className='mb-1'>
                                <Form.Label>주소</Form.Label>
                                <InputGroup>

                                    <Form.Control
                                        type="text"
                                        name="visitor_address1"
                                        value={form.visitor_address1}
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
                                    value={form.visitor_address2}
                                    onChange={onChangeForm}
                                    placeholder='상세주소를 입력하세요.'
                                />
                            </Form.Group>

                            <Form.Group controlId="visitor_photo" className='mb-4'>
                                <Form.Label>프로필 사진 변경</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {selectedFile && (
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="프로필 사진 미리보기"
                                        style={{ maxWidth: '100%', marginTop: '10px' }}
                                    />
                                )}
                            </Form.Group>

                            <div className='text-center'>
                                <Button type="Submit" style={{ width: '25%' }} variant='outline-dark me-3'>저 장</Button>
                                <Button style={{ width: '25%' }} variant='outline-dark' onClick={onClickReset}>초 기 화</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default UpdatePage;

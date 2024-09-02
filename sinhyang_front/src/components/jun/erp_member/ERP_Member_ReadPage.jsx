import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import AddressModal from '../../../common/AddressModal';
import { FaUser } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import '../../../common/assets/erp/css/Customize.css';

const ERP_Member_ReadPage = () => {
    const { member_info_id } = useParams();
    const [formErrors, setFormErrors] = useState({});
    const [file, setFile] = useState({
        name: "",
        byte: ""
    });
    const refFile = useRef(null);

    // 부서 불러오기
    const [deptList, setDeptList] = useState([]);
    const callDept = async () => {
        const url = '/erp/dept';
        const res = await axios.get(url);
        setDeptList(res.data);
    }

    // 사원 불러오기
    const [member, setMember] = useState('');
    const { member_info_key, member_info_name, member_info_resident, member_info_phone, member_info_address1, member_info_address2, member_info_email,
            member_info_photo, member_info_account, member_info_job, dept_key, dept_name, member_info_hiredate, member_info_salary, member_info_auth } = member;

    const callMemberInfo = async () => {
        const url = `/erp/member/${member_info_id}`;
        const res = await axios.get(url);
        setMember({ ...res.data, member_info_salary: formatSalary(res.data.member_info_salary) });
    }

    useEffect(() => {
        callMemberInfo();
        callDept();
    }, []);

    const onChangeFile = (e) => {
        setFile({
            byte: e.target.files[0],
            name: URL.createObjectURL(e.target.files[0]),
        });
    }

    const onChangeForm = (e) => {
        let { name, value } = e.target;
        if (name === 'member_info_phone') {
            value = value.replace(/[^0-9]/g, '');
            if (value.length > 12) {
                value = value.slice(0, 12);
            }
            if (value.length > 3) {
                value = value.slice(0, 3) + '-' + value.slice(3, 12); // 3자리 이후에 '-' 추가
            }
            if (value.length > 8) {
                value = value.slice(0, 8) + '-' + value.slice(8, 12); // 8자리 이후에 '-' 추가
            }
        }
        if (name === 'member_info_account') {
            value = value.replace(/[^0-9]/g, '');
            if (value.length > 14) {
                value = value.slice(0, 14);
            }
        }
        setMember({ ...member, [name]: value });
        setFormErrors({ ...formErrors, [name]: '' });
    }

    const formatSalary = (salary) => {
        return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const onChangeSalary = (e) => {
        let { value } = e.target;
        value = value.replace(/[^0-9]/g, '');  // 숫자만 입력 가능
        setMember({ ...member, member_info_salary: formatSalary(value) });
    }

    const validateForm = () => {
        const errors = {};
        if (!member_info_id) errors.member_info_id = 'ID를 입력해야 합니다.';
        if (!dept_key) errors.dept_key = '부서를 선택해주십시오.';
        if (!member_info_job) errors.member_info_job = '직급을 선택해주십시오.'
        return errors;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            Swal.fire({
                title: `${member_info_name}님의 정보를 수정하시겠습니까?`,
                text: "",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "confirm"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.put('/erp/member', {
                        ...member,
                        member_info_salary: member_info_salary.replace(/,/g, '')
                    });
                    const formData = new FormData();
                    formData.append("byte", file.byte);
                    await axios.post(`/erp/member/update/photo/${member_info_key}`, formData);
                    Swal.fire({
                        title: "정보수정 완료",
                        text: "",
                        icon: "success"
                    }).then(() => {
                        window.location.href = `/erp/member/read/${member_info_id}`;
                    });
                }
            });
        } else {
            setFormErrors(errors);
        }
    }

    const onDelete = () => {
        Swal.fire({
            title: `${member_info_name}님을 퇴사처리 하시겠습니까?`,
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put('/erp/member', {
                    ...member,
                    member_info_salary: 0, 
                    member_info_job: "퇴사"
                });
                const formData = new FormData();
                formData.append("byte", file.byte);
                await axios.post(`/erp/member/update/photo/${member_info_key}`, formData);
                Swal.fire({
                    title: "퇴사처리 완료",
                    text: "",
                    icon: "success"
                }).then(() => {
                    window.location.href = `/erp/member/list`;
                });
            }
        });
    }

    return (
        <Row className="justify-content-center readPage">
            <Col className="col-xl-10 col-lg-12 col-md-9">
                <Card className="o-hidden border-0 shadow-lg my-5">
                    <Card.Body className="p-0">
                        <Row>
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">사원 정보</h1>
                                </div>
                                <form onSubmit={onSubmit}>
                                    <InputGroup className='my-5 justify-content-center'>
                                        {!file.name && !member_info_photo && <FaUser className="member-photo" onClick={() => refFile.current.click()} />}
                                        {!file.name && member_info_photo && <img src={member_info_photo} onClick={() => refFile.current.click()} className="member-photo" />}
                                        {file.name && <img src={file.name} onClick={() => refFile.current.click()} className="member-photo" />}
                                        <Form.Control type="file" ref={refFile} style={{ display: 'none' }} onChange={onChangeFile} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>사원번호</InputGroup.Text>
                                        <Form.Control name='member_info_key' value={member_info_key} onChange={onChangeForm} disabled style={{ backgroundColor: 'white' }} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>사원명</InputGroup.Text>
                                        <Form.Control name='member_info_name' value={member_info_name} onChange={onChangeForm} disabled style={{ backgroundColor: 'white' }} />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroup.Text className='title justify-content-center'>부서</InputGroup.Text>
                                        <Form.Select name='dept_key' value={dept_key} onChange={onChangeForm}>
                                            <option value="">부서선택</option>
                                            {deptList && deptList.map(dept =>
                                                <option key={dept.dept_key} value={dept.dept_key}>
                                                    {dept.dept_name}팀
                                                </option>
                                            )}
                                        </Form.Select>
                                    </InputGroup>
                                    {formErrors.dept_key && <Form.Text style={{ color: 'red' }}>{formErrors.dept_key}</Form.Text>}
                                    <InputGroup className='mt-3'>
                                        <InputGroup.Text className='title justify-content-center'>직급</InputGroup.Text>
                                        <Form.Select name='member_info_job' value={member_info_job} onChange={onChangeForm}>
                                            <option value="">직급선택</option>
                                            <option value="인턴">인턴</option>
                                            <option value="사원">사원</option>
                                            <option value="주임">주임</option>
                                            <option value="대리">대리</option>
                                            <option value="과장">과장</option>
                                            <option value="차장">차장</option>
                                            <option value="팀장">팀장</option>
                                            <option value="임원">임원</option>
                                        </Form.Select>
                                    </InputGroup>
                                    {formErrors.member_info_job && <Form.Text style={{ color: 'red' }}>{formErrors.member_info_job}</Form.Text>}
                                    <InputGroup className='mt-3'>
                                        <InputGroup.Text className='title justify-content-center'>권한</InputGroup.Text>
                                        <Form.Select name='member_info_auth' value={member_info_auth} onChange={onChangeForm}>
                                            <option value="일반">일반</option>
                                            <option value="관리자">관리자</option>
                                        </Form.Select>
                                    </InputGroup>
                                    <InputGroup className='my-3'>
                                        <InputGroup.Text className='title justify-content-center'>입사일</InputGroup.Text>
                                        <Form.Control name='member_info_hiredate' value={member_info_hiredate} onChange={onChangeForm} disabled style={{ backgroundColor: 'white' }} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>생년월일</InputGroup.Text>
                                        <Form.Control name='member_info_resident' value={member_info_resident} onChange={onChangeForm} disabled style={{ backgroundColor: 'white' }} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>연락처</InputGroup.Text>
                                        <Form.Control name='member_info_phone' value={member_info_phone} onChange={onChangeForm} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>이메일</InputGroup.Text>
                                        <Form.Control name='member_info_email' value={member_info_email} onChange={onChangeForm} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>주소</InputGroup.Text>
                                        <Form.Control name='member_info_address1' value={member_info_address1} onChange={onChangeForm} />
                                        <AddressModal form={member} setForm={setMember} />
                                    </InputGroup>
                                    <Form.Control className='mb-3' name='member_info_address2' value={member_info_address2} placeholder='상세주소' onChange={onChangeForm} />
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>계좌번호</InputGroup.Text>
                                        <Form.Control name='member_info_account' value={member_info_account} onChange={onChangeForm} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>연봉</InputGroup.Text>
                                        <Form.Control name='member_info_salary' value={`${member_info_salary}`} onChange={onChangeSalary} />
                                    </InputGroup>
                                    <div className='text-center my-3'>
                                        <Button className='me-2' variant='primary' type='submit'>정보수정</Button>
                                        <Button variant='secondary' type='reset'>수정취소</Button>
                                        <Button className='ms-2' variant='danger' type='button' onClick={onDelete}>퇴사처리</Button>
                                    </div>
                                </form>
                            </div>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default ERP_Member_ReadPage
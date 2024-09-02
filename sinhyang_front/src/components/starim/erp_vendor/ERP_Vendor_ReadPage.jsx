import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddressModal from '../../../common/AddressModal';
import Swal from 'sweetalert2';

const ERP_Vendor_ReadPage = ({vendor}) => {


    const [form, setForm] = useState({
        vendor_id : vendor.vendor_id,
        vendor_name : vendor.vendor_name,
        vendor_person : vendor.vendor_person,
        vendor_employee : vendor.vendor_employee,
        vendor_phone : vendor.vendor_phone,
        vendor_address : vendor.vendor_address,
        vendor_credit_limit : vendor.vendor_credit_limit,
        vendor_fax : vendor.vendor_fax,
        vendor_email : vendor.vendor_email
    })
    const {vendor_name, vendor_person, vendor_employee, vendor_phone, vendor_address, vendor_credit_limit, vendor_fax, vendor_email} = form;

    const [show, setShow] = useState(false);

    const handleClose = () => {
    setShow(false);
    
    }
    const handleShow = () => {
    setShow(true);
    setForm(form);
    }







    const onChagneForm = (e) => {
    setForm({...form, [e.target.name]:e.target.value})
    }


    const onClickVendorUpdate = async () => {
        if(vendor_name===""){
            Swal.fire({
                title: "수정 에러",
                text: "모든정보를 입력하세요!",
                icon: "error"
            });
            return;
        }
        Swal.fire({
            title: `${vendor.vendor_id}의 구매처정보를 수정하시겠습니까?`,
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "등록"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put(`/erp/vendor`, form);
                handleClose();
                window.location.reload();
            }
        });
    }



  return (
    <>
        <a onClick={handleShow}>
            {vendor.vendor_id}
        </a>


    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
    >
    <Modal.Header closeButton>
        <Modal.Title>거래처정보</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        
        <Row className='justify-content-center'>
            <Col >
                <Card>
                    <Card.Header>
                        <h1></h1>
                    </Card.Header>
                    <Card.Body>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>거래처명</InputGroup.Text>
                            <Form.Control value={vendor_name} name='vendor_name'  placeholder='거래처명' onChange={onChagneForm}/ >
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>거래처담당자</InputGroup.Text>
                            <Form.Control value={vendor_person} name='vendor_person' placeholder='거래처담당자'onChange={onChagneForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>담당직원</InputGroup.Text>
                            <Form.Control value={vendor_employee} name='vendor_employee' placeholder='담당엽업사원'onChange={onChagneForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>전화번호</InputGroup.Text>
                            <Form.Control value={vendor_phone} name='vendor_phone' placeholder='전화번호'onChange={onChagneForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>주소</InputGroup.Text>
                            <Form.Control value={vendor_address} name='vendor_address' placeholder='주소'onChange={onChagneForm}/>
                            <div><AddressModal setForm={setForm} form={form}/></div>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>팩스</InputGroup.Text>
                            <Form.Control value={vendor_fax} name='vendor_fax' placeholder='팩스'onChange={onChagneForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>이메일</InputGroup.Text>
                            <Form.Control value={vendor_email} name='vendor_email' placeholder='이메일'onChange={onChagneForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>여신한도</InputGroup.Text>
                            <Form.Select value={vendor_credit_limit} name='vendor_credit_limit' onChange={onChagneForm}>
                                <option value={parseInt(0)}>기본</option>
                                <option value={parseInt(1)}>신뢰</option>
                                <option value={parseInt(2)}>우대</option>
                                <option value={parseInt(3)}>VIP</option>
                            </Form.Select>
                        </InputGroup>
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={onClickVendorUpdate}>수정하기</Button>
        <Button variant="secondary" onClick={handleClose}>닫기</Button>
    </Modal.Footer>
    </Modal>
    </>
  )
}

export default ERP_Vendor_ReadPage
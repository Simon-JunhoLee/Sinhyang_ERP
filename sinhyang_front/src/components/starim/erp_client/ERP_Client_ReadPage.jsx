import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddressModal from '../../../common/AddressModal';
import Swal from 'sweetalert2';

const ERP_Client_ReadPage = ({client}) => {

    const [form, setForm] = useState({
        client_id : client.client_id,
        client_name : client.client_name,
        client_person : client.client_person,
        client_employee : client.client_employee,
        client_phone : client.client_phone,
        client_address : client.client_address,
        client_credit_limit : client.client_credit_limit,
        client_fax : client.client_fax,
        client_email : client.client_email
    })
    const {client_name, client_person, client_employee, client_phone, client_address, client_credit_limit, client_fax, client_email} = form;

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        window.location.reload();
        
    }
    const handleShow = () => {
        setShow(true);
        setForm(form);
    }





    

    const onChagneForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }


    const onClickClientUpdate = async () => {
        if(client_name===""){
            Swal.fire({
                title: "에러",
                text: "모든 정보를 입력하세요",
                icon: "error"
            });
            return;
        }
        Swal.fire({
            title: `${client.client_id}의 거래처정보를 수정하시겠습니까?`,
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "등록"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put(`/erp/client`, form);
                Swal.fire({
                    title: "성공",
                    text: "거래처정보를 수정하였습니다.",
                    icon: "success"
                });
                handleClose();
                window.location.reload();
            }
        });
    }

  return (
    <>
        <a onClick={handleShow}>
            {client.client_id}
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
                            <Form.Control value={client_name} name='client_name'  placeholder='거래처명' onChange={onChagneForm}/ >
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>거래처담당자</InputGroup.Text>
                            <Form.Control value={client_person} name='client_person' placeholder='거래처담당자'onChange={onChagneForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>담당직원</InputGroup.Text>
                            <Form.Control value={client_employee} name='client_employee' placeholder='담당엽업사원'onChange={onChagneForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>전화번호</InputGroup.Text>
                            <Form.Control value={client_phone} name='client_phone' placeholder='전화번호'onChange={onChagneForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>주소</InputGroup.Text>
                            <Form.Control value={client_address} name='client_address' placeholder='주소'onChange={onChagneForm}/>
                            <div><AddressModal setForm={setForm} form={form}/></div>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>팩스</InputGroup.Text>
                            <Form.Control value={client_fax} name='client_fax' placeholder='팩스'onChange={onChagneForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>이메일</InputGroup.Text>
                            <Form.Control value={client_email} name='client_email' placeholder='이메일'onChange={onChagneForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>여신한도</InputGroup.Text>
                            <Form.Select value={client_credit_limit} name='client_credit_limit' onChange={onChagneForm}>
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
        <Button variant="primary" onClick={onClickClientUpdate}>수정하기</Button>
        <Button variant="secondary" onClick={handleClose}>닫기</Button>
    </Modal.Footer>
    </Modal>
    </>
  )
}

export default ERP_Client_ReadPage
import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, InputGroup, Row, Form } from 'react-bootstrap';
import AddressModal from '../../../common/AddressModal';
import ERPVendorMemberModal from '../starim_common/ERPVendorMemberModal';
import Swal from 'sweetalert2';

const ERP_Vendor_InsertPage = () => {

    const inputGroupTextStyle = {
        width: '120px', 
    };

    const [form, setForm] = useState({
        vendor_name : "",
        vendor_person : "",
        vendor_employee : "",
        vendor_phone : "",
        vendor_address : "",
        vendor_credit_limit : 0,
        vendor_fax : "",
        vendor_email : ""
    })

    const {vendor_name, vendor_person,  vendor_phone, vendor_address, vendor_credit_limit, vendor_fax, vendor_email} = form;

    const onChagneForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }




    const onClicVendorInsert =  async () => {
        if(vendor_name==="" || form.vendor_employee===""){
            Swal.fire({
                title: "등록불가",
                text: "모든정보를 입력해주세요!",
                icon: "error"
            });
            return;
        }
        Swal.fire({
            title: "거래처를 등록 하시겠습니까?",
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "등록"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.post(`/erp/vendor`, form)
                window.location.href="/erp/vendor/list"
            }
        });
    }





  return (
    <Row className='justify-content-center'>
        <Col lg={10}>
            <Card>
                <Card.Header>
                    <h1>구매처등록</h1>
                </Card.Header>
                <Card.Body>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text style={inputGroupTextStyle}>거래처명</InputGroup.Text>
                        <Form.Control value={vendor_name} name='vendor_name'  placeholder='거래처명' onChange={onChagneForm}/ >
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text style={inputGroupTextStyle}>거래처담당자</InputGroup.Text>
                        <Form.Control value={vendor_person} name='vendor_person' placeholder='거래처담당자'onChange={onChagneForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text style={inputGroupTextStyle}>담당직원</InputGroup.Text>
                        <ERPVendorMemberModal form={form} setForm={setForm} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text style={inputGroupTextStyle}> 전화번호</InputGroup.Text>
                        <Form.Control value={vendor_phone} name='vendor_phone' placeholder='전화번호'onChange={onChagneForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text style={inputGroupTextStyle}>주소</InputGroup.Text>
                        <Form.Control value={vendor_address} name='vendor_address' placeholder='주소'onChange={onChagneForm}/>
                        <AddressModal setForm={setForm} form={form}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text style={inputGroupTextStyle}>팩스</InputGroup.Text>
                        <Form.Control value={vendor_fax} name='vendor_fax' placeholder='팩스'onChange={onChagneForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text style={inputGroupTextStyle}>이메일</InputGroup.Text>
                        <Form.Control value={vendor_email} name='vendor_email' placeholder='이메일'onChange={onChagneForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text style={inputGroupTextStyle}>여신한도</InputGroup.Text>
                        <Form.Select value={vendor_credit_limit} name='vendor_credit_limit' onChange={onChagneForm}>
                            <option value={parseInt(0)}>기본</option>
                            <option value={parseInt(1)}>신뢰</option>
                            <option value={parseInt(2)}>우대</option>
                            <option value={parseInt(3)}>VIP</option>
                        </Form.Select>
                    </InputGroup>
                </Card.Body>
                <Card.Footer>
                    <div>
                        <Button onClick={onClicVendorInsert}>등록</Button>
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    </Row>
  )
}

export default ERP_Vendor_InsertPage
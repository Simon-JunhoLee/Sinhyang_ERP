import axios from 'axios';
import React, {  useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import AddressModal from '../../../common/AddressModal';
import ERPClientMemberModal from '../starim_common/ERPClientMemberModal';
import Swal from 'sweetalert2';

const ERP_Client_InsertPage = () => {

    const inputGroupTextStyle = {
        width: '120px', 
    };

    const [form, setForm] = useState({
        client_name : "",
        client_person : "",
        client_employee : "",
        client_phone : "",
        client_address : "",
        client_credit_limit : 0,
        client_fax : "",
        client_email : ""
    })

    const {client_name, client_person, client_phone, client_address, client_credit_limit, client_fax, client_email} = form;



    const onChagneForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }




    const onClicItemsInsert =  async () => {
        if(client_name===""){
            Swal.fire({
                title: "에러",
                text: "모든정보를 입력하세요!",
                icon: "error"
            });
            return;
        }
        Swal.fire({
            title: "거래처를를 등록하시겠습니까?",
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "등록"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.post(`/erp/client`, form)
                Swal.fire({
                    title: "성공",
                    text: "거래처를 등록하였습니다.",
                    icon: "success"
                });
                window.location.href="/erp/client/list"
            }
        });
    }

    



  return (
    <Row className='justify-content-center'>
        <Col lg={3}>
            <Card>
                <Card.Header>
                    <h1>고객사등록</h1>
                </Card.Header>
                <Card.Body>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text style={inputGroupTextStyle}>거래처명</InputGroup.Text>
                        <Form.Control value={client_name} name='client_name'  placeholder='거래처명' onChange={onChagneForm} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text style={inputGroupTextStyle}>거래처담당자</InputGroup.Text>
                        <Form.Control value={client_person} name='client_person' placeholder='거래처담당자'onChange={onChagneForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text style={inputGroupTextStyle}>담당직원</InputGroup.Text>
                        <ERPClientMemberModal form={form} setForm={setForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text style={inputGroupTextStyle}>전화번호</InputGroup.Text>
                        <Form.Control value={client_phone} name='client_phone' placeholder='전화번호'onChange={onChagneForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text style={inputGroupTextStyle}>주소</InputGroup.Text>
                        <Form.Control value={client_address} name='client_address' placeholder='주소'onChange={onChagneForm}/>
                        <AddressModal setForm={setForm} form={form}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text style={inputGroupTextStyle}>팩스</InputGroup.Text>
                        <Form.Control value={client_fax} name='client_fax' placeholder='팩스'onChange={onChagneForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text style={inputGroupTextStyle}>이메일</InputGroup.Text>
                        <Form.Control value={client_email} name='client_email' placeholder='이메일'onChange={onChagneForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text style={inputGroupTextStyle}>여신한도</InputGroup.Text>
                        <Form.Select value={client_credit_limit} name='client_credit_limit' onChange={onChagneForm}>
                            <option value={parseInt(0)}>기본</option>
                            <option value={parseInt(1)}>신뢰</option>
                            <option value={parseInt(2)}>우대</option>
                            <option value={parseInt(3)}>VIP</option>
                        </Form.Select>
                    </InputGroup>
                </Card.Body>
                <Card.Footer>
                    <div>
                        <Button onClick={onClicItemsInsert}>등록</Button>
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    </Row>
  )
}

export default ERP_Client_InsertPage
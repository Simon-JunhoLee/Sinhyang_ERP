import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import Swal from 'sweetalert2';

const ERP_WareHouseInsertPage = () => {




    const [wareHouseName, setWareHouseName] = useState("");
    const [wareHouseAddress, setWareHouseAddress] = useState("");


    const onClickWareHouseInsertSubmit =  async () => {
        if(wareHouseName==="" || wareHouseAddress===""){
            Swal.fire({
                title: "에러",
                text: "모든정보를 입력하세요!",
                icon: "error"
            });
            return;
        }
        Swal.fire({
            title: "창고정보를 등록 하시겠습니까?",
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "등록"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.post(`/erp/warehouse`, {warehouse_name : wareHouseName, warehouse_address:wareHouseAddress})
                Swal.fire({
                    title: "성공",
                    text: "창고정보를 수정하였습니다.",
                    icon: "success"
                });
                window.location.href="/erp/warehouse/list"
            }
        });  
    }



  return (
    <Row className='justify-content-center'>
        <Col lg={5}>
            <Card>
                <Card.Header>
                    <h1>창고등록</h1>
                </Card.Header>
                <Card.Body>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>창고이름</InputGroup.Text>
                        <Form.Control value={wareHouseName} onChange={(e)=>setWareHouseName(e.target.value)} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>창고주소</InputGroup.Text>
                        <Form.Control value={wareHouseAddress} onChange={(e)=>setWareHouseAddress(e.target.value)}/>
                    </InputGroup>
                </Card.Body>
                <Card.Footer>
                    <div>
                        <Button onClick={onClickWareHouseInsertSubmit}>등록</Button>
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    </Row>
  )
}

export default ERP_WareHouseInsertPage
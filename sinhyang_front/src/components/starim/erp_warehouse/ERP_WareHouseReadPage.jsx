import axios from 'axios';
import React, { useState } from 'react'
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

const ERP_WareHouseReadPage = ({warehouse}) => {

    const [warehouse_id] = useState(warehouse.warehouse_id);
    const [warehouse_name, setWarehouse_name] = useState(warehouse.warehouse_name);
    const [warehouse_address, setWarehouse_address] = useState(warehouse.warehouse_address);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setWarehouse_address(warehouse.warehouse_address);
        setWarehouse_name(warehouse.warehouse_name);
    }

    const onClickWareHouseUpdate = async () => {
        Swal.fire({
            title: `${warehouse_id}의 창고정보를 수정하시겠습니까?`,
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "수정"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put(`/erp/warehouse`, {warehouse_id, warehouse_name, warehouse_address})
                Swal.fire({
                    title: "성공",
                    text: "물품정보를 수정하였습니다.",
                    icon: "success"
                });
                handleClose();
                window.location.reload();
            }
        });
    }



  return (
    <>
        <Button variant="outline-primary" onClick={handleShow}>수정</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>창고정보</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <InputGroup>                            
                                <InputGroup.Text>창고코드</InputGroup.Text>
                                <Form.Control value={warehouse_id} readOnly />
                            </InputGroup>
                            <InputGroup>                            
                                <InputGroup.Text>창고이름</InputGroup.Text>
                                <Form.Control value={warehouse_name} onChange={(e)=>setWarehouse_name(e.target.value)}/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text>창고주소</InputGroup.Text>
                                <Form.Control value={warehouse_address} onChange={(e)=>setWarehouse_address(e.target.value)}/>
                            </InputGroup>
                        </Col>
                    </Row>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>닫기</Button>
                <Button variant="primary" onClick={onClickWareHouseUpdate}>수정</Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default ERP_WareHouseReadPage
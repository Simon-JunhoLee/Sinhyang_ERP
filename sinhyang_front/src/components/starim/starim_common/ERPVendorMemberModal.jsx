import { TableBody, TableHead } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Form, Row, Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const ERPVendorMemberModal = ({form, setForm}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [page] = useState(1);
    const [size] = useState(25);
    const [key] = useState("");
    const [word] = useState("");
    const [memberList, setMemberList] = useState([]);

    //담당자불러오기
    const callAPIMember = async () => {
        const res = await axios.get(`/erp/member?key=${key}&word=${word}&page=${page}&size=${size}`)
        //console.log(res.data.list);
        setMemberList(res.data.list);
    }

    
    useEffect(()=>{
        callAPIMember();
    },[])

    const onMemberSelected = (mem) => {
        const data = {...form, vendor_employee : mem.member_info_id}
        setForm(data);
        handleClose();
    }

    return (
        <>
        <Form.Control value={form.vendor_employee} name='vendor_employee' placeholder='거래처담당자' onClick={handleShow} readOnly/>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>직원목록</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Table>
                            <TableHead>
                                <tr>
                                    <td>CODE</td>
                                    <td>ID</td>
                                    <td>이름</td>
                                    <td>부서</td>
                                    <td>직급</td>
                                </tr>
                            </TableHead>
                            <TableBody>
                                {memberList && memberList.map(mem=>  mem.dept_name.includes("경영") &&
                                <tr key={mem.member_info_id} onClick={() => onMemberSelected(mem)}>
                                    <td>{mem.member_info_key}</td>
                                    <td>{mem.member_info_id}</td>
                                    <td>{mem.member_info_name}</td>
                                    <td>{mem.dept_name}</td>
                                    <td>{mem.member_info_job}</td>
                                </tr>
                                )}
                            </TableBody>
                        </Table>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    </>
    )
}

export default ERPVendorMemberModal
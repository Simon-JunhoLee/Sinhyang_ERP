import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import Swal from 'sweetalert2';

const ERP_Account_InsertPage = () => {
    const [account, setAccount] = useState({});
    const { account_number, account_name, account_detail } = account;
    const [formErrors, setFormErrors] = useState({});

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setFormErrors({});
        setAccount({});
    }
    const handleShow = () => setShow(true);

    const onChangeForm = (e) => {
        let { name, value } = e.target;
        if (name === 'account_number') {
            value = value.replace(/[^0-9]/g, '');
            if (value.length > 14) {
                value = value.slice(0, 14);
            }
        }
        setAccount({ ...account, [name]: value });
        setFormErrors({ ...formErrors, [name]: '' });
    }

    const validateForm = () => {
        const errors = {};
        if (!account_number) errors.account_number = '계좌번호를 입력해야 합니다.';
        if (!account_name) errors.account_name = '계좌이름을 입력해야 합니다.';
        if (!account_detail) errors.account_detail = '계좌 사용처를 입력해야 합니다.';
        return errors;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            await axios.post('/erp/account', account);
            Swal.fire({
                title: "계좌 등록 완료!",
                text: "",
                icon: "success"
            }).then(() => {
                handleClose();
                window.location.href = '/erp/account/list';
            });
        } else {
            setFormErrors(errors);
        }
    }

    return (
        <>
            <div className='newAccount' onClick={handleShow}>
                <h3>통장등록</h3>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>통장등록</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="justify-content-center">
                        <Form className='p-5' onSubmit={onSubmit}>
                            <Row className='d-flex justify-content-center align-items-center'>
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Register</h1>
                                </div>
                                <Col lg={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Control name="account_number" value={account_number} placeholder="계좌번호" onChange={onChangeForm} />
                                        {formErrors.account_number && <div style={{ color: 'red' }}>{formErrors.account_number}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control name="account_name" value={account_name} placeholder="계좌 이름" onChange={onChangeForm} />
                                        {formErrors.account_name && <div style={{ color: 'red' }}>{formErrors.account_name}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control name="account_detail" value={account_detail} placeholder="계좌 사용처" onChange={onChangeForm} />
                                        {formErrors.account_detail && <div style={{ color: 'red' }}>{formErrors.account_detail}</div>}
                                    </Form.Group>
                                    <Row className='mb-3 mt-5'>
                                        <Col>
                                            <Button className="btn btn-dark w-100" type="submit">Register</Button>
                                        </Col>
                                        <Col>
                                            <Button className='btn w-100' variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ERP_Account_InsertPage
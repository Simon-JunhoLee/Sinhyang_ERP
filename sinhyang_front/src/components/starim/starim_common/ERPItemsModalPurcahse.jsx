import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ERPItemsModalPurcahsejsx = ({ items, setItems, item_index }) => {

    const [page, setPage] = useState(1);
    const [size] = useState(30);
    const [key, setKey] = useState(0);
    const [word, setWord] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [list, setList] = useState([]);




    const callAPI = async () => {
        const res = await axios.get(`/erp/items?key=${key}&word=${word}&page=${page}&size=${size}`);
        //console.log(res.data);
        setList(res.data.documents);

    }

    useEffect(() => {
        callAPI();
    }, [key])

    const onItemSelected = (item) => {
        const data = items.map((item1, idx) => idx === item_index ? { ...item1, purchase_items_id: item.items_id, items_name: item.items_name } : item1);

        items.forEach((item1, idx) => {
            //console.log(item.items_id);
            //console.log(item.purchase_items_id, item_index);
        })

        setItems(data);
        handleClose();
    }


    return (
        <>
            <Form.Control onClick={handleShow} value={items[item_index].purchase_items_id} readOnly />

            <Modal show={show} onHide={handleClose} size='lg' centered>

                <Modal.Header closeButton>
                    <Modal.Title>물품리스트</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <InputGroup>
                                <Form.Select value={key} onChange={(e) => setKey(parseInt(e.target.value))}>
                                    <option value={0}>음료</option>
                                    <option value={1}>면</option>
                                    <option value={2}>스낵</option>
                                    <option value={3}>간편식</option>
                                </Form.Select>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Table>
                        <colgroup>
                            <col width="30%" />
                            <col width="30%" />
                            <col width="20%" />
                            <col width="20%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <td>코드</td>
                                <td>품목명</td>
                                <td>사진</td>
                                <td>종류</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.map((item) =>
                                item.items_type === key ? (
                                    <tr key={item.items_id} onClick={() => onItemSelected(item)}>
                                        <td style={{ cursor: "pointer" }}>
                                            {item.items_id}
                                        </td>
                                        <td>{item.items_name}</td>
                                        <td><img src={item.items_photo || "http://via.placeholder.com/50x50"} width={"50%"} /></td>
                                        <td>
                                            {item.items_type === 0 ? "음료" : item.items_type === 1 ? "면" : item.items_type === 2 ? "스낵" : item.items_type === 3 ? "간편식" : item.items_type}
                                        </td>
                                    </tr>
                                ) : null
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ERPItemsModalPurcahsejsx
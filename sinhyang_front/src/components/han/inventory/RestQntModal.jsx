import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap';

const RestQntModal = ({ inventory }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [list, setList] = useState([]);

    const callAPI = async () => {
        try {
            const res = await axios.get(`/erp/inventory/restqnt/${inventory.items_id}`);
            setList(res.data);
        } catch (error) {
            console.log("재고 모달 axios 중 오류", error);
        }
    }
    useEffect(() => {
        callAPI();
    }, [])




    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                재고보기
            </Button>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>창고별 재고 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <td>코드</td>
                                <td>이름</td>
                                <td>타입</td>
                                <td>창고</td>
                                <td>재고</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.map((item) =>
                                <tr key={item.warehouse_name}>
                                    <td>{item.items_id}</td>
                                    <td>{item.items_name}</td>
                                    <td>
                                        {item.items_type === 0 ? "음료" : item.items_type === 1 ? "면" : item.items_type === 2 ? "스낵" : item.items_type === 3 ? "간편식" : item.items_type}
                                    </td>
                                    <td>{item.warehouse_name}</td>
                                    <td>{item.rest_qnt}</td>

                                </tr>
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

export default RestQntModal
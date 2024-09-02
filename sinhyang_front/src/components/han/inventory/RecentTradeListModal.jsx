import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap';

const RecentTradeListModal = ({ item, warehouse }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [list, setList] = useState([]);

    const callAPI = async () => {
        try {
            const res = await axios.get(`/erp/inventory/listRecent/${item}&${warehouse}`);
            setList(res.data);
        } catch (error) {
            console.log("최근거래목록 모달 axios 중 오류", error);
        }
    }
    useEffect(() => {
        callAPI();
    }, [])

    const formatCurrency = (amount) => {
        return amount.toLocaleString();
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                거래보기
            </Button>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>최근 거래 내역</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <td>날짜</td>
                                <td>거래분류</td>
                                <td>물품</td>
                                <td>가격</td>
                                <td>수량</td>
                                <td>총액</td>
                                <td>창고</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.map((item) =>
                                <tr>
                                    <td>{item.date}</td>
                                    <td>{item.type === '1' ? "입고" : "출고"}</td>
                                    <td>{item.item_name}</td>
                                    <td>{formatCurrency(item.price)}</td>
                                    <td>{formatCurrency(item.qnt)}</td>
                                    <td>{formatCurrency(item.price * item.qnt)}</td>
                                    <td>{item.warehouse_name}</td>
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

export default RecentTradeListModal
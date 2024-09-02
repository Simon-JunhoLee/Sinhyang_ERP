import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import ERP_Transaction_PayPage from './ERP_Transaction_PayPage';

const ERP_Transaction_Purchase = () => {

    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size] = useState(5);
    const [key, setKey] = useState("purchase_id");
    const [word, setWord] = useState("");
    const [count, setCount] = useState("0");

    const callPurchase = async () => {
        const res = await axios.get(`/erp/purchase/list?key=${key}&word=${word}&page=${page}&size=${size}`);
        //console.log(res.data);
        setList(res.data.documents);
        setCount(res.data.total);
    }

    useEffect(() => {
        callPurchase();
    }, [page])

    const onSubmit = (e) => {
        e.preventDefault();
        callPurchase();
        setPage(1);
    }

    return (
        <>
            <Row className='justify-content-center'>
                <div className='mb-4'>
                    <h3>구매리스트</h3>
                </div>
                <Row className='mb-4'>
                    <Col lg={6}>
                        <form onSubmit={onSubmit}>
                            <InputGroup>
                                <Form.Select value={key} onChange={(e) => setKey(e.target.value)}>
                                    <option value="purchase_id">코드</option>
                                    <option value="purchase_employee">아이디</option>
                                    <option value="member_info_name">이름</option>
                                    <option value="purchase_date">날짜</option>
                                </Form.Select>
                                <FormControl placeholder='검색어를 입력하세요' value={word} onChange={(e) => setWord(e.target.value)} />
                                <Button type="submit" size="sm" variant='outline-primary'>검색</Button>
                            </InputGroup>
                        </form>
                    </Col>
                    <Col lg={6} className='text-end mt-3'>
                        검색 수: {count}건
                    </Col>
                </Row>
                <Col lg={12}>
                    <Table>
                        <thead>
                            <tr>
                                <td>코드</td>
                                <td>이름</td>
                                <td>판매일</td>
                                <td>상세보기</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.map(purchase =>
                                <tr key={purchase.purchase_id}>
                                    <td>{purchase.purchase_id}</td>
                                    <td>{purchase.purchase_employee}({purchase.member_info_name})</td>
                                    <td>{moment(purchase.purchase_date).format('yy년MM월DD일')}</td>
                                    <td><ERP_Transaction_PayPage purchase={purchase} /></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            {count > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={count}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(e) => setPage(e)} />
            }
        </>
    )
}

export default ERP_Transaction_Purchase
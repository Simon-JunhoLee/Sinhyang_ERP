import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ERP_Purchase_ReadPage from './ERP_Purchase_ReadPage';
import { Button, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import moment from 'moment';
import Pagination from "react-js-pagination";
import '../starim_common/paging.css';
import ChartTest from '../starim_common/ChartTest';
import Swal from 'sweetalert2';

const ERP_Purchase_ListPage = () => {

    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size] = useState(5);
    const [key, setKey] = useState("purchase_id");
    const [word, setWord] = useState("");
    const [count, setCount] = useState("0");

    const callAPI = async () => {
        const res = await axios.get(`/erp/purchase?key=${key}&word=${word}&page=${page}&size=${size}`);
        //console.log(res.data);
        setList(res.data.documents);
        setCount(res.data.total);

    }

    useEffect(() => {
        callAPI();
    }, [page])

    const onClickPurchaseDelete = async (purchase) => {

        Swal.fire({
            title: `${purchase.purchase_id}를 삭제하시겠습니까?`,
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "삭제"

        }).then(async (result) => {
            const purchase_id = purchase.purchase_id;
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/erp/purchase/${purchase_id}`);
                    Swal.fire({
                        title: "삭제완료",
                        text: "구매목록을 삭제하였습니다!",
                        icon: "success"
                    });
                    callAPI();
                } catch {
                    Swal.fire({
                        title: "에러",
                        text: "구매품목이 존재합니다!",
                        icon: "error"
                    });
                }

            }
        });
    };


    const onClickPurchaseInsert = (e) => {
        window.location.href = "/erp/purchase/insert";
    }

    const onSubmit = (e) => {
        e.preventDefault();
        callAPI();
        setPage(1);
    }

    return (
        <>
            <Row className='justify-content-center'>
                <Row>
                <h1 className='mt-3'>구매리스트</h1>
                <div className='mt-5 mb-3'>
                    <Button onClick={onClickPurchaseInsert}>구매입력하기</Button>
                </div>
                </Row>
                <Row>
                    <Col lg={6} className='my-3'>
                        <form onSubmit={onSubmit}>
                            <InputGroup>
                                <Col className='col-4 me-3'>
                                    <Form.Select value={key} onChange={(e) => setKey(e.target.value)}>
                                        <option value="purchase_id">코드</option>
                                        <option value="purchase_employee">아이디</option>
                                        <option value="member_info_name">이름</option>
                                        <option value="purchase_date">날짜</option>
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <InputGroup>
                                        <FormControl placeholder='검색어를 입력하세요' value={word} onChange={(e) => setWord(e.target.value)} />
                                        <Button type="submit" variant='outline-primary'>검색</Button>
                                    </InputGroup>
                                </Col>
                            </InputGroup>
                        </form>
                    </Col>
                    <Col lg={6}>
                        <div className='mt-4'>
                            <span className='me-3'>검색 수 : {count}건</span>
                        </div>
                    </Col>
                </Row>
                <Col lg={12} className='justify-content-center'>
                    <Table>
                        <thead>
                            <tr>
                                <td>코드</td>
                                <td>이름</td>
                                <td>판매일</td>
                                <td>메모</td>
                                <td>삭제</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.map(purchase =>
                                <tr key={purchase.purchase_id}>
                                    <td><div style={{ cursor: "pointer" }}><ERP_Purchase_ReadPage purchase={purchase} /></div></td>
                                    <td>{purchase.purchase_employee}({purchase.member_info_name})</td>
                                    <td>{moment(purchase.purchase_date).format('yy년MM월DD일')}</td>
                                    <td>{purchase.purchase_memo}</td>
                                    <td><Button variant='outline-danger' size='sm' onClick={() => onClickPurchaseDelete(purchase)}>삭제</Button></td>
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
            <ChartTest />
        </>
    )
}

export default ERP_Purchase_ListPage
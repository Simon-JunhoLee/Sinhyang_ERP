import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap'
import ERP_Sales_ReadPage from './ERP_Sales_ReadPage';
import moment from 'moment';
import Pagination from "react-js-pagination";
import '../starim_common/paging.css';
import Swal from 'sweetalert2';
import SalesBarChart from '../starim_common/SalesBarChart';

const ERP_Sales_ListPage = () => {


    const [page, setPage] = useState(1);
    const [size] = useState(5);
    const [key, setKey] = useState("sales_id");
    const [word, setWord] = useState("");
    const [count, setCount] = useState("0");
    const [list, setList] = useState([]);
    const [listInfo, setListInfo] = useState([]);
    

    const callAPI = async () => {
        const res = await axios.get(`/erp/sales?key=${key}&word=${word}&page=${page}&size=${size}`);
        //console.log(res.data);
        setList(res.data.documents);
        setCount(res.data.total);
    }

    const callAPIInfo = async () => {
        const res = await axios.get("/erp/sales/info");
        //console.log(res.data);
        setListInfo(res.data);
    }

    useEffect(() => {
        callAPI();
        callAPIInfo();
    }, [page])
    
    const onClickItemDelete = async (sales) => {
        Swal.fire({
            title: `${sales.sales_id}를 삭제하시겠습니까?`,
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "삭제"

        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const sales_id = sales.sales_id;
                    await axios.delete(`/erp/sales/${sales_id}`);
                    Swal.fire({
                        title: "성공",
                        text: "판매정보를 삭제하였습니다.",
                        icon: "success"
                    });
                    const last = Math.ceil(count/size);  
                    if (page >= last && list.length === 1) {
                        setPage(last - 1);
                        callAPI(); 
                    }else{
                        callAPI();
                    }
                    
                    
                    
                } catch {
                    Swal.fire({
                        title: "에러",
                        text: "판매정보가 존재합니다.",
                        icon: "error"
                    });
                }
            }
        });
    };


    const onClickSaleInsert = (e) => {
        window.location.href = "/erp/sales/insert";
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
                    <h1>판매리스트</h1>
                    <div className='mt-5 mb-3'>
                        <Button onClick={onClickSaleInsert}>판매입력하기</Button>
                    </div>
                </Row>
                <Row className='justify-content-center mb-3'>
                    <Col lg={6}>
                        <form onSubmit={onSubmit}>
                            <InputGroup>
                                <Col className='col-4 me-3'>
                                    <Form.Select value={key} onChange={(e) => setKey(e.target.value)}>
                                        <option value="sales_id">코드</option>
                                        <option value="sales_employee">아이디</option>
                                        <option value="member_info_name">이름</option>
                                        <option value="sales_date">날짜</option>
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
                        <div className='mt-2'>
                            <span className='me-3'>검색수 : {count}</span>
                        </div>
                    </Col>
                </Row>
                <Col lg={12}>
                    <Table>
                        <thead>
                            <tr>
                                <td>판매코드</td>
                                <td>판매사원</td>
                                <td>판매일</td>
                                <td>메모</td>
                                <td>삭제</td>

                            </tr>
                        </thead>
                        <tbody>
                            {list && list.map(sales =>
                                <tr key={sales.sales_id}>
                                    <td><div style={{ cursor: "pointer" }}><ERP_Sales_ReadPage sales={sales} /></div></td>
                                    <td>{sales.sales_employee}({sales.member_info_name})</td>
                                    <td>{moment(sales.sales_date).format('yy년MM월DD일')}</td>
                                    <td>{sales.sales_memo}</td>
                                    <td><Button onClick={() => onClickItemDelete(sales)}>삭제</Button></td>
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
            <SalesBarChart />
        </>
    )
}

export default ERP_Sales_ListPage
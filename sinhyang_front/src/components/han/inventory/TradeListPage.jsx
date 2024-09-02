import { useScrollTrigger } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import '../../starim/starim_common/paging.css';

const TradeListPage = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);
    const [key, setKey] = useState("");
    const [word, setWord] = useState('');
    const [list, setList] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    const callAPI = async (searchWord) => {
        try {
            setList([]);
            const res = await axios.get(`/erp/inventory/listAlltrade?key=${key}&word=${searchWord}&page=${page}&size=${size}`)
            console.log(res.data);
            setCount(res.data.count);
            setList(res.data.documents);
            setIsSearch((key === "" && word === "") || (word === ""));
        } catch (error) {
            console.log("전체거래목록 출력중 오류", error);
        }
    }

    useEffect(() => {
        setList([]);
        callAPI("");
    }, [page, size])

    const onClickMove = () => {
        window.location.href = '/erp/inventory/itemlist'
    }
    const onClickMove2 = () => {
        window.location.href = '/erp/inventory/warehouselist'
    }

    const formatCurrency = (amount) => {
        return amount.toLocaleString();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let searchWord = word;
        if (key === "type") {
            switch (word) {
                case "입고":
                    searchWord = "1";
                    break;
                case "출고":
                    searchWord = "2";
                    break;
                default: break;
            }
        }
        setPage(1);
        callAPI(searchWord);
        
    }

    return (
        <>
            <Row>
                <h1>재고리스트</h1>
                <h3 className="mb-2" onClick={() => callAPI()} style={{ cursor: 'pointer' }}>전체거래내역</h3>
                <div>
                    <Button className='mb-2' onClick={onClickMove}>전체물품목록</Button>
                </div>
                <div>
                    <Button className='me-2 mb-2' onClick={onClickMove2}>창고별물품목록</Button>
                </div>
                <div className='mb-2'>
                    <Col lg={3}>
                        <form onSubmit={onSubmit} className='mb-2'>
                            <InputGroup>
                                <Form.Select value={key} onChange={(e) => setKey(e.target.value)} style={{ width: '30%' }}>
                                    <option value="date">날짜</option>
                                    <option value="type">거래분류</option>
                                    <option value="item_name">물품</option>
                                    <option value="warehouse_name">창고</option>
                                </Form.Select>
                                <FormControl placeholder='검색어를 입력하세요' value={word}
                                    onChange={(e) => setWord(e.target.value)} style={{ width: '55%' }} />
                                <Button type="submit" style={{ width: '15%' }}>검색</Button>
                            </InputGroup>
                        </form>
                    </Col>
                    {isSearch ? ("전체거래내역 : " + count + " 건") : ("검색결과 : " + count + " 건")}
                </div>
            </Row>
            <Row className='justify-content-center'>
                <Col lg={12}>
                    <Table>
                        <thead className='text-center'>
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
                        <tbody className='align-middle text-center'>
                            {list && list.map(tradelist =>
                                <tr key={tradelist.trade_id}>
                                    <td>{tradelist.date.split('-').slice(0, 3).join('-')}</td>
                                    <td>
                                        {tradelist.type === '1' ? "입고" : "출고"}
                                    </td>
                                    <td>{tradelist.item_name}</td>
                                    <td>{formatCurrency(tradelist.price)}</td>
                                    <td>{formatCurrency(tradelist.qnt)}</td>
                                    <td>{formatCurrency(tradelist.price * tradelist.qnt)}</td>
                                    <td>{tradelist.warehouse_name}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
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
                </Col>
            </Row>
        </>
    )
}

export default TradeListPage
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import '../../starim/starim_common/paging.css';
import RecentTradeListModal from './RecentTradeListModal';

const WarehouseListPage = () => {

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [count, setCount] = useState(0);
    const [key, setKey] = useState("");
    const [word, setWord] = useState("");
    const [list, setList] = useState([]);
    const [warehouseId, setWarehouseId] = useState(6);
    const [isSearch, setIsSearch] = useState(false);
    const [warehouse_list, setWarehouse_list] = useState([]);


    const callAPI = async (searchWord, newPage = 1) => {
        try {
            setList([]);
            const res = await axios.get(`/erp/inventory/listByWarehouse/${warehouseId}?key=${key}&word=${searchWord}&page=${page}&size=${size}`)
            console.log(res.data);
            setCount(res.data.count);
            setList(res.data.documents);
            setWarehouse_list(res.data.list);
            console.log(warehouse_list)
            setIsSearch((key === "" && searchWord === "") || (searchWord === ""));
            setPage(newPage);
        } catch (error) {
            console.log("창고별 목록 페이징중 오류", error);
        }
    }

    useEffect(() => {
        callAPI(word, page);
    }, [page, warehouseId])

    const onSubmit = (e) => {
        e.preventDefault();
        let searchWord = word;
        if (key === "items_type") {
            switch (word) {
                case "음료":
                    searchWord = "0";
                    break;
                case "면":
                    searchWord = "1";
                    break;
                case "스낵":
                    searchWord = "2";
                    break;
                case "간편식":
                    searchWord = "3";
                    break;
                default:
                    break;
            }
        }
        callAPI(searchWord, 1);
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
    }

    const onClickMove = () => {
        window.location.href = '/erp/inventory/itemlist'
    }
    const onClickMove2 = () => {
        window.location.href = '/erp/inventory/tradelist'
    }


    // 자동으로 창고이름에 맞게 버튼 생성
    const renderWarehouseButton = () => {
        return warehouse_list
            .filter(warehouse => warehouse.warehouse_name !== null && warehouse.warehouse_name !== "")
            .map((warehouse, index) => {
                const displayName = warehouse.warehouse_name.replace("물류센터", "");
                return (
                    <Button className='me-2 mb-2' key={index} onClick={() => handleWarehouseClick(warehouse)}>
                        {displayName}
                    </Button>
                );
            });
    };
    //창고이름버튼 눌렀을때
    const handleWarehouseClick = (warehouse) => {
        setWarehouseId(warehouse.warehouse_id);
        setKey("");
        setWord("");
        setPage(1);
    };


    return (
        <>
            <Row className='my-3'>
                <Col>
                    <h1>재고리스트</h1>
                    <h3 className='my-3'>창고별 물품 목록</h3>
                    <div className='mt-5 mb-3'>
                        <Button className='me-2' onClick={onClickMove}>전체물품목록</Button>
                        <Button className='me-2' onClick={onClickMove2}>전체거래내역</Button>
                        <Button onClick={() => callAPI()}>창고별 물품 목록</Button>
                    </div>
                    <div style={{ display: 'flex' }}>
                        {renderWarehouseButton()}
                    </div>
                </Col>
            </Row>

            <Row className='mb-3'>
                <Col lg={4}>
                    <form onSubmit={onSubmit} className='mb-2'>
                        <InputGroup>
                            <Col className='col-4 me-3'>
                                <Form.Select value={key} onChange={(e) => setKey(e.target.value)}>
                                    <option value="items_id">코드</option>
                                    <option value="items_name">이름</option>
                                    <option value="items_type">타입</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <InputGroup>
                                    <FormControl placeholder='검색어를 입력하세요' value={word}
                                        onChange={(e) => setWord(e.target.value)} />
                                    <Button type="submit">검색</Button>
                                </InputGroup>
                            </Col>
                        </InputGroup>
                    </form>
                </Col>
                <Col lg={2}>
                    <div className='align-middle mt-2'>
                        {isSearch ? ("전체상품종류 : " + count + " 개") : ("검색결과 : " + count + " 개")}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={10}>
                    <Table>
                        <thead className='text-center'>
                            <tr>
                                <td>창고</td>
                                <td>코드</td>
                                <td>이름</td>
                                <td>사진</td>
                                <td>타입</td>
                                <td>재고</td>
                                <td>상태</td>
                                <td>최근거래내역</td>
                            </tr>
                        </thead>
                        <tbody className='align-middle text-center'>
                            {list && list.map(warehouse =>
                                <tr key={warehouse.items_id}>
                                    <td>{warehouse.warehouse_name}</td>
                                    <td>{warehouse.items_id}</td>
                                    <td>{warehouse.items_name}</td>
                                    <td>
                                        {warehouse.items_photo ?
                                            (<img src={`${process.env.PUBLIC_URL}/images/items/${warehouse.items_id}.jpg`}
                                                alt="물품사진" style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }} />)
                                            :
                                            (<h6>물품 사진이 없습니다.</h6>)
                                        }
                                    </td>
                                    <td>
                                        {warehouse.items_type === 0 ? "음료" : warehouse.items_type === 1 ? "면" : warehouse.items_type === 2 ? "스낵" : warehouse.items_type === 3 ? "간편식" : warehouse.items_type}
                                    </td>
                                    <td>{warehouse.rest_qnt}</td>
                                    <td style={{ color: warehouse.rest_qnt < 0 ? 'red' : warehouse.rest_qnt < 200 ? 'orange' : 'inherit' }}>
                                        {warehouse.rest_qnt < 0 && "즉시발주필요"}
                                        {warehouse.rest_qnt >= 0 && warehouse.rest_qnt < 200 && "예비발주필요"}
                                        {warehouse.rest_qnt > 200 && ""}
                                    </td>
                                    <td>
                                        <RecentTradeListModal item={warehouse.items_id} warehouse={warehouseId} />
                                    </td>
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
                            onChange={handlePageChange} />
                    }
                </Col>
            </Row>
        </>
    )
}


export default WarehouseListPage
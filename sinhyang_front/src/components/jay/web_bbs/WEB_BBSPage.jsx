import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import Pagination from "react-js-pagination";

const WEB_BBSPage = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [count, setCount] = useState(0);
    const [key, setKey] = useState('bbs_title');
    const [word, setWord] = useState('');
    const [uid, setUid] = useState('');

    const callAPI = async () => {
        const res = await axios.get(`/bbs/list?key=${key}&word=${word}&page=${page}&size=${size}`);
        setCount(res.data.total);
        setList(res.data.list);
        console.log(res.data.list)
        const vid = sessionStorage.getItem('visitor_id');
        setUid(vid);
    };

    useEffect(() => {
        callAPI();
    }, [page, key]);

 
    const onSubmit = (e) => {
        e.preventDefault();
        callAPI();
    };
    

    return (
        <Container>
            <h1 className='text-center mb-4'>문의 게시판</h1>
            <div className='text-end'>
                {uid && (
                    <a href='/web/customer/bbs/insert'>
                        <Button variant='outline-primary btn-sm' className='me-3'>글쓰기</Button>
                    </a>
                )}

                
            </div>
            <form onSubmit={onSubmit}>
                <Row>
                    <Col xs={6} md={5} lg={4}>
                        <InputGroup className='mb-4'>
                            <Form.Select value={key} onChange={(e) => setKey(e.target.value)}>
                                <option value="bbs_title">제목</option>
                                <option value="bbs_content">내용</option>
                            </Form.Select>
                            <Form.Control
                                value={word}
                                onChange={(e) => setWord(e.target.value)} />
                            <Button type='submit'>검색</Button>
                            <div className='ms-2'>검색수:{count}</div>
                        </InputGroup>
                    </Col>
                </Row>
            </form>

            <Table hover bordered>
                <thead className='web-thead-br'>
                    <tr>
                        <th>카테고리</th>
                        <td>글번호</td>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((bbs) => (
                        <tr key={bbs.bbs_id}>
                            <td>{bbs.bbs_category}</td>
                            <td>{bbs.bbs_id}</td>
                            <td ><a href={`/web/customer/bbs/read/${bbs.bbs_id}`} style={{ textDecoration: 'none', color: 'inherit' }}> {bbs.bbs_title}</a></td>
                            <td>{bbs.bbs_writer}</td>
                            <td>{moment(bbs.bbs_regDate).format('YYYY-MM-DD')}</td>
                            <td>{bbs.bbs_viewcnt}</td>
                        </tr>
                    ))}
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
        </Container>
    );
}

export default WEB_BBSPage;

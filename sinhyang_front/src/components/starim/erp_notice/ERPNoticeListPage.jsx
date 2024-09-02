import axios from 'axios';
import moment from 'moment';
import React, {  useEffect, useState } from 'react'
import { Button, Col, FormControl, InputGroup,Row, Table, Form } from 'react-bootstrap';
import {  Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import '../starim_common/paging.css';



const ERPNoticeListPage = () => {

    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size] = useState(5);
    const [key, setKey] = useState("notice_title");
    const [word, setWord] = useState("");
    const [count, setCount] = useState("0");
    const [listNotice, setListNotice] = useState([]);


    const callAPI = async () => {
        const res = await axios.get(`/erp/notice?key=${key}&word=${word}&page=${page}&size=${size}`)
        setList(res.data.documents);
        setCount(res.data.total);
    }

    const callAPINotice = async () => {
        const res = await axios.get(`/erp/notice/list.json`)
        //console.log(res);
        setListNotice(res.data);
    }

    useEffect(()=>{
        callAPI();
        callAPINotice();
        
    },[page, key]);

    const onSubmit = (e) => {
        e.preventDefault();
        callAPI();
    }



  return (
    <>
    
    <h1 className='text-center '>공지사항</h1>
        <Row className='justify-content-center'>
                <Col className='mb-2' lg={5} >
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Select value={key} onChange={(e)=>setKey(e.target.value)}>
                                <option value="notice_title">제목</option>
                                <option value="notice_contents">내용</option>
                                <option value="notice_writer">글쓴이</option>
                            </Form.Select>
                            <FormControl placeholder='검색어를 입력하세요' value={word} onChange={(e)=>setWord(e.target.value)}/>
                            <Button type="submit" size="sm" variant='outline-primary'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col lg={2}>
                    <div className='align-middle mt-2'>
                        <span className='me-3'>검색수 : {count}</span>
                    </div>
                </Col>
                <Col className='text-end' lg={1}>
                {sessionStorage.getItem('member_info_id') && 
                    <Link to="/erp/notice/insert"><Button size='sm' variant='outline-info'>글쓰기</Button></Link>
                }
                </Col>
        </Row>
        <Row className='justify-content-center'>
            <Col lg={8}>
                <Table >
                    <thead>
                        <tr className='text-center'>
                            <td style={{fontSize: "20px"}}>글번호</td>
                            <td style={{fontSize: "20px"}}>제목</td>
                            <td style={{fontSize: "20px"}}>작성자</td>
                            <td style={{fontSize: "20px"}}>작성일</td>
                            <td style={{fontSize: "20px"}}>조회수</td>
                        </tr>
                    </thead>
                    <tbody>
                    {listNotice && listNotice.filter((notice) => notice.notice_type === 1).map(notice => 
                        <tr key={notice.notice_id}>
                            <td className='text-center'>{notice.notice_type === 1 ? '공지' : notice.notice_type}</td>
                            <td >
                            <div>
                                <a href={`/erp/notice/${notice.notice_id}`} style={{ textDecoration: 'none', color: '#D6B534' }}>
                                {notice.notice_title}
                                </a>
                            </div>
                            </td>
                            <td >{notice.notice_writer}</td>
                            <td ><div>{moment(notice.notice_regdate).format('yy년MM월DD일 HH시mm분ss초')}</div></td>
                            <td  className='text-center'>{notice.notice_viewcnt}</td>
                        </tr>
                        )}
                    </tbody>
                    <tbody>
                        {list && list.filter((notice) => notice.notice_type === 0).map(notice =>
                                <tr key={notice.notice_id}>
                                    <td className='text-center'>{notice.notice_id}</td>
                                    <td >
                                        <div>
                                        <Link to={`/erp/notice/${notice.notice_id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                            {notice.notice_title}
                                        </Link>
                                        </div>
                                    </td>
                                    <td >{notice.notice_writer}</td>
                                    <td ><div>{moment(notice.notice_regdate).format('yy년MM월DD일 HH시mm분ss초')}</div></td>
                                    <td  className='text-center'>{notice.notice_viewcnt}</td>
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
        onChange={(e)=>setPage(e)}/>
        }
    </>
  )
}

export default ERPNoticeListPage
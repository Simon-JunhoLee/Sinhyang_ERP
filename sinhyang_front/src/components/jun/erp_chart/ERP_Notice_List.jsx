import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

const ERP_Notice_List = () => {

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

    useEffect(() => {
        callAPI();
        callAPINotice();

    }, [page, key]);

    return (
        <>
            <h5 class="card-title fw-semibold mb-4">공지사항</h5>
            <Row className='justify-content-center'>
                <Col lg={12}>
                    <Table bordered hover >
                        <thead>
                            <tr className='text-center'>
                                <td style={{ fontSize: "17px" }}>글번호</td>
                                <td style={{ fontSize: "17px" }}>제목</td>
                                <td style={{ fontSize: "17px" }}>작성자</td>
                                <td style={{ fontSize: "17px" }}>작성일</td>
                                <td style={{ fontSize: "17px" }}>조회수</td>
                            </tr>
                        </thead>
                        <tbody>
                            {listNotice && listNotice.filter((notice) => notice.notice_type === 1).map(notice =>
                                <tr key={notice.notice_id}>
                                    <td className='text-center'>{notice.notice_type === 1 ? '공지' : notice.notice_type}</td>
                                    <td >
                                        <div>
                                            <a href={`/erp/notice/${notice.notice_id}`} style={{ textDecoration: 'none', color: '#5F5F5F' }}>
                                                {notice.notice_title}
                                            </a>
                                        </div>
                                    </td>
                                    <td >{notice.notice_writer}</td>
                                    <td ><div>{moment(notice.notice_regdate).format('yy년MM월DD일 HH시mm분ss초')}</div></td>
                                    <td className='text-center'>{notice.notice_viewcnt}</td>
                                </tr>
                            )}
                        </tbody>
                        <tbody>
                            {list && list.filter((notice) => notice.notice_type === 0).map(notice =>
                                <tr key={notice.notice_id}>
                                    <td className='text-center'>{notice.notice_id}</td>
                                    <td >
                                        <div>
                                            <Link to={`/erp/notice/${notice.notice_id}`} style={{ textDecoration: 'none', color: '#5F5F5F' }}>
                                                {notice.notice_title}
                                            </Link>
                                        </div>
                                    </td>
                                    <td >{notice.notice_writer}</td>
                                    <td ><div>{moment(notice.notice_regdate).format('yy년MM월DD일 HH시mm분ss초')}</div></td>
                                    <td className='text-center'>{notice.notice_viewcnt}</td>
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

export default ERP_Notice_List